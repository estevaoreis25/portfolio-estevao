"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { techStack } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="stack"
      aria-labelledby="stack-title"
      style={{
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial bg */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.035) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <h2
            id="stack-title"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Ferramentas que uso para{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              construir soluções
            </span>
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            A stack importa menos que o resultado. Mas eis o que domino:
          </p>
        </motion.div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {techStack.map((group, gIdx) => (
            <motion.div
              key={group.category}
              custom={gIdx + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 24,
                  flexWrap: "wrap",
                }}
                className="stack-row"
              >
                {/* Category label */}
                <div
                  style={{
                    minWidth: 140,
                    paddingTop: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-syne), Syne, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {group.category}
                  </span>
                </div>

                {/* Badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {group.items.map((tech, tIdx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: gIdx * 0.08 + tIdx * 0.04 + 0.2,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      style={{
                        padding: "6px 14px",
                        background: "rgba(124,58,237,0.07)",
                        border: "1px solid rgba(124,58,237,0.18)",
                        borderRadius: 6,
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        fontFamily:
                          "var(--font-jetbrains), JetBrains Mono, monospace",
                        cursor: "default",
                        transition:
                          "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                        display: "inline-block",
                      }}
                      whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.15 },
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(124,58,237,0.14)";
                        el.style.borderColor = "var(--purple-main)";
                        el.style.color = "var(--purple-light)";
                        el.style.boxShadow = "0 0 12px rgba(124,58,237,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(124,58,237,0.07)";
                        el.style.borderColor = "rgba(124,58,237,0.18)";
                        el.style.color = "var(--text-secondary)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              {gIdx < techStack.length - 1 && (
                <div
                  style={{
                    marginTop: 24,
                    height: 1,
                    background: "var(--border)",
                    opacity: 0.5,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .stack-row { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
