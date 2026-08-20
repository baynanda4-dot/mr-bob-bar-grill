"use client";

import { useState, useSyncExternalStore } from "react";
import LocalizedLink from "@/components/LocalizedLink";
import { SITE_URL } from "@/lib/site";

// navigator.share support never changes during a session, so it's read as
// external (non-React) state via useSyncExternalStore rather than an
// effect + setState — no subscription needed, and getServerSnapshot keeps
// SSR from ever touching `navigator`, which doesn't exist on the server.
function subscribeNoop() {
  return () => {};
}
function getShareSupport() {
  return typeof navigator !== "undefined" && Boolean(navigator.share);
}
function getShareSupportServer() {
  return false;
}

// utm_source/medium have nowhere to be read (no analytics on this site),
// but they're free to include in case anyone wants a rough count of
// guest-share traffic later without adding a tracking script.
const SHARE_URL = `${SITE_URL}/?utm_source=guest-share&utm_medium=social`;

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21l1.65-4.95A8 8 0 1 1 8.05 19.35L3 21z" />
      <path d="M8.5 9.5c0 3.5 2.5 6 6 6 .5 0 1-.5 1-1.2v-1c0-.3-.2-.5-.5-.6l-1.8-.6c-.3-.1-.6 0-.7.3l-.3.6c-1-.5-1.8-1.3-2.3-2.3l.6-.3c.3-.1.4-.4.3-.7l-.6-1.8c-.1-.3-.3-.5-.6-.5h-1c-.7 0-1.2.5-1.2 1z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MessengerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11.5C3 6.8 7 3 12 3s9 3.8 9 8.5S17 20 12 20c-.9 0-1.8-.13-2.6-.37L6 21l.9-3.3C4.5 16.1 3 13.9 3 11.5z" />
      <path d="M8 12.5l2.5-2.7L13 12l2.5-2.5" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.4l.6-3H13v-1.2c0-.5.3-.8.9-.8z" />
    </svg>
  );
}

function CopyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6" />
    </svg>
  );
}

export default function ShareButtons({ dict }) {
  const shareMessage = dict.shareMessage;
  const canNativeShare = useSyncExternalStore(subscribeNoop, getShareSupport, getShareSupportServer);
  const [copied, setCopied] = useState(false);
  const [igNote, setIgNote] = useState(false);

  const links = [
    {
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareMessage} ${SHARE_URL}`)}`,
      bg: "bg-[#25D366]",
    },
    {
      label: "Facebook",
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(shareMessage)}`,
      bg: "bg-[#1877F2]",
    },
    {
      label: "Messenger",
      Icon: MessengerIcon,
      // Deep link only — Messenger has no web share URL that accepts a link
      // without a registered Facebook App ID. Works when the app is
      // installed (the common case here, scanned from a phone); does
      // nothing on desktop, an acceptable degrade for a QR-code flow that's
      // mobile by design.
      href: `fb-messenger://share/?link=${encodeURIComponent(SHARE_URL)}`,
      bg: "bg-[#0084FF]",
    },
  ];

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Mr Bob Bar and Grill", text: shareMessage, url: SHARE_URL });
    } catch {
      // Guest canceled the share sheet — nothing to do.
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", SHARE_URL);
    }
  };

  const shareToInstagram = async () => {
    if (canNativeShare) {
      nativeShare();
      return;
    }
    // Instagram has no web share intent at all — copy the message so the
    // guest can paste it straight into a DM, Story, or their bio.
    try {
      await navigator.clipboard.writeText(`${shareMessage} ${SHARE_URL}`);
    } catch {
      // ignore — the visible note below still tells them what to do.
    }
    setIgNote(true);
    setTimeout(() => setIgNote(false), 4000);
  };

  return (
    <section className="flex flex-col items-center justify-center border-t border-white/10 bg-mrbob-black px-6 py-24 text-center text-white">
      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          className="btn-primary u-press mb-8 px-8 py-3 text-sm tracking-widest"
        >
          <ShareIcon className="h-4 w-4" />
          {dict.shareNow}
        </button>
      )}

      <div className="grid w-full max-w-sm grid-cols-4 gap-4">
        {links.map(({ label, Icon, href, bg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="u-press flex flex-col items-center gap-2"
          >
            <span className={`flex h-14 w-14 items-center justify-center text-white ${bg}`}>
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-xs text-white/60">{label}</span>
          </a>
        ))}

        <button type="button" onClick={shareToInstagram} className="u-press flex flex-col items-center gap-2">
          <span className="flex h-14 w-14 items-center justify-center bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
            <InstagramIcon className="h-6 w-6" />
          </span>
          <span className="text-xs text-white/60">{dict.instagramLabel}</span>
        </button>
      </div>

      {igNote && <p className="mt-4 max-w-xs text-xs text-white/60">{dict.igNote}</p>}

      <button
        type="button"
        onClick={copyLink}
        className="btn-outline u-press mt-10 px-6 py-3 text-sm tracking-widest"
      >
        <CopyIcon className="h-4 w-4" />
        {copied ? dict.linkCopied : dict.copyLink}
      </button>

      <LocalizedLink href="/" className="u-link mt-12 text-sm text-white/60">
        {dict.backLink}
      </LocalizedLink>
    </section>
  );
}
