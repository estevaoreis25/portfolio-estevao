"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { aboutDifferentials } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="sobre"
      aria-labelledby="sobre-title"
      style={{
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: "-5%",
          transform: "translateY(-50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 80,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="about-grid"
      >
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          {/* Photo container */}
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--border-glow)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)",
              aspectRatio: "4/5",
              maxWidth: 400,
              background: "var(--bg-elevated)",
            }}
          >
            <Image
              src="/images/estevao.png"
              alt="Estevão Reis — FullStack Software Engineer"
              fill
              sizes="(max-width: 900px) 100vw, 400px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </div>

          {/* Floating badge */}
          <div
            style={{
              position: "absolute",
              bottom: -16,
              right: -8,
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-glow)",
              borderRadius: 10,
              padding: "10px 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <p
              style={{
                fontSize: "0.775rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              🎓 Engenharia de Software · UnB · 2023
            </p>
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h2
            custom={0}
            variants={fadeUp}
            id="sobre-title"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 28,
              lineHeight: 1.2,
            }}
          >
            Quem está do{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              outro lado do código
            </span>
          </motion.h2>

          <motion.p
            custom={1}
            variants={fadeUp}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            Sou Estevão, engenheiro de software formado pela UnB. Comecei a
            programar em 2021 e desde então trabalhei em projetos que já estão
            sendo usados por milhares de pessoas — de órgãos governamentais a
            startups e redes de franquias.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            Minha diferença não é a stack que uso — é a forma como penso sobre
            os problemas. Antes de codar, eu entendo o negócio. E entrego código
            que funciona em produção, não só no ambiente local.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: 36,
            }}
          >
            Hoje, além do trabalho como engenheiro, ofereço projetos freelance
            selecionados para empresas que querem resultado digital de verdade —
            sem enrolação, sem sumiço.
          </motion.p>

          {/* Differentials */}
          <motion.div
            custom={4}
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
            className="diff-grid"
          >
            {aboutDifferentials.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "12px 14px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              >
                <CheckCircle
                  size={16}
                  strokeWidth={2}
                  style={{
                    color: "var(--purple-light)",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 500px) {
          .diff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
