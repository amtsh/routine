"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const STORAGE_KEY = "iosPwaPrompt";

function useIsIOS() {
  const [isValidOS, setIsValidOS] = useState<boolean | undefined>(undefined);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIPad = /macintosh/.test(ua) && window.navigator.maxTouchPoints > 1;
    const isIOS = isIPad || /iphone|ipad|ipod/.test(ua);
    const standalone =
      "standalone" in window.navigator && !!window.navigator.standalone;
    setIsValidOS(isIOS);
    setIsStandalone(standalone);
  }, []);

  return { isValidOS: !!isValidOS, isStandalone };
}

function useVisitCount(isValidOS: boolean) {
  const [visits, setVisits] = useState<number | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : null;
      setVisits(data?.visits ?? 0);
    } catch {
      setVisits(0);
    }
  }, []);

  const increment = () => {
    if (!isValidOS || visits === undefined) return;
    const next = visits + 1;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ isValidOS, visits: next }),
      );
    } catch {
      /* ignore */
    }
  };

  return { visits, increment };
}

// Matches the actual iOS Safari share button
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 22" fill="none" className={className}>
      <path
        d="M10 1v13M5.5 5 10 1l4.5 4"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

// Matches the iOS "Add to Home Screen" icon
function AddIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className}>
      <rect
        x="1"
        y="1"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <path
        d="M11 7v8M7 11h8"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface PWAInstallPromptProps {
  appIconPath?: string;
  copyTitle?: string;
  copySubtitle?: string;
  copyDescription?: string;
  copyShareStep?: string;
  copyAddToHomeScreenStep?: string;
  promptOnVisit?: number;
  timesToShow?: number;
  delay?: number;
  forceShow?: boolean;
  onClose?: () => void;
}

export function PWAInstallPrompt({
  appIconPath = "/favicon.ico",
  copyTitle = "Add to Home Screen",
  copySubtitle,
  copyDescription = "This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.",
  copyShareStep = "Tap the Share icon in Safari's toolbar",
  copyAddToHomeScreenStep = "Tap 'Add to Home Screen'",
  promptOnVisit = 2,
  timesToShow = 2,
  delay = 1000,
  forceShow = false,
  onClose,
}: PWAInstallPromptProps) {
  const { isValidOS, isStandalone } = useIsIOS();
  const { visits, increment } = useVisitCount(isValidOS);
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);

  const hasIncremented = useRef(false);
  useEffect(() => {
    if (isValidOS && visits !== undefined && !hasIncremented.current) {
      hasIncremented.current = true;
      increment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- increment once per session
  }, [isValidOS, visits]);

  useEffect(() => {
    if (forceShow && isValidOS) {
      setShouldShow(true);
    } else if (isValidOS && visits !== undefined && !isStandalone) {
      const nextVisit = visits + 1;
      const show =
        nextVisit >= promptOnVisit && nextVisit < promptOnVisit + timesToShow;
      setShouldShow(show);
    }
  }, [forceShow, isValidOS, visits, isStandalone, promptOnVisit, timesToShow]);

  useEffect(() => {
    if (!shouldShow) return;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, [shouldShow, delay]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const subtitle =
    copySubtitle ??
    (typeof window !== "undefined" ? window.location.hostname : "");

  if (!shouldShow) return null;

  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={(v) => !v && handleClose()}
      shouldScaleBackground
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]" />

        <DrawerPrimitive.Content
          className="fixed inset-x-0 bottom-0 z-50 outline-none"
          style={{
            fontFamily:
              "var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)",
          }}
        >
          {/* Sheet surface */}
          <div className="rounded-t-[20px] bg-[#1c1c1e] overflow-hidden">
            {/* Handle */}
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-[5px] w-9 rounded-full bg-[#3a3a3c]" />
            </div>

            {/* App identity row */}
            <div className="flex items-center gap-3.5 px-5 pt-3 pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  appIconPath.startsWith("/") ? appIconPath : `/${appIconPath}`
                }
                alt=""
                className="h-[60px] w-[60px] rounded-[14px] bg-[#2c2c2e] object-contain p-2 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <DrawerPrimitive.Title className="text-[17px] font-semibold tracking-[-0.3px] text-white leading-snug">
                  {copyTitle}
                </DrawerPrimitive.Title>
                <DrawerPrimitive.Description className="text-[13px] text-[#8e8e93] truncate mt-0.5 leading-tight">
                  {subtitle}
                </DrawerPrimitive.Description>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2c2c2e] mx-5" />

            {/* Description */}
            <p className="px-5 pt-4 pb-5 text-[14px] leading-[1.55] text-[#ebebf5bf]">
              {copyDescription}
            </p>

            {/* Divider */}
            <div className="h-px bg-[#2c2c2e] mx-5" />

            {/* Steps */}
            <div className="px-5 py-4 space-y-0">
              {/* Step 1 */}
              <div className="flex items-center gap-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2c2c2e]">
                  <ShareIcon className="h-[18px] w-[18px] text-[#0a84ff]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] text-white leading-snug">
                    {copyShareStep}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              <div className="ml-5 h-3 w-px bg-[#3a3a3c]" />

              {/* Step 2 */}
              <div className="flex items-center gap-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2c2c2e]">
                  <AddIcon className="h-[18px] w-[18px] text-[#0a84ff]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] text-white leading-snug">
                    {copyAddToHomeScreenStep}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2c2c2e] mx-5" />

            {/* CTA */}
            <div className="px-5 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <button
                onClick={handleClose}
                className="w-full rounded-[14px] bg-[#2c2c2e] py-[13px] text-[17px] font-semibold text-[#0a84ff] tracking-[-0.2px] transition-opacity active:opacity-60"
              >
                Done
              </button>
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
