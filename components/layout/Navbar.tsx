"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { developer } from "@/lib/data";

const navLinks = [
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Processo", href: "#processo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(12,12,15,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <nav
        role="navigation"
        aria-label="Navegação principal"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="#hero"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <span style={{ color: "var(--purple-light)" }}>Estevão</span> Reis
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "flex",
            gap: 8,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    position: "relative",
                    padding: "6px 12px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive
                      ? "var(--purple-light)"
                      : "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) =>
                    !isActive &&
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    !isActive &&
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--text-secondary)")
                  }
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 12,
                        right: 12,
                        height: 2,
                        background: "var(--purple-main)",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button Desktop */}
        <a
          href={`https://wa.me/${developer.whatsapp}?text=${encodeURIComponent(developer.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "none",
            padding: "8px 20px",
            background: "var(--purple-main)",
            color: "#fff",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "0.875rem",
            textDecoration: "none",
            boxShadow: "0 0 16px var(--purple-glow)",
            transition: "box-shadow 0.2s ease",
          }}
          className="nav-cta"
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 24px var(--purple-glow)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 16px var(--purple-glow)")
          }
        >
          Falar agora
        </a>

        {/* Mobile Hamburger */}
        <button
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            cursor: "none",
            padding: 8,
          }}
          className="mobile-only"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav
          aria-label="Menu mobile"
          style={{
            background: "var(--bg-elevated)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 24px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color:
                      activeSection === link.href.slice(1)
                        ? "var(--purple-light)"
                        : "var(--text-secondary)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .nav-cta { display: block !important; }
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
