import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Button,
  Hr,
  Link,
} from "@react-email/components";

// ─── Shared styles ─────────────────────────────────────────────────────────────

const main = {
  backgroundColor: "#0C0C0F",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#111115",
  margin: "0 auto",
  padding: "0 0 48px",
  maxWidth: "600px",
  borderRadius: "16px",
  border: "1px solid #2A2A35",
  overflow: "hidden" as const,
};

const header = {
  backgroundColor: "#7C3AED",
  padding: "32px 40px",
};

const headerCenter = {
  backgroundColor: "#7C3AED",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const headerLabel = {
  margin: "0 0 8px",
  fontSize: "12px",
  fontWeight: "700" as const,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.7)",
};

const h1 = {
  margin: "0",
  fontSize: "24px",
  fontWeight: "800" as const,
  color: "#ffffff",
  letterSpacing: "-0.02em",
  lineHeight: "1.3",
};

const emojiIcon = {
  margin: "0 0 12px",
  fontSize: "36px",
  lineHeight: "1",
};

const body = {
  padding: "32px 40px 0",
};

const label = {
  margin: "0 0 8px",
  fontSize: "11px",
  fontWeight: "700" as const,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#7C3AED",
};

const infoBox = {
  margin: "32px 40px 0",
  backgroundColor: "#0C0C0F",
  borderRadius: "10px",
  border: "1px solid #2A2A35",
  padding: "20px 24px",
};

const senderName = {
  margin: "0",
  fontSize: "17px",
  fontWeight: "700" as const,
  color: "#F0F0F5",
  lineHeight: "1.4",
};

const senderEmailLink = {
  display: "block" as const,
  marginTop: "4px",
  fontSize: "14px",
  color: "#A855F7",
  textDecoration: "none",
};

const messageBox = {
  backgroundColor: "#0C0C0F",
  borderRadius: "10px",
  border: "1px solid #2A2A35",
  padding: "20px 24px",
  marginBottom: "28px",
};

const messageText = {
  margin: "0",
  fontSize: "15px",
  color: "#C0C0D0",
  lineHeight: "1.75",
  whiteSpace: "pre-wrap" as const,
};

const replyButton = {
  backgroundColor: "#7C3AED",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700" as const,
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block" as const,
};

const hr = {
  borderColor: "#2A2A35",
  margin: "32px 40px",
};

const footerText = {
  margin: "0",
  fontSize: "12px",
  color: "#4A4A60",
  padding: "0 40px",
  lineHeight: "1.6",
};

// ─── Confirmation-specific ──────────────────────────────────────────────────────

const bodyCenter = {
  padding: "32px 40px 0",
  textAlign: "center" as const,
};

const greetingText = {
  margin: "0 0 16px",
  fontSize: "16px",
  color: "#C0C0D0",
  lineHeight: "1.7",
};

const subText = {
  margin: "0 0 28px",
  fontSize: "15px",
  color: "#8080A0",
  lineHeight: "1.7",
};

const whatsappButton = {
  backgroundColor: "rgba(37,211,102,0.15)",
  border: "1.5px solid rgba(37,211,102,0.4)",
  borderRadius: "8px",
  color: "#4ade80",
  fontSize: "14px",
  fontWeight: "700" as const,
  textDecoration: "none",
  padding: "12px 28px",
  display: "inline-block" as const,
};

const footerName = {
  margin: "0 0 4px",
  fontSize: "13px",
  fontWeight: "700" as const,
  color: "#F0F0F5",
  textAlign: "center" as const,
};

const footerRole = {
  margin: "0",
  fontSize: "12px",
  color: "#4A4A60",
  textAlign: "center" as const,
};

// ─── Components ────────────────────────────────────────────────────────────────

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactNotificationEmail({
  name,
  email,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Novo contato de {name} pelo seu portfólio</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerLabel}>Portfólio · Estevão Reis</Text>
            <Heading style={h1}>Novo contato recebido</Heading>
          </Section>

          {/* Sender info */}
          <Section style={infoBox}>
            <Text style={label}>De</Text>
            <Text style={senderName}>{name}</Text>
            <Link href={`mailto:${email}`} style={senderEmailLink}>
              {email}
            </Link>
          </Section>

          {/* Message */}
          <Section style={body}>
            <Text style={label}>Mensagem</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
            <Button href={`mailto:${email}`} style={replyButton}>
              Responder agora →
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footerText}>
            Esta mensagem foi enviada pelo formulário de contato do seu
            portfólio.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

interface ContactConfirmationEmailProps {
  name: string;
}

