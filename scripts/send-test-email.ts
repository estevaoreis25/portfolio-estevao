import * as dotenv from "dotenv";
import * as path from "path";
import { resend, FROM_EMAIL, OWNER_EMAIL } from "../lib/resend";
import { OutreachEmail } from "../lib/email-templates";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  console.log(`📧 Enviando email de teste para ${OWNER_EMAIL}...`);

  const result = await resend.emails.send({
    from: `Estevão Reis <${FROM_EMAIL}>`,
    to: [OWNER_EMAIL],
    subject: "[TESTE] Seu próximo projeto digital",
    react: OutreachEmail(),
  });

  if (result.error) {
    console.error("❌ Erro ao enviar:", result.error);
    process.exit(1);
  }

  console.log("✅ Email enviado! ID:", result.data?.id);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
