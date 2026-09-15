"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import RichLinkModal from "./RichLinkModal";

// A WYSIWYG toolbar editor for the prose/HTML fields across this admin
// panel (matches the pattern used in the other repos in this portfolio),
// so admins format headings/bold/lists/links visually instead of hand-
// typing HTML tags into a raw textarea. Built on contentEditable +
// document.execCommand — no editor library dependency. Image insertion is
// intentionally left out: this site's images are a fixed, curated set
// (see lib/images.ts, picked via the "Hero image" dropdown elsewhere in
// each form), not arbitrary admin uploads, so there's nothing for an
// "insert image" button here to upload to.

function normalizeUrl(raw: string): string {
  const url = raw.trim();
  if (!url) return url;
  if (/^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url)) return url;
  return `https://${url}`;
}

/**
 * Converts Markdown text (e.g. pasted from ChatGPT or a plain markdown doc)
 * into clean semantic HTML.
 */
function markdownToHtml(markdown: string, allowedHeadings: (1 | 2 | 3)[]): string {
  const lines = markdown.split(/\r?\n/);
  const htmlParts: string[] = [];
  let inList: "ul" | "ol" | null = null;
  let inBlockquote = false;
  let inTable = false;
  let tableRows: string[] = [];

  function closeList() {
    if (inList) {
      htmlParts.push(`</${inList}>`);
      inList = null;
    }
  }

  function closeBlockquote() {
    if (inBlockquote) {
      htmlParts.push(`</blockquote>`);
      inBlockquote = false;
    }
  }

  function closeTable() {
    if (inTable && tableRows.length > 0) {
      const isHeader = (row: string) => /^\s*\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?\s*$/.test(row);
      const rowsHtml: string[] = [];
      let headerDone = false;

      for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        if (isHeader(row)) {
          headerDone = true;
          continue;
        }
        const cells = row
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => (idx === 0 && arr[0] === "" ? false : idx === arr.length - 1 && arr[arr.length - 1] === "" ? false : true));

        const tag = !headerDone && i === 0 ? "th" : "td";
        const rowContent = cells
          .map(
            (cell) =>
              `<${tag} style="border:1px solid #d6d3d1;padding:8px 12px;text-align:left;">${formatInlineMarkdown(cell)}</${tag}>`
          )
          .join("");
        rowsHtml.push(`<tr>${rowContent}</tr>`);
      }

      htmlParts.push(`<table style="border-collapse:collapse;width:100%;margin:1.5rem 0;"><tbody>${rowsHtml.join("")}</tbody></table>`);
      tableRows = [];
      inTable = false;
    }
  }

  function formatInlineMarkdown(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/___(.*?)___/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (line.startsWith("|") && line.endsWith("|")) {
      closeList();
      closeBlockquote();
      inTable = true;
      tableRows.push(line);
      continue;
    } else {
      closeTable();
    }

    if (!line) {
      closeList();
      closeBlockquote();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeList();
      closeBlockquote();
      const levelNum = headingMatch[1].length;
      let targetLevel: 1 | 2 | 3 = 2;
      if (levelNum === 1) targetLevel = allowedHeadings.includes(1) ? 1 : 2;
      else if (levelNum === 2) targetLevel = 2;
      else targetLevel = 3;

      htmlParts.push(`<h${targetLevel}>${formatInlineMarkdown(headingMatch[2])}</h${targetLevel}>`);
      continue;
    }

    if (line.startsWith(">")) {
      closeList();
      const quoteText = line.replace(/^>\s*/, "");
      if (!inBlockquote) {
        htmlParts.push(`<blockquote>`);
        inBlockquote = true;
      }
      htmlParts.push(`<p>${formatInlineMarkdown(quoteText)}</p>`);
      continue;
    } else {
      closeBlockquote();
    }

    const ulMatch = line.match(/^[-*+]\s+(.*)$/);
    if (ulMatch) {
      if (inList !== "ul") {
        closeList();
        htmlParts.push(`<ul>`);
        inList = "ul";
      }
      htmlParts.push(`<li>${formatInlineMarkdown(ulMatch[1])}</li>`);
      continue;
    }

    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inList !== "ol") {
        closeList();
        htmlParts.push(`<ol>`);
        inList = "ol";
      }
      htmlParts.push(`<li>${formatInlineMarkdown(olMatch[1])}</li>`);
      continue;
    }

    closeList();
    htmlParts.push(`<p>${formatInlineMarkdown(line)}</p>`);
  }

  closeList();
  closeBlockquote();
  closeTable();

  return htmlParts.join("");
}

