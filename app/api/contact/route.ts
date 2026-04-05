import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL, OWNER_EMAIL } from "@/lib/resend";
import {
  ContactNotificationEmail,
  ContactConfirmationEmail,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    // ── 1. Notify owner ───────────────────────────────────────────────────────
    await resend.emails.send({
      from: `Portfólio Estevão <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL],
      subject: `💌 Novo contato de ${name} — portfólio`,
      react: ContactNotificationEmail({ name, email, message }),
    });

    // ── 2. Confirm to visitor ─────────────────────────────────────────────────
    await resend.emails.send({
      from: `Estevão Reis <${FROM_EMAIL}>`,
      to: [email],
      subject: "Recebi sua mensagem! Falo em breve 🚀",
      react: ContactConfirmationEmail({ name }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 },
    );
  }
}
