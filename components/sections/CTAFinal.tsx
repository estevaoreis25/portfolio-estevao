"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { developer } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

export default function CTAFinal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const waUrl = buildWhatsAppUrl(developer.whatsapp, developer.whatsappMessage);

  return (
    <section
      ref={ref}
      id="contato"
      aria-labelledby="contato-title"
      style={{
        padding: "100px 24px 120px",
        background: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated radial bg */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(900px, 100vw)",
          height: "min(900px, 100vw)",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "cta-pulse-bg 5s ease-in-out infinite",
        }}
      />

      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          style={{ marginBottom: 48 }}
        >
          <h2
            id="contato-title"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 20,
              lineHeight: 1.15,
            }}
          >
            Seu próximo projeto merece{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              engenharia de verdade.
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Vamos conversar sobre o que você precisa. Sem compromisso, sem
            enrolação. Uma conversa de 30 minutos pode mudar o rumo do seu
            projeto.
          </p>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
          style={{ textAlign: "center" }}
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              background: "rgba(37,211,102,0.08)",
              border: "1.5px solid rgba(37,211,102,0.25)",
              borderRadius: 12,
              color: "#4ade80",
              fontWeight: 700,
              fontSize: "1.0625rem",
              textDecoration: "none",
              transition:
                "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              boxShadow: "0 0 32px rgba(37,211,102,0.08)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(37,211,102,0.13)";
              el.style.borderColor = "rgba(37,211,102,0.45)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(37,211,102,0.08)";
              el.style.borderColor = "rgba(37,211,102,0.25)";
              el.style.transform = "translateY(0)";
            }}
          >
            <MessageCircle size={20} />
            Chamar no WhatsApp → {developer.phone}
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes cta-pulse-bg {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
