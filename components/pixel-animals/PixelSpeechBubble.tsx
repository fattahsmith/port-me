"use client";

import React, { useEffect, useState } from "react";

interface PixelSpeechBubbleProps {
  message: string;
  onDismiss: () => void;
  /** Duration in ms before auto-dismiss */
  duration?: number;
}

export function PixelSpeechBubble({
  message,
  onDismiss,
  duration = 3200,
}: PixelSpeechBubbleProps) {
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDismissing(true);
    }, duration - 220);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!dismissing) return;
    const t = setTimeout(onDismiss, 220);
    return () => clearTimeout(t);
  }, [dismissing, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={`pixel-bubble${dismissing ? " dismissing" : ""}`}
    >
      {message}
    </div>
  );
}
