"use client";

import { useState } from "react";
import { SectionCard, Field, inputClass, hintClass } from "./FormKit";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";

export default function AccountForm({ email }: { email: string }) {
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = Boolean(currentPassword || newPassword || confirmPassword);

  function handleCancel() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    const body = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      const msg = body.error || "Could not update password. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }

    showToast("success", "Password updated.");
    handleCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Signed in as">
        <Field label="Email">
          <input value={email} disabled className={`${inputClass} cursor-not-allowed bg-guide-50 text-guide-500`} />
        </Field>
        <p className={hintClass}>The admin email is set via the ADMIN_EMAIL environment variable and can't be changed here.</p>
      </SectionCard>

      <SectionCard title="Change password" description="Requires your current password. New password must be at least 8 characters.">
        <Field label="Current password">
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="New password">
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Confirm new password">
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} label="Update password" />
    </form>
  );
}
