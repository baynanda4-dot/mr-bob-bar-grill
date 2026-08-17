"use client";

import { useEffect, useState } from "react";

// Cycled while a submit is in flight so a slow request (Sheets + two email
// sends running in parallel server-side, occasionally a few seconds) still
// reads as active progress instead of a stuck button.
const SUBMITTING_MESSAGES = [
  "Sending your request…",
  "Confirming the details…",
  "Almost there…",
];

/**
 * Shared submit wiring for every form on the site. Each form keeps its own
 * field state (shapes differ too much to share) — this just owns the
 * request lifecycle so "idle/submitting/success/error" isn't reimplemented
 * four times.
 */
export function useFormSubmit({ formType, branch }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (status !== "submitting") return undefined;
    setMessageIndex(0);
    const id = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, SUBMITTING_MESSAGES.length - 1));
    }, 1800);
    return () => clearInterval(id);
  }, [status]);

  // A guest bailing out mid-submit (thinking it's frozen) is exactly the
  // failure mode this is all for — this catches it on desktop at least,
  // where the browser shows a native "leave site?" confirmation.
  useEffect(() => {
    if (status !== "submitting") return undefined;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [status]);

  async function submitForm(fields) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, branch, ...fields }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      return true;
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      return false;
    }
  }

  return {
    status,
    errorMessage,
    submitForm,
    submittingMessage: SUBMITTING_MESSAGES[messageIndex],
  };
}
