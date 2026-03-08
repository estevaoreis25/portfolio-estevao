"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="projetos"
      aria-labelledby="projetos-title"
      style={{
        padding: "100px 24px",
        background: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid BG */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
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
            id="projetos-title"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Projetos que geraram{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              resultado real
            </span>
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--text-secondary)" }}>
            Cada card abaixo é um problema resolvido.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
          }}
          className="proj-grid"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              custom={idx + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition:
                  "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                position: "relative",
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-glow)";
                el.style.boxShadow =
                  "0 12px 40px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03)";
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  height: 3,
                  background:
                    "linear-gradient(90deg, var(--purple-main), var(--purple-light))",
                  opacity: 0.8,
                }}
              />

              <div
                style={{
                  padding: "24px 24px 20px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Tags */}
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                    fontFamily:
                      "var(--font-jetbrains), JetBrains Mono, monospace",
                  }}
                >
                  {project.tag}
                </p>

                {/* Highlight result */}
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--purple-light)",
                    fontFamily: "var(--font-syne), Syne, sans-serif",
                    lineHeight: 1.2,
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.highlight}
                </p>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                    lineHeight: 1.35,
                    fontFamily: "var(--font-syne), Syne, sans-serif",
                  }}
                >
                  {project.title}
                </h3>

                {/* Company badge */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: 4,
                    fontSize: "0.75rem",
                    color: "var(--purple-light)",
                    fontWeight: 500,
                    marginBottom: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  {project.company}
                </span>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {"liveUrl" in project && project.liveUrl && (
                  <div style={{ marginTop: 16 }}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--purple-light)",
                        textDecoration: "none",
                        padding: "6px 12px",
                        border: "1px solid rgba(124,58,237,0.3)",
                        borderRadius: 6,
                        background: "rgba(124,58,237,0.07)",
                        transition:
                          "background 0.2s ease, border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(124,58,237,0.15)";
                        el.style.borderColor = "var(--border-glow)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(124,58,237,0.07)";
                        el.style.borderColor = "rgba(124,58,237,0.3)";
                      }}
                    >
                      <ExternalLink size={13} strokeWidth={2} />
                      Ver site
                    </a>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .proj-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 639px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