export function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps) {
  const waUrl =
    "https://wa.me/5561991794329?text=Ol%C3%A1+Estev%C3%A3o%21+Vi+seu+portf%C3%B3lio+e+quero+conversar+sobre+um+projeto.";

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Recebi sua mensagem! Falo em breve 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerCenter}>
            <Text style={emojiIcon}>✉️</Text>
            <Heading style={h1}>Mensagem recebida!</Heading>
          </Section>

          {/* Body */}
          <Section style={bodyCenter}>
            <Text style={greetingText}>
              Olá, <strong style={{ color: "#F0F0F5" }}>{name}</strong>!
              <br />
              Recebi sua mensagem e vou dar um retorno em breve. 🚀
            </Text>
            <Text style={subText}>
              Enquanto isso, você também pode me chamar diretamente pelo
              WhatsApp se quiser agilizar.
            </Text>
            <Button href={waUrl} style={whatsappButton}>
              Chamar no WhatsApp
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footerName}>Estevão Reis</Text>
          <Text style={footerRole}>FullStack Software Engineer</Text>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Outreach Cold Email ──────────────────────────────────────────────────────

const outreachMain = {
  backgroundColor: "#f4f4f5",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const outreachContainer = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  margin: "40px auto",
  padding: "40px",
  maxWidth: "560px",
};

const outreachP = {
  margin: "0 0 18px",
  fontSize: "15px",
  color: "#1a1a1a",
  lineHeight: "1.7",
};

const outreachArrowLink = {
  display: "block" as const,
  fontSize: "15px",
  color: "#1a1a1a",
  textDecoration: "none",
  margin: "0 0 6px",
  lineHeight: "1.7",
};

const outreachPortfolioLink = {
  color: "#7C3AED",
  textDecoration: "none",
  fontSize: "15px",
};

const outreachWaButton = {
  backgroundColor: "#25D366",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700" as const,
  textDecoration: "none",
  padding: "13px 28px",
  display: "inline-block" as const,
};

const outreachNote = {
  margin: "0 0 18px",
  fontSize: "15px",
  color: "#1a1a1a",
  lineHeight: "1.7",
};

const outreachHrStyle = {
  borderColor: "#e5e7eb",
  margin: "28px 0",
};

const outreachFooterText = {
  margin: "0 0 4px",
  fontSize: "14px",
  color: "#374151",
  fontWeight: "600" as const,
};

const outreachSmall = {
  margin: "0",
  fontSize: "12px",
  color: "#9ca3af",
  lineHeight: "1.6",
};

const outreachUnsubText = {
  margin: "16px 0 0",
  fontSize: "11px",
  color: "#9ca3af",
  lineHeight: "1.6",
};

const outreachUnsubLink = {
  color: "#9ca3af",
  textDecoration: "underline",
};

export function OutreachEmail() {
  const portfolioUrl = "https://portfolio-estevao-phi.vercel.app/";
  const waUrl =
    "https://wa.me/5561991794329?text=Oi+Estev%C3%A3o%2C+tenho+um+projeto+e+quero+conversar.";

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>
        Projetos reais em produção. Se tiver algo em mente, a gente conversa —
        sem compromisso.
      </Preview>
      <Body style={outreachMain}>
        <Container style={outreachContainer}>
          <Text style={outreachP}>Oi,</Text>

          <Text style={outreachP}>
            A maioria das ideias de produto digital morre não por falta de
            vontade — mas porque encontrar um dev confiável, que entregue no
            prazo e cujo sistema realmente funcione em produção, é difícil.
          </Text>

          <Text style={outreachP}>
            Eu sou o Estevão. Engenheiro de software com 4 anos de experiência.
            Já construí desde apps mobile até plataformas SaaS — tudo rodando em
            produção real:
          </Text>

          <Section style={{ margin: "0 0 20px" }}>
            <Link href="https://nutriko.online/" style={outreachArrowLink}>
              → nutriko.online
            </Link>
            <Link href="https://www.meualbuum.com/" style={outreachArrowLink}>
              → meualbuum.com
            </Link>
            <Link href="https://www.crerchurch.com/" style={outreachArrowLink}>
              → crerchurch.com
            </Link>
          </Section>

          <Text style={outreachP}>
            Se você tem algo parado na cabeça esperando o momento certo, esse
            momento pode ser agora.
          </Text>

          <Text style={outreachNote}>
            Dá uma olhada no meu portfólio:{" "}
            <Link href={portfolioUrl} style={outreachPortfolioLink}>
              portfolio-estevao-phi.vercel.app
            </Link>
          </Text>

          <Text style={outreachP}>
            Ou me chama direto no WhatsApp se quiser conversar — sem
            compromisso:
          </Text>

          <Section style={{ margin: "0 0 24px" }}>
            <Button href={waUrl} style={outreachWaButton}>
              💬 Falar no WhatsApp
            </Button>
          </Section>

          <Hr style={outreachHrStyle} />

          <Text style={outreachFooterText}>Estevão Reis</Text>
          <Text style={outreachSmall}>
            Desenvolvedor FullStack · Brasília, BR
          </Text>

          <Text style={outreachUnsubText}>
            Você está recebendo esse e-mail porque seu endereço está associado a
            uma plataforma digital. Para não receber mais,{" "}
            <Link
              href="mailto:contato@viadata.com.br?subject=descadastrar"
              style={outreachUnsubLink}
            >
              clique aqui para se descadastrar
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
