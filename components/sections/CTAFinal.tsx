"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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

type FormState = "idle" | "loading" | "success" | "error";

export default function CTAFinal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const waUrl = buildWhatsAppUrl(developer.whatsapp, developer.whatsappMessage);

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erro desconhecido");
      setFormState("success");
      setFields({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar.");
      setFormState("error");
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: "0.9375rem",
    color: "var(--text-primary)",
    outline: "none",
    fontFamily: "var(--font-dm-sans), sans-serif",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

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

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
          style={{ marginBottom: 32, textAlign: "left" }}
        >
          {formState === "success" ? (
            <div
              style={{
                background: "rgba(34,197,94,0.07)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 14,
                padding: "40px 32px",
                textAlign: "center",
              }}
            >
              <CheckCircle
                size={40}
                style={{ color: "#4ade80", marginBottom: 16 }}
              />
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Mensagem enviada!
              </p>
              <p
                style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}
              >
                Você vai receber uma confirmação por e-mail. Falo em breve. 🚀
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
                className="form-row"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                    }}
                  >
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={fields.name}
                    onChange={handleChange}
                    style={inputBase}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--border-glow)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                    }}
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={fields.email}
                    onChange={handleChange}
                    style={inputBase}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--border-glow)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: 6,
                  }}
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Me conte sobre o seu projeto ou ideia..."
                  value={fields.message}
                  onChange={handleChange}
                  style={{ ...inputBase, resize: "vertical", minHeight: 110 }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border-glow)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                />
              </div>

              {formState === "error" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: 8,
                  }}
                >
                  <AlertCircle size={15} style={{ color: "#f87171", flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#f87171" }}>
                    {errorMsg}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "13px 24px",
                  background:
                    formState === "loading"
                      ? "rgba(124,58,237,0.5)"
                      : "var(--purple-main)",
                  border: "none",
                  borderRadius: 10,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  cursor: formState === "loading" ? "not-allowed" : "none",
                  transition: "background 0.2s ease, transform 0.2s ease",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (formState !== "loading") {
                    (e.currentTarget as HTMLElement).style.background =
                      "#6D28D9";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (formState !== "loading") {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--purple-main)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }
                }}
              >
                {formState === "loading" ? (
                  <Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Send size={17} />
                )}
                {formState === "loading" ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={2}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span
            style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}
          >
            ou se preferir
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={3}
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
              padding: "14px 32px",
              background: "rgba(37,211,102,0.08)",
              border: "1.5px solid rgba(37,211,102,0.25)",
              borderRadius: 12,
              color: "#4ade80",
              fontWeight: 700,
              fontSize: "1rem",
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
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
