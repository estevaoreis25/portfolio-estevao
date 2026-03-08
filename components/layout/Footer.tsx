"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { developer } from "@/lib/data";
import { getCurrentMonth, buildWhatsAppUrl } from "@/lib/utils";

const navLinks = [
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Processo", href: "#processo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const month = getCurrentMonth();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        padding: "64px 24px 32px",
      }}
      role="contentinfo"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              <span style={{ color: "var(--purple-light)" }}>Estevão</span> Reis
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              Software Engineer FullStack
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              {
                "\u201cConstruindo solu\u00e7\u00f5es que funcionam em produ\u00e7\u00e3o desde 2021.\u201d"
              }
            </p>

            {/* Availability Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                padding: "6px 14px",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid var(--border-glow)",
                borderRadius: 20,
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
              <span
                style={{ fontSize: "0.775rem", color: "var(--text-secondary)" }}
              >
                Aceitando projetos · {month}
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.825rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Navegação
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--purple-light)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--text-secondary)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.825rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Contato
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={`mailto:${developer.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--purple-light)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                <Mail size={15} />
                {developer.email}
              </a>
              <a
                href={buildWhatsAppUrl(
                  developer.whatsapp,
                  developer.whatsappMessage,
                )}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--purple-light)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                <Phone size={15} />
                {developer.phone}
              </a>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--purple-light)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                <Linkedin size={15} />
                linkedin.com/in/estevaoreis
              </a>
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--purple-light)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                <Github size={15} />
                github.com/estevaoreis25
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
            © 2025 Estevão Reis · Desenvolvido com dedicação, não com template.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <a
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Estevão Reis"
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--purple-light)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--text-muted)")
              }
            >
              <Linkedin size={18} />
            </a>
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Estevão Reis"
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--purple-light)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--text-muted)")
              }
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
