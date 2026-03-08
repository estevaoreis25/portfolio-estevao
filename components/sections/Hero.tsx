"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { developer, heroStats } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

const codeLines = [
  {
    tokens: [
      { type: "keyword", text: "const" },
      { type: "plain", text: " " },
      { type: "property", text: "developer" },
      { type: "plain", text: " = {" },
    ],
  },
  {
    tokens: [
      { type: "plain", text: "  " },
      { type: "property", text: "name" },
      { type: "plain", text: ": " },
      { type: "string", text: '"Estevão Reis"' },
      { type: "plain", text: "," },
    ],
  },
  {
    tokens: [
      { type: "plain", text: "  " },
      { type: "property", text: "focus" },
      { type: "plain", text: ": " },
      { type: "bracket", text: "[" },
      { type: "string", text: '"Web"' },
      { type: "plain", text: ", " },
      { type: "string", text: '"Mobile"' },
      { type: "plain", text: ", " },
      { type: "string", text: '"APIs"' },
      { type: "bracket", text: "]" },
      { type: "plain", text: "," },
    ],
  },
  {
    tokens: [
      { type: "plain", text: "  " },
      { type: "property", text: "location" },
      { type: "plain", text: ": " },
      { type: "string", text: '"Brasília, BR"' },
      { type: "plain", text: "," },
    ],
  },
  {
    tokens: [
      { type: "plain", text: "  " },
      { type: "property", text: "currently" },
      { type: "plain", text: ": " },
      { type: "string", text: '"Aceitando projetos"' },
      { type: "plain", text: "," },
    ],
  },
  {
    tokens: [
      { type: "plain", text: "  " },
      { type: "property", text: "delivers" },
      { type: "plain", text: ": " },
      { type: "string", text: '"Resultado, não só código"' },
    ],
  },
  { tokens: [{ type: "plain", text: "}" }] },
  { tokens: [{ type: "plain", text: "" }] },
  {
    tokens: [
      { type: "comment", text: "// 4+ anos · 7 empresas · produção real" },
    ],
  },
];

const tokenColors: Record<string, string> = {
  keyword: "#A855F7",
  property: "#93c5fd",
  string: "#86efac",
  bracket: "#9090A8",
  comment: "#4A4A60",
  plain: "#F0F0F5",
};

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1200;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span
      ref={ref}
      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
    >
      {count}
      {suffix}
    </span>
  );
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

export default function Hero() {
  const waUrl = buildWhatsAppUrl(developer.whatsapp, developer.whatsappMessage);

  return (
    <section
      id="hero"
      aria-label="Apresentação"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          zIndex: 0,
        }}
      />
      {/* Radial glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left: Text */}
        <motion.div initial="hidden" animate="visible">
          {/* Availability Badge */}
          <motion.div custom={0} variants={fadeUp} style={{ marginBottom: 28 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 16px",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid var(--border-glow)",
                borderRadius: 20,
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--purple-light)",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  animation: "pulse-dot 1.8s ease-in-out infinite",
                }}
              />
              Disponível para projetos freelance
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.75rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 24,
            }}
          >
            Transformo{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              problemas reais
            </span>{" "}
            em soluções digitais que funcionam.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 520,
            }}
          >
            Sou Estevão, engenheiro de software FullStack com mais de 4 anos
            construindo sistemas que estão em produção — de órgãos
            governamentais a fintechs e ERPs. Agora aplico esse mesmo nível de
            qualidade para ajudar empresas como a sua a crescer digitalmente.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <a
              href="#projetos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                background: "var(--purple-main)",
                color: "#fff",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                boxShadow:
                  "0 0 24px var(--purple-glow), 0 0 48px rgba(124,58,237,0.1)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 32px var(--purple-glow), 0 0 64px rgba(124,58,237,0.15)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px var(--purple-glow), 0 0 48px rgba(124,58,237,0.1)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              Ver meus projetos <ArrowRight size={16} />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                background: "transparent",
                color: "var(--purple-light)",
                border: "1.5px solid var(--border-glow)",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--purple-main)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(124,58,237,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border-glow)";
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              <MessageCircle size={16} />
              Falar no WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            style={{ display: "flex", gap: 40, flexWrap: "wrap" }}
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-glow)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                background: "var(--bg-secondary)",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ef4444",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#eab308",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  marginLeft: 16,
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily:
                    "var(--font-jetbrains), JetBrains Mono, monospace",
                }}
              >
                developer.ts
              </span>
            </div>

            {/* Code */}
            <div
              style={{
                padding: "24px 24px 24px 20px",
                fontFamily:
                  "var(--font-jetbrains), 'JetBrains Mono', monospace",
                fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                lineHeight: 1.7,
              }}
            >
              {codeLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.08, duration: 0.3 }}
                  style={{ display: "flex", minHeight: "1.7em" }}
                >
                  <span
                    style={{
                      width: 28,
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      userSelect: "none",
                      flexShrink: 0,
                      paddingTop: 1,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span>
                    {line.tokens.map((tok, ti) => (
                      <span
                        key={ti}
                        style={{
                          color: tokenColors[tok.type] ?? "var(--text-primary)",
                        }}
                      >
                        {tok.text}
                      </span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
