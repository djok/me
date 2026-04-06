export type AboutLang = 'en'

export const aboutContent = {
  en: {
    slug: 'about',
    seo: {
      title: 'Rosen Velikov | AI Infrastructure Engineer — Voice AI, Distributed Systems',
      description: 'Engineer and entrepreneur with 25 years building carrier-grade systems. Founder of Dictaro (voice-to-text platform), EVO.bg (70K+ households), clouWay (OSS/BSS). Rust, Python, Go.',
    },
    heading: 'Rosen Velikov',
    subtitle: 'AI Infrastructure Engineer · Voice AI · Distributed Systems',
    location: 'Veliko Tarnovo, Bulgaria',
    lastUpdated: 'April 2026',
    bio: [
      'Engineer and entrepreneur with 25 years building carrier-grade systems — from telecom infrastructure serving 70K+ households to a production AI voice-to-text platform with GPU inference, distributed service mesh, and full observability.',
      'Built Dictaro from scratch: a Rust desktop client with streaming VAD, a Python ASR server on NVIDIA DGX Spark (Canary-1B-v2, 6 switchable LLMs via vLLM/SGLang), a Go licensing API (OAuth2, JWT, Stripe), and 20+ Docker services connected via NATS service mesh with zero-trust networking (Cloudflare Tunnels).',
      'Co-founded EVO.bg (broadband operator, 70K+ households, 500+ km fiber) and clouWay (carrier-grade OSS/BSS platform in production since 2009). Security-first mindset forged in telecom: zero-trust, multi-layer auth, fault-tolerant architectures.',
    ],
    seeking: 'Seeking senior remote roles in EU',
    roles: ['AI Infrastructure Engineer', 'Voice AI Engineer', 'Distributed Systems Engineer'],
    timelineHeading: 'Experience',
    timeline: [
      { period: '2025-present', role: 'Founder & Lead Engineer', company: 'Dictaro', desc: 'Production voice-to-text platform: Rust + Python + Go, DGX Spark, NATS, 20+ services' },
      { period: '2003-present', role: 'Co-Founder & General Manager', company: 'EVO.bg', desc: '70K+ households, 500+ km fiber, partial exit to mobile operator' },
      { period: '2009-present', role: 'Co-Founder', company: 'clouWay', desc: 'Carrier-grade OSS/BSS platform, in production since 2009' },
    ],
    projectsHeading: 'Projects',
    projects: [
      { name: 'Dictaro', desc: 'Distributed voice-to-text: Rust client, GPU ASR, Go API, NATS mesh, full observability', href: '#' },
      { name: 'EVO.bg', desc: 'Broadband & TV operator: 70K+ households, 500+ km fiber, FTTH rollout', href: '#' },
      { name: 'clouWay OSS/BSS', desc: 'Carrier-grade telecom platform: billing, CRM, provisioning, revenue assurance', href: '#' },
      { name: 'Solar Monitoring', desc: '160+ HD cameras + 1,000+ sensors across 4 solar plants', href: '#' },
    ],
    certificationsHeading: 'Certifications',
    certifications: [],
    educationHeading: 'Education',
    education: [
      'Technical background in telecommunications and IT',
    ],
    pressHeading: 'Press',
    press: [],
    communityHeading: 'Community',
    community: [],
    faqHeading: 'Frequently Asked Questions',
    faq: [
      { q: 'Who is Rosen Velikov?', a: 'Rosen Velikov is an engineer and entrepreneur based in Veliko Tarnovo, Bulgaria, with 25 years building carrier-grade systems. He co-founded EVO.bg, a broadband and TV operator serving 70K+ households with 500+ km fiber infrastructure. He co-founded clouWay, which builds carrier-grade OSS/BSS platforms for telecom operators (in production since 2009). He now builds Dictaro, a production distributed voice-to-text platform with a Rust desktop client, GPU-accelerated ASR on NVIDIA DGX Spark, a Go licensing API, and 20+ Docker services connected via NATS service mesh with zero-trust networking.' },
      { q: 'What has Rosen built?', a: 'Rosen has built three major systems. Dictaro is a production distributed voice-to-text platform with a Rust client (65 source files, streaming VAD, 25 languages), Python ASR server (NVIDIA Canary-1B-v2, 6 LLMs via vLLM/SGLang), Go licensing API (OAuth2 x3, Stripe, JWT RS256), and 20+ Docker services with NATS service mesh and full Prometheus/Grafana/Loki observability. EVO.bg is a broadband operator he co-founded, growing from zero to 70K+ connected households with 500+ km fiber across 3 cities. clouWay is a carrier-grade OSS/BSS platform for telecom operators, continuously enhanced over 15+ years.' },
      { q: 'What is Rosen\'s tech stack?', a: 'Core languages: Rust (primary -- egui, tokio, serde), Python (FastAPI, vLLM, NeMo), Go (Gin, pgx, JWT, Stripe). Infrastructure: Docker (20+ services), NATS service mesh, Azure, Cloudflare Tunnels (zero-trust). AI/ML: NVIDIA Canary-1B-v2, vLLM/SGLang, Silero VAD, ONNX. Observability: Prometheus + Grafana (4 dashboards, 46+ panels) + Loki. CI/CD: 14+ GitHub Actions workflows with self-hosted runners.' },
    ],
    connectHeading: 'Connect',
    email: 'rosen.st.velikov@gmail.com',
  },
} as const
