"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  ClipboardList,
  Code2,
  CheckCircle,
  Rocket,
} from "lucide-react";
import { workProcess } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={20} strokeWidth={1.5} />,
  ClipboardList: <ClipboardList size={20} strokeWidth={1.5} />,
  Code2: <Code2 size={20} strokeWidth={1.5} />,
  CheckCircle: <CheckCircle size={20} strokeWidth={1.5} />,
  Rocket: <Rocket size={20} strokeWidth={1.5} />,
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

export default function WorkProcess() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="processo"
      aria-labelledby="processo-title"
      style={{
        padding: "100px 24px",
        background: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
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
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <h2
            id="processo-title"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Como funciona{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              trabalhar comigo
            </span>
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--text-secondary)" }}>
            5 etapas. Sem surpresas. Com resultado.
          </p>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16,
            position: "relative",
          }}
          className="process-grid"
        >
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="process-line"
            style={{
              position: "absolute",
              top: 44,
              left: "10%",
              right: "10%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, var(--border-glow), var(--purple-main), var(--border-glow), transparent)",
              opacity: 0.5,
              zIndex: 0,
            }}
          />

          {workProcess.map((step, idx) => (
            <motion.article
              key={step.number}
              custom={idx + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "28px 20px",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-glow)";
                el.style.boxShadow = "0 8px 30px rgba(124,58,237,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Step number */}
              <span
                style={{
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--purple-main)",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                {step.number}
              </span>

              {/* Icon circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid var(--border-glow)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--purple-light)",
                  margin: "0 auto 16px",
                }}
              >
                {iconMap[step.icon]}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-line { display: none !important; }
        }
        @media (max-width: 639px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
