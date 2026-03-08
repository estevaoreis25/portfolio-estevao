export type FAQCategory = "processo" | "confianca" | "investimento";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export interface FAQCategoryMeta {
  id: FAQCategory;
  label: string;
}

export const faqCategories: FAQCategoryMeta[] = [
  { id: "processo", label: "Como funciona" },
  { id: "confianca", label: "Segurança e garantias" },
  { id: "investimento", label: "Valores e pagamento" },
];

export const faqItems: FAQItem[] = [
  // ─── PROCESSO ──────────────────────────────────────────────────────────────
  {
    id: "p1",
    category: "processo",
    question: "Como funciona o processo do início ao fim?",
    answer:
      "É simples e transparente. Começa com uma conversa de 30 minutos onde entendo seu negócio e o que você precisa. Depois envio uma proposta detalhada com escopo, prazo e valor — sem letras miúdas.\n\nAprovando, inicio o desenvolvimento com check-ins regulares para você acompanhar o progresso. Só dou o projeto como entregue quando você aprovar o resultado final.",
  },
  {
    id: "p2",
    category: "processo",
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "Depende do escopo — e sou honesto sobre isso desde o início. Uma landing page ou site institucional sai em 7 a 10 dias úteis. Um sistema com dashboard ou funcionalidades específicas leva entre 20 e 45 dias.\n\nO prazo é definido ANTES de começar, por escrito, e eu o cumpro. Se algo inesperado surgir, você é o primeiro a saber — nunca fico em silêncio.",
  },
  {
    id: "p3",
    category: "processo",
    question:
      "Como você garante que vai entender o que eu preciso se eu não entendo nada de tecnologia?",
    answer:
      "Esse é exatamente o meu trabalho. Você não precisa saber nada de código ou tecnologia — precisa apenas saber o que quer resolver no seu negócio. Faço as perguntas certas, traduzo suas necessidades em soluções técnicas e apresento tudo em linguagem clara.\n\nSe em algum momento você não entender algo, é sinal de que eu precisei me explicar melhor, não de que você não é capaz.",
  },

  // ─── CONFIANÇA ─────────────────────────────────────────────────────────────
  {
    id: "c1",
    category: "confianca",
    question: "Como sei que você não vai sumir no meio do projeto?",
    answer:
      "Essa é a objeção mais legítima que existe — e entendo completamente. Por isso estruturo o processo de forma que você nunca fique no escuro: fazemos check-ins semanais, você tem acesso ao progresso em tempo real e toda a comunicação fica registrada.\n\nAlém disso, trabalho com pagamento por etapas — você não paga tudo adiantado. Meu histórico fala por mim: já entreguei sistemas que estão em produção sendo usados por milhares de pessoas em órgãos governamentais. Não desapareço.",
  },
  {
    id: "c2",
    category: "confianca",
    question: "E se eu não gostar do resultado?",
    answer:
      "Todo projeto inclui rodadas de revisão justamente para isso. Apresento o trabalho em etapas, coleto seu feedback e ajusto. Não entrego uma caixa-preta no final e sumo.\n\nSe algo não estiver como você imaginou, trabalhamos juntos até chegar lá. O projeto só é encerrado quando você assinar embaixo que está satisfeito.",
  },
  {
    id: "c3",
    category: "confianca",
    question: "Por que contratar você ao invés de uma agência grande?",
    answer:
      "Em agências, você fala com o comercial, o projeto passa por um gerente, depois vai para um dev júnior que nunca te viu. Comigo, você fala diretamente com quem vai construir o seu projeto — do diagnóstico à entrega.\n\nIsso significa menos ruído, mais agilidade e um resultado que reflete exatamente o que foi combinado. Tenho a seriedade técnica de quem trabalhou com governo e fintech, com a agilidade e atenção de quem atende poucos clientes por vez.",
  },
  {
    id: "c4",
    category: "confianca",
    question: "O que acontece se der problema depois da entrega?",
    answer:
      "Todo projeto inclui 30 dias de suporte gratuito após a entrega. Se aparecer qualquer bug ou comportamento inesperado nesse período, resolvo sem custo adicional.\n\nApós os 30 dias, ofereço planos de manutenção mensal para quem quiser ter suporte contínuo. O código entregue é 100% seu — documentado e sem dependência de mim para funcionar.",
  },

  // ─── INVESTIMENTO ──────────────────────────────────────────────────────────
  {
    id: "i1",
    category: "investimento",
    question: "Quanto custa? Tenho medo de não caber no meu orçamento.",
    answer:
      "Não existe valor fixo — e faz sentido que seja assim. Cada projeto tem um contexto diferente: o escopo, os prazos, as integrações necessárias e o resultado esperado influenciam diretamente no investimento.\n\nO que fazemos primeiro é uma conversa gratuita de diagnóstico, sem compromisso. Em 30 minutos entendo exatamente o que você precisa, identifico a solução mais eficiente e apresento uma proposta com valor, prazo e escopo bem definidos. Só depois você decide — sem pressão, sem surpresa.",
  },
  {
    id: "i2",
    category: "investimento",
    question: "Como funciona o pagamento?",
    answer:
      "Para projetos menores, é 50% na aprovação da proposta e 50% na entrega. Para projetos maiores, dividimos em etapas: você paga conforme o trabalho avança e aprova cada fase.\n\nAceito PIX e transferência bancária. Emito recibo ou nota fiscal conforme sua necessidade.",
  },
  {
    id: "i3",
    category: "investimento",
    question:
      "Vou ficar preso a você para sempre para fazer qualquer alteração?",
    answer:
      "Não. O código é todo seu — entrego o repositório completo, com documentação. Qualquer outro dev consegue continuar o trabalho se precisar. Trabalho com tecnologias amplamente usadas no mercado justamente para que você tenha liberdade total.\n\nSe quiser continuar trabalhando comigo, ótimo. Se não quiser, sem problema — você sai com tudo nas mãos.",
  },
  {
    id: "i4",
    category: "investimento",
    question: "Preciso de um site ou sistema agora, ou posso esperar?",
    answer:
      "Depende do seu objetivo. Se você está perdendo clientes porque não tem presença digital — ou perdendo horas em processos manuais que um sistema resolveria — cada semana sem isso tem um custo real para o seu negócio, mesmo que invisível.\n\nA conversa de diagnóstico é gratuita e te ajuda a entender se faz sentido investir agora ou não. Não vendo o que você não precisa.",
  },
];
