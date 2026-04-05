/**
 * sync-emails.ts
 * Fetches emails from QueroCPF and Nutriko Neon databases,
 * deduplicates them, and writes to data/outreach-emails.csv.
 *
 * Usage: npm run sync:emails
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { Client } from "pg";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const CSV_PATH = path.resolve(process.cwd(), "data", "outreach-emails.csv");

async function fetchEmails(
  connectionString: string,
  label: string,
): Promise<string[]> {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  const result = await client.query<{ email: string }>(
    `SELECT DISTINCT lower(trim(email)) AS email
     FROM "User"
     WHERE email IS NOT NULL AND trim(email) != ''`,
  );
  await client.end();

  const emails = result.rows.map((r) => r.email).filter(Boolean);
  console.log(`[${label}] ${emails.length} emails encontrados`);
  return emails;
}

function readExistingCsv(): Map<string, string> {
  const map = new Map<string, string>();
  if (!fs.existsSync(CSV_PATH)) return map;

  const lines = fs.readFileSync(CSV_PATH, "utf-8").trim().split("\n");
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const comma = line.indexOf(",");
    if (comma === -1) continue;
    const email = line.slice(0, comma).trim();
    const enviado = line.slice(comma + 1).trim();
    map.set(email, enviado);
  }
  return map;
}

function writeCsv(data: Map<string, string>) {
  const dir = path.dirname(CSV_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const lines = ["email,enviado"];
  for (const [email, enviado] of data) {
    lines.push(`${email},${enviado}`);
  }
  fs.writeFileSync(CSV_PATH, lines.join("\n") + "\n", "utf-8");
}

async function main() {
  const querocpfUrl = process.env.QUEROCPF_DATABASE;
  const nutrikoUrl = process.env.NUTRIKO_DATABASE;

  if (!querocpfUrl || !nutrikoUrl) {
    console.error(
      "❌ QUEROCPF_DATABASE ou NUTRIKO_DATABASE não encontrado em .env.local",
    );
    process.exit(1);
  }

  console.log("🔍 Buscando emails nos bancos de dados...\n");

  const [querocpfEmails, nutrikoEmails] = await Promise.all([
    fetchEmails(querocpfUrl, "QueroCPF"),
    fetchEmails(nutrikoUrl, "Nutriko"),
  ]);

  const allNew = new Set([...querocpfEmails, ...nutrikoEmails]);

  const existing = readExistingCsv();

  let addedCount = 0;
  for (const email of allNew) {
    if (!existing.has(email)) {
      existing.set(email, "false");
      addedCount++;
    }
  }

  writeCsv(existing);

  const total = existing.size;
  const pending = [...existing.values()].filter((v) => v !== "true").length;

  console.log(`\n✅ CSV atualizado: ${total} emails totais`);
  console.log(`   • ${addedCount} novos adicionados`);
  console.log(`   • ${pending} pendentes de envio`);
  console.log(`   • ${total - pending} já enviados`);
  console.log(`\n📄 ${CSV_PATH}`);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
