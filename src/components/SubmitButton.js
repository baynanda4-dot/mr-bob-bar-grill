"use client";

/**
 * Shared submit button for every form on the site — spinner + cycling
 * reassurance text + a sweeping progress bar, so a slow submit (Sheets and
 * two email sends, occasionally a few seconds) reads as active progress
 * instead of a possibly-frozen button worth giving up on.
 */
export default function SubmitButton({ status, label, submittingMessage }) {
  const isSubmitting = status === "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className="btn-primary relative w-full gap-2 overflow-hidden px-6 py-3 disabled:cursor-not-allowed"
    >
      {isSubmitting && <span aria-hidden="true" className="progress-sweep-bar" />}
      {isSubmitting && (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current/40 border-t-current"
        />
      )}
      <span>{isSubmitting ? submittingMessage : label}</span>
    </button>
  );
}
