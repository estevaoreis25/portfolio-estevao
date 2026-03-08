"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      animId = requestAnimationFrame(animateRing);
    };
    animId = requestAnimationFrame(animateRing);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-cursor-hover]");
      if (isInteractive) {
        dot.classList.add("!w-5", "!h-5");
        dot.style.background = "var(--purple-light)";
        ring.classList.add("!w-12", "!h-12");
        ring.style.borderColor = "var(--purple-main)";
      } else {
        dot.classList.remove("!w-5", "!h-5");
        dot.style.background = "var(--purple-main)";
        ring.classList.remove("!w-12", "!h-12");
        ring.style.borderColor = "rgba(124,58,237,0.5)";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          background: "var(--purple-main)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition:
            "width 0.15s ease, height 0.15s ease, background 0.15s ease",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: "1.5px solid rgba(124,58,237,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transition:
            "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
}