// Real pages / Word / Google Docs almost always carry proper HTML on the
// clipboard, but plain everyday article text very often ALSO happens to
// match the markdown heuristics above (a numbered intro like "1. Book a
// slot early", a stray "**word**", a "|" somewhere in a sentence). Only
// fall back to the markdown/plain-text path when there's no real HTML
// structure worth keeping.
function hasRichHtmlStructure(rawHtml: string): boolean {
  try {
    const doc = new DOMParser().parseFromString(rawHtml, "text/html");
    const body = doc.body;
    if (body.querySelector("h1, h2, h3, h4, h5, h6, table, ul, ol, blockquote")) return true;
    if (body.querySelectorAll("p").length > 1) return true;
    if (body.querySelector("strong, b, em, i, u, a")) return true;
    return false;
  } catch {
    return false;
  }
}

/**
 * Cleans and normalizes HTML pasted from rich sources (Google Docs, Word,
 * ChatGPT web copy), mapping headings to allowed levels and stripping
 * unwanted inline fonts/colors, while preserving H2/H3/P/bold/italic/
 * lists/links/tables.
 */
function cleanRichHtml(rawHtml: string, allowedHeadings: (1 | 2 | 3)[]): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");
    const body = doc.body;

    // Word and Google Docs frequently mark headings as styled <p> elements
    // instead of real <h1>-<h6> tags. Promote these to real heading tags
    // first so the normalization pass below catches them too.
    const headingParas = body.querySelectorAll("p");
    headingParas.forEach((p) => {
      const signature = `${p.getAttribute("style") || ""} ${p.getAttribute("class") || ""}`;
      const match = signature.match(/heading\s*(\d)/i);
      if (!match) return;
      const level = Math.min(3, Math.max(1, parseInt(match[1], 10)));
      const tag = `h${level}`;
      const replacement = doc.createElement(tag);
      replacement.innerHTML = p.innerHTML;
      p.replaceWith(replacement);
    });

    const headings = body.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((h) => {
      const tag = h.tagName.toLowerCase();
      let targetTag = "h2";
      if (tag === "h1") targetTag = allowedHeadings.includes(1) ? "h1" : "h2";
      else if (tag === "h2") targetTag = "h2";
      else targetTag = "h3";

      if (tag !== targetTag) {
        const replacement = doc.createElement(targetTag);
        replacement.innerHTML = h.innerHTML;
        h.replaceWith(replacement);
      }
    });

    // Strip inline font/background/color styles that ruin the site's theme.
    const allElements = body.querySelectorAll("*");
    allElements.forEach((el) => {
      el.removeAttribute("class");
      if (el.hasAttribute("style")) {
        const style = el.getAttribute("style") || "";
        if (/border|collapse/i.test(style) && /TABLE|TD|TH|TR/i.test(el.tagName)) {
          el.setAttribute("style", "border:1px solid #d6d3d1;padding:8px 12px;");
        } else {
          el.removeAttribute("style");
        }
      }
    });

    // Strip any pasted images — this site doesn't have an upload pipeline,
    // so an <img> with a src pointing at someone else's Google Docs/Word
    // server would just break once that link expires.
    body.querySelectorAll("img, figure").forEach((el) => el.remove());

    const links = body.querySelectorAll("a");
    links.forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });

    return body.innerHTML;
  } catch {
    return rawHtml;
  }
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = "8rem",
  allowedHeadings = [2, 3],
  stickyOffset,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  allowedHeadings?: (1 | 2 | 3)[];
  stickyOffset?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!value);

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const savedRangeRef = useRef<Range | null>(null);

  // Real-time active format state for highlighting toolbar buttons.
  const [activeBlock, setActiveBlock] = useState<"h1" | "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "table" | null>("p");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isUl, setIsUl] = useState(false);
  const [isOl, setIsOl] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = value || "";
      setIsEmpty(!(value || "").trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = useCallback(() => {
    if (!ref.current) return;
    const html = ref.current.innerHTML;
    setIsEmpty(!ref.current.textContent?.trim());
    onChange(html);
    updateActiveFormats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const updateActiveFormats = useCallback(() => {
    if (!ref.current) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!ref.current.contains(range.commonAncestorContainer)) return;

    let node: Node | null = range.commonAncestorContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;

    let detectedBlock: "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "table" | null = null;
    let curr = node as HTMLElement | null;
    while (curr && curr !== ref.current) {
      const tag = curr.tagName.toLowerCase();
      if (tag === "h1") { detectedBlock = "h1"; break; }
      if (tag === "h2") { detectedBlock = "h2"; break; }
      if (tag === "h3") { detectedBlock = "h3"; break; }
      if (tag === "p") { detectedBlock = "p"; break; }
      if (tag === "ul") { detectedBlock = "ul"; break; }
      if (tag === "ol") { detectedBlock = "ol"; break; }
      if (tag === "blockquote") { detectedBlock = "blockquote"; break; }
      if (tag === "table") { detectedBlock = "table"; break; }
      curr = curr.parentElement;
    }

    setActiveBlock(detectedBlock || "p");

    try {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
      setIsUl(document.queryCommandState("insertUnorderedList"));
      setIsOl(document.queryCommandState("insertOrderedList"));
    } catch {}
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormats();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [updateActiveFormats]);

  function exec(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  }

  function captureSelection(): Range | null {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !ref.current) return null;
    const range = sel.getRangeAt(0);
    if (!ref.current.contains(range.commonAncestorContainer)) return null;
    return range.cloneRange();
  }

  function restoreSelection(): Range | null {
    if (!ref.current) return null;
    ref.current.focus();
    const sel = window.getSelection();
    if (!sel) return null;
    sel.removeAllRanges();
    let range: Range;
    if (savedRangeRef.current) {
      range = savedRangeRef.current;
    } else {
      range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
    }
    sel.addRange(range);
    return range;
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const pastedHtml = clipboardData.getData("text/html");
    const pastedText = clipboardData.getData("text/plain");

    let finalHtml = "";

    const hasRichHtml = !!pastedHtml && hasRichHtmlStructure(pastedHtml);

    const isMarkdown =
      pastedText &&
      (/(^|\n)#{1,6}\s+/.test(pastedText) ||
        /(^|\n)[-*+]\s+/.test(pastedText) ||
        /(^|\n)\d+\.\s+/.test(pastedText) ||
        /\*\*[^*]+\*\*/.test(pastedText) ||
        /\[[^\]]+\]\([^)]+\)/.test(pastedText) ||
        /(^|\n)\|.*\|/.test(pastedText));

    if (hasRichHtml) {
      finalHtml = cleanRichHtml(pastedHtml, allowedHeadings);
    } else if (pastedText) {
      if (isMarkdown) {
        finalHtml = markdownToHtml(pastedText, allowedHeadings);
      } else if (pastedHtml) {
        finalHtml = cleanRichHtml(pastedHtml, allowedHeadings);
      } else {
        const paras = pastedText.split(/\r?\n\r?\n/);
        finalHtml = paras
          .map((p) => {
            const clean = p.trim().replace(/\r?\n/g, "<br>");
            return clean ? `<p>${clean}</p>` : "";
          })
          .filter(Boolean)
          .join("");
      }
    }

    if (finalHtml) {
      ref.current?.focus();
      document.execCommand("insertHTML", false, finalHtml);
      handleInput();
    }
  }

  function insertLink() {
    savedRangeRef.current = captureSelection();
    setLinkModalOpen(true);
  }

  function handleLinkInsert({ url, nofollow, newTab }: { url: string; nofollow: boolean; newTab: boolean }) {
    const range = restoreSelection();
    if (!range) {
      setLinkModalOpen(false);
      return;
    }
    const normalized = normalizeUrl(url);

    const anchor = document.createElement("a");
    anchor.setAttribute("href", normalized);
    if (newTab) anchor.setAttribute("target", "_blank");
    const relTokens = [...(nofollow ? ["nofollow"] : []), ...(newTab ? ["noopener", "noreferrer"] : [])];
    if (relTokens.length) anchor.setAttribute("rel", relTokens.join(" "));

    if (range.collapsed) {
      anchor.textContent = normalized;
    } else {
      anchor.appendChild(range.extractContents());
    }
    range.insertNode(anchor);

    range.setStartAfter(anchor);
    range.collapse(true);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }

    handleInput();
    setLinkModalOpen(false);
  }

  function applyHeading(level: 1 | 2 | 3) {
    const sel = window.getSelection();
    const range = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;

    if (!range || range.collapsed || !ref.current || !ref.current.contains(range.commonAncestorContainer)) {
      exec("formatBlock", `<h${level}>`);
      return;
    }

    const startedInTextNode = range.commonAncestorContainer.nodeType === Node.TEXT_NODE;
    let block: HTMLElement | null = startedInTextNode
      ? range.commonAncestorContainer.parentElement
      : (range.commonAncestorContainer as HTMLElement);
    while (block && block !== ref.current && !/^(P|H1|H2|H3|H4|H5|H6|LI)$/.test(block.tagName)) {
      block = block.parentElement;
    }

    const useRootAsBlock = (!block || block === ref.current) && startedInTextNode;
    if ((!block || block === ref.current) && !useRootAsBlock) {
      exec("formatBlock", `<h${level}>`);
      return;
    }
    const container: HTMLElement = useRootAsBlock ? ref.current : (block as HTMLElement);

    ref.current.focus();

    const beforeRange = document.createRange();
    beforeRange.setStart(container, 0);
    beforeRange.setEnd(range.startContainer, range.startOffset);

    const afterRange = document.createRange();
    afterRange.setStart(range.endContainer, range.endOffset);
    afterRange.setEnd(container, container.childNodes.length);

    const beforeFrag = beforeRange.cloneContents();
    const selectedFrag = range.cloneContents();
    const afterFrag = afterRange.cloneContents();

    const replacement: HTMLElement[] = [];
    if (beforeFrag.textContent?.trim()) {
      const p = document.createElement("p");
      p.appendChild(beforeFrag);
      replacement.push(p);
    }
    const heading = document.createElement(`h${level}`);
    heading.appendChild(selectedFrag);
    replacement.push(heading);
    if (afterFrag.textContent?.trim()) {
      const p = document.createElement("p");
      p.appendChild(afterFrag);
      replacement.push(p);
    }

    if (useRootAsBlock) {
      container.replaceChildren(...replacement);
    } else {
      container.replaceWith(...replacement);
    }

    const newSel = window.getSelection();
    if (newSel) {
      const after = document.createRange();
      after.selectNodeContents(heading);
      after.collapse(false);
      newSel.removeAllRanges();
      newSel.addRange(after);
    }

    handleInput();
  }

  function insertTable() {
    ref.current?.focus();
    const rows = 3;
    const cols = 3;
    const cells = Array.from({ length: cols })
      .map(() => `<td style="border:1px solid #d6d3d1;padding:6px 10px;">&nbsp;</td>`)
      .join("");
    const tableRows = Array.from({ length: rows }).map(() => `<tr>${cells}</tr>`).join("");
    document.execCommand(
      "insertHTML",
      false,
      `<table style="border-collapse:collapse;width:100%;margin:1.5rem 0;"><tbody>${tableRows}</tbody></table><p><br></p>`
    );
    handleInput();
  }

  const ToolbarButton = ({
    label,
    title,
    active = false,
    onClick,
  }: {
    label: React.ReactNode;
    title: string;
    active?: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-2.5 py-1 text-xs font-semibold transition ${
        active ? "bg-navy text-white shadow-sm ring-1 ring-navy" : "text-guide-600 hover:bg-guide-200 hover:text-guide-900"
      }`}
    >
      {label}
    </button>
  );

  const getFormatLabel = () => {
    switch (activeBlock) {
      case "h1":
        return "Heading 1 (H1)";
      case "h2":
        return "Heading 2 (H2)";
      case "h3":
        return "Heading 3 (H3)";
      case "ul":
        return "Bullet List";
      case "ol":
        return "Numbered List";
      case "blockquote":
        return "Quote";
      case "table":
        return "Table";
      case "p":
      default:
        return "Paragraph (P)";
    }
  };

  return (
    <div className="rounded-lg border border-guide-300 focus-within:border-navy focus-within:ring-1 focus-within:ring-navy">
      <div
        className="sticky z-10 flex flex-wrap items-center justify-between gap-1 rounded-t-lg border-b border-guide-200 bg-guide-50 p-1.5"
        style={{ top: stickyOffset || 0 }}
      >
        <div className="flex flex-wrap items-center gap-0.5">
          {allowedHeadings.includes(1) && (
            <ToolbarButton label="H1" title="Heading 1" active={activeBlock === "h1"} onClick={() => applyHeading(1)} />
          )}
          {allowedHeadings.includes(2) && (
            <ToolbarButton label="H2" title="Heading 2" active={activeBlock === "h2"} onClick={() => applyHeading(2)} />
          )}
          {allowedHeadings.includes(3) && (
            <ToolbarButton label="H3" title="Heading 3" active={activeBlock === "h3"} onClick={() => applyHeading(3)} />
          )}
          <ToolbarButton label="P" title="Paragraph (normal text)" active={activeBlock === "p"} onClick={() => exec("formatBlock", "<p>")} />
          <span className="mx-1 h-4 w-px bg-guide-300" />
          <ToolbarButton label={<span className="font-bold">B</span>} title="Bold" active={isBold} onClick={() => exec("bold")} />
          <ToolbarButton label={<span className="italic">I</span>} title="Italic" active={isItalic} onClick={() => exec("italic")} />
          <ToolbarButton label={<span className="underline">U</span>} title="Underline" active={isUnderline} onClick={() => exec("underline")} />
          <span className="mx-1 h-4 w-px bg-guide-300" />
          <ToolbarButton label="• List" title="Bullet list" active={isUl || activeBlock === "ul"} onClick={() => exec("insertUnorderedList")} />
          <ToolbarButton label="1. List" title="Numbered list" active={isOl || activeBlock === "ol"} onClick={() => exec("insertOrderedList")} />
          <span className="mx-1 h-4 w-px bg-guide-300" />
          <ToolbarButton label="Link" title="Insert link" onClick={insertLink} />
          <ToolbarButton label="Table" title="Insert 3×3 table" onClick={insertTable} />
          <span className="mx-1 h-4 w-px bg-guide-300" />
          <ToolbarButton label="Clear" title="Clear formatting" onClick={() => exec("removeFormat")} />
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 text-xs text-guide-500">
          <span className="h-2 w-2 rounded-full bg-navy" />
          <span>Current:</span>
          <span className="font-semibold text-guide-800">{getFormatLabel()}</span>
        </div>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        onClick={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        data-rte-empty={isEmpty ? "true" : "false"}
        className="rich-content max-w-none px-3 py-2.5 text-sm text-guide-900 outline-none"
        style={{ minHeight }}
      />

      {linkModalOpen && <RichLinkModal onInsert={handleLinkInsert} onClose={() => setLinkModalOpen(false)} />}
    </div>
  );
}
