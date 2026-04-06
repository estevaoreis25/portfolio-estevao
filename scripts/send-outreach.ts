/**
 * send-outreach.ts
 * Reads data/outreach-emails.csv and sends the outreach email to all
 * rows where enviado !== 'true'. Marks each row as sent immediately
 * after a successful send. Waits 800ms between sends.
 *
 * Usage: npm run send:outreach
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { resend, FROM_EMAIL } from "../lib/resend";
import { OutreachEmail } from "../lib/email-templates";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const CSV_PATH = path.resolve(process.cwd(), "data", "outreach-emails.csv");
const DELAY_MS = 800;
const BATCH_LIMIT = 3500;
const EMAIL_SUBJECT = "Seu próximo projeto digital 🚀";
const FROM = `Estevão Reis <${FROM_EMAIL}>`;

interface CsvRow {
  email: string;
  enviado: string;
}

function readCsv(): CsvRow[] {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ CSV não encontrado: ${CSV_PATH}`);
    console.error("   Execute primeiro: npm run sync:emails");
    process.exit(1);
  }

  const lines = fs.readFileSync(CSV_PATH, "utf-8").trim().split("\n");
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const comma = line.indexOf(",");
    if (comma === -1) continue;
    rows.push({
      email: line.slice(0, comma).trim(),
      enviado: line.slice(comma + 1).trim(),
    });
  }

  return rows;
}

function writeCsv(rows: CsvRow[]) {
  const lines = ["email,enviado"];
  for (const { email, enviado } of rows) {
    lines.push(`${email},${enviado}`);
  }
  fs.writeFileSync(CSV_PATH, lines.join("\n") + "\n", "utf-8");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const rows = readCsv();
  const allPending = rows.filter((r) => r.enviado !== "true");

  if (allPending.length === 0) {
    console.log("✅ Nenhum email pendente — todos já foram enviados.");
    return;
  }

  const pending = allPending.slice(0, BATCH_LIMIT);
  const alreadySent = rows.length - allPending.length;
  console.log(
    `📧 ${allPending.length} emails pendentes no total (${alreadySent} já enviados)`,
  );
  console.log(
    `🚀 Enviando lote de até ${BATCH_LIMIT}: ${pending.length} emails\n`,
  );

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < pending.length; i++) {
    const { email } = pending[i];
    const num = `[${i + 1}/${pending.length}]`;

    try {
      await resend.emails.send({
        from: FROM,
        to: [email],
        subject: EMAIL_SUBJECT,
        react: OutreachEmail(),
      });

      // Mark as sent and persist immediately
      const idx = rows.findIndex((r) => r.email === email);
      if (idx !== -1) rows[idx].enviado = "true";
      writeCsv(rows);

      sent++;
      console.log(`${num} ✅ ${email}`);
    } catch (err) {
      failed++;
      console.log(`${num} ❌ ${email} — ${(err as Error).message}`);
    }

    if (i < pending.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n✅ Concluído: ${sent} enviados, ${failed} erros`);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
