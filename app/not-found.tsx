import Link from "next/link";
import Container from "@/components/Container";
import InternalLinkGrid from "@/components/InternalLinkGrid";

export default function NotFound() {
  return (
    <Container className="py-20 text-center sm:py-28">
      <p className="font-display text-7xl font-bold text-coral">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-indigo sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-light">
        The page you're looking for doesn't exist or may have moved. Try
        one of the guide's main sections below.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white transition hover:bg-coral-dark"
      >
        Back to Home
      </Link>
      <div className="mx-auto mt-14 max-w-3xl text-left">
        <InternalLinkGrid />
      </div>
    </Container>
  );
}
