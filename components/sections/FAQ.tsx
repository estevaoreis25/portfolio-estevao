"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems, faqCategories, type FAQItem } from "@/lib/data/faq";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.04 },
  }),
};

function renderAnswer(text: string) {
  const parts = text.split("\n\n");
  return parts.map((para, i) => (
    <p
      key={i}
      style={{
        fontSize: "0.9rem",
        color: "var(--text-secondary)",
        lineHeight: 1.75,
        margin: 0,
        marginBottom: i < parts.length - 1 ? 12 : 0,
      }}
    >
      {para}
    </p>
  ));
}

function FAQAccordion({
  item,
  isOpen,
  onToggle,
  animIdx,
  inView,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  animIdx: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const sideBorderColor =
    isOpen || hovered ? "var(--border-glow)" : "var(--border)";

  return (
    <motion.div
      custom={animIdx}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-elevated)",
        borderTop: `1px solid ${sideBorderColor}`,
        borderRight: `1px solid ${sideBorderColor}`,
        borderBottom: `1px solid ${sideBorderColor}`,
        borderLeft: isOpen
          ? "3px solid var(--purple-main)"
          : "3px solid transparent",
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: isOpen ? "0 4px 28px rgba(124,58,237,0.09)" : "none",
      }}
    >
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "20px 22px",
          background: "none",
          border: "none",
          cursor: "none",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: isOpen ? "var(--purple-light)" : "var(--text-primary)",
            lineHeight: 1.45,
            transition: "color 0.2s ease",
            flex: 1,
          }}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            flexShrink: 0,
            marginTop: 2,
            color: isOpen ? "var(--purple-light)" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s ease",
          }}
        >
          <Plus size={18} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "16px 22px 22px",
                borderTop: "1px solid var(--border)",
              }}
            >
              {renderAnswer(item.answer)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // stagger counter — starts at 1 (0 reserved for header)
  let animIdx = 1;

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-title"
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
            "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <h2
            id="faq-title"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Perguntas{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              frequentes
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
            }}
          >
            Tudo que você precisa saber antes de tomar uma decisão.
          </p>
        </motion.div>

        {/* Category groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {faqCategories.map((cat) => {
            const catItems = faqItems.filter((f) => f.category === cat.id);
            const catLabelIdx = animIdx++;

            return (
              <div key={cat.id}>
                {/* Category separator */}
                <motion.div
                  custom={catLabelIdx}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--purple-light)",
                      fontFamily:
                        "var(--font-jetbrains), JetBrains Mono, monospace",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background:
                        "linear-gradient(90deg, var(--border-glow) 0%, var(--border) 50%, transparent 100%)",
                    }}
                  />
                </motion.div>

                {/* Items */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {catItems.map((item) => {
                    const itemIdx = animIdx++;
                    return (
                      <FAQAccordion
                        key={item.id}
                        item={item}
                        isOpen={openId === item.id}
                        onToggle={() => toggle(item.id)}
                        animIdx={itemIdx}
                        inView={inView}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          custom={animIdx}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{ textAlign: "center", marginTop: 64 }}
        >
          <a
            href="#contato"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              border: "1.5px solid var(--border-glow)",
              borderRadius: 9,
              color: "var(--purple-light)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              textDecoration: "none",
              background: "var(--purple-dim)",
              transition:
                "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(124,58,237,0.15)";
              el.style.borderColor = "var(--purple-main)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--purple-dim)";
              el.style.borderColor = "var(--border-glow)";
              el.style.transform = "translateY(0)";
            }}
          >
            Ainda tem dúvida? Me manda uma mensagem →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
