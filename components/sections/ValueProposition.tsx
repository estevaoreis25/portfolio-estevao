"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  LayoutDashboard,
  Smartphone,
  Settings,
  Workflow,
} from "lucide-react";
import { valueCards } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={22} strokeWidth={1.5} />,
  LayoutDashboard: <LayoutDashboard size={22} strokeWidth={1.5} />,
  Smartphone: <Smartphone size={22} strokeWidth={1.5} />,
  Settings: <Settings size={22} strokeWidth={1.5} />,
  Workflow: <Workflow size={22} strokeWidth={1.5} />,
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

export default function ValueProposition() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="valor"
      aria-labelledby="valor-title"
      style={{
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial BG */}
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
            "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 65%)",
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
            id="valor-title"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            O que você{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ganha
            </span>{" "}
            trabalhando comigo
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Não listo tecnologias. Listo o que muda no seu negócio.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
          className="val-grid"
        >
          {valueCards.map((card, idx) => (
            <motion.article
              key={card.title}
              custom={idx + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "32px",
                cursor: "default",
                transition:
                  "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3 },
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border-glow)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "inset 0 1px 0 rgba(255,255,255,0.03)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "var(--purple-dim)",
                  border: "1px solid var(--border-glow)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--purple-light)",
                  marginBottom: 20,
                }}
              >
                {iconMap[card.icon]}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {card.description}
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 12px",
                  background: "rgba(124,58,237,0.06)",
                  border: "1px solid rgba(124,58,237,0.15)",
                  borderRadius: 6,
                  fontSize: "0.8rem",
                  color: "var(--purple-light)",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{ color: "var(--purple-main)", fontSize: "0.9rem" }}
                >
                  →
                </span>
                {card.result}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .val-grid > :nth-child(5) { grid-column: 1 / -1; }
        @media (max-width: 767px) {
          .val-grid { grid-template-columns: 1fr !important; }
          .val-grid > :nth-child(5) { grid-column: auto; }
        }
      `}</style>
    </section>
  );
}
