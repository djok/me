export const seo = {
  en: {
    title:
      'Rosen Velikov | AI Infrastructure Engineer · Voice AI · Distributed Systems',
    description:
      'AI Infrastructure Engineer — 25 years building carrier-grade systems. Production Voice AI, Distributed Systems, Carrier-Grade Security. Rust, Python, Go.',
  },
};

export const translations = {
  en: {
    greeting: 'who builds',
    greetingRoles: ['AI Infrastructure', 'Distributed Systems', 'Voice AI Platforms'],
    email: 'rosen.st.velikov@gmail.com',
    role: 'carrier-grade systems.',
    story: {
      context: '+25 years building+ everything from scratch.',
      reflections: ['It works. Without me.', '...now what?'],
      hookParagraphs: [
        ['Built a telecom operator. Co-founded an OSS/BSS platform. Then built an AI voice platform.'],
        [
          "What drives me doesn't fit on a shelf.",
          '*Building* +systems that last+.',
        ],
      ],
      why: 'At Dictaro I built a production voice-to-text platform from scratch — Rust client, Python ASR on NVIDIA DGX, Go licensing API, 25 European languages, Stripe billing, 20+ Docker services.',
      seeking: [
        'This still feels like day one.',
        'Bigger teams. Harder problems. End-to-end.',
        "Ready for what's next.",
      ],
      nav: [
        { icon: 'briefcase', label: 'My path', href: '#experience' },
        { icon: 'folder', label: 'What I build', href: '#projects' },
        { icon: 'mail', label: "Let's talk", href: '#contact' },
        { icon: 'bot', label: 'Ask me', href: '#chat', highlight: true },
      ],
      skills: [
        'Distributed Systems',
        'AI / ML Infrastructure',
        'Zero-Trust Security',
        'Full Observability',
        'Telecom Infrastructure',
        'Rust · Python · Go',
      ],
      skipButton: 'Skip intro',
    },
    taglines: [] as readonly string[],
    location: 'Veliko Tarnovo, BG · EU remote',
    roles: [
      'AI Infrastructure Engineer',
      'Distributed Systems Architect',
      'Full-Stack Platform Engineer',
    ],
    summary: {
      title: 'Professional Summary',
      p1: 'Engineer and entrepreneur with 25 years building',
      p1Highlight: 'carrier-grade systems',
      p1End:
        '— from telecom infrastructure serving 70K+ households to a production AI voice-to-text platform with GPU inference, distributed service mesh, and full observability. Security-first mindset forged in telecom.',
      p2: 'End-to-end ownership across',
      p2Highlight: 'architecture → implementation → deployment → operations',
      p2End: ', from bare metal to cloud, from Rust to Python to Go.',
      cards: [
        {
          title: 'Builder Mindset',
          desc: 'Ship production systems from scratch — no frameworks, no shortcuts',
        },
        {
          title: 'Strengths',
          desc: 'Security-first architecture, fault tolerance, zero-trust networking',
        },
        {
          title: 'Technical Fluency',
          desc: 'Rust, Python, Go, Docker, NATS, Azure, GPU inference, full observability',
        },
      ],
    },
    coreCompetencies: {
      title: 'Core Competencies',
      items: [
        {
          title: 'Distributed Systems',
          desc: 'NATS service mesh, Docker orchestration, multi-machine deployments, health monitoring',
        },
        {
          title: 'AI / ML Infrastructure',
          desc: 'GPU inference (NVIDIA DGX), ASR model serving, LLM pipelines (vLLM/SGLang), A/B testing',
        },
        {
          title: 'Security & Zero-Trust',
          desc: 'Cloudflare Tunnels, OAuth2/JWT/NKey auth layers, rate limiting, PCI-compliant billing',
        },
        {
          title: 'Observability & Reliability',
          desc: 'Prometheus + Grafana + Loki, 46+ panels, 30-day retention, CI/CD health checks',
        },
        {
          title: 'Telecom Infrastructure',
          desc: 'FTTH/GPON, SDH, 500+ km fiber, OSS/BSS platform, carrier-grade reliability',
        },
        {
          title: 'Full-Stack Engineering',
          desc: 'Rust (egui, tokio), Python (FastAPI, NeMo), Go (Gin, pgx), TypeScript, Docker',
        },
      ],
    },
    techStack: {
      title: 'Tech Stack',
      categories: [
        {
          name: 'Languages',
          items: ['Rust', 'Python', 'Go', 'TypeScript / JavaScript'],
        },
        {
          name: 'AI / ML',
          items: ['NVIDIA Canary-1B-v2', 'vLLM / SGLang', 'Silero VAD', 'ONNX', 'Claude'],
        },
        {
          name: 'Infrastructure',
          items: ['Docker (20+ services)', 'NATS', 'Azure', 'Cloudflare Tunnels', 'GitHub Actions CI/CD'],
        },
        {
          name: 'Observability',
          items: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'Sentry'],
        },
        {
          name: 'Frameworks',
          items: ['egui (Rust)', 'FastAPI', 'Gin (Go)', 'tokio', 'Astro'],
        },
        { name: 'Data', items: ['PostgreSQL', 'Azure Blob Storage', 'Azure Log Analytics'] },
      ],
    },
    projects: {
      title: 'Projects',
      githubLink: 'github.com/djok',
      viewCode: 'View code',
      viewPrototype: 'View prototype',
      items: [
        {
          title: 'Content Digest',
          badge: 'Dictaro',
          badgeBuilding: 'Production',
          desc: 'Production distributed voice-to-text platform — Rust desktop client (egui, tokio, WASAPI, Silero VAD), Python ASR server on NVIDIA DGX Spark (Canary-1B-v2, vLLM/SGLang), Go licensing API (OAuth2, Stripe, JWT). 25 European languages, 20+ Docker services, NATS service mesh, zero-trust networking via Cloudflare Tunnels.',
          tech: ['Rust', 'Python', 'Go', 'NVIDIA DGX', 'NATS', 'Docker'],
          link: '',
        },
        {
          title: 'Life OS',
          badge: 'EVO.bg',
          badgeBuilding: '',
          desc: 'Co-founded and grew a next-generation broadband and TV operator from zero to 70K+ connected households. 500+ km fiber infrastructure across 3 cities and 18 rural areas. FTTH rollout covering 52,000 households. Partly sold to a mobile network operator.',
          tech: ['FTTH', 'GPON', 'SDH', 'IPTV', 'Fiber Infrastructure'],
          link: '',
        },
        {
          title: 'Portfolio',
          badge: 'This Portfolio',
          badgeBuilding: '',
          desc: 'Interactive CV with AI-augmented SDLC. SSR prerender, bilingual i18n, and automated SEO. Built with React 19, TypeScript, and Tailwind.',
          tech: ['React 19', 'TypeScript', 'Tailwind', 'Vite', 'Motion', 'Vercel'],
          link: 'github.com/djok/me',
        },
        {
          title: 'Self-Healing Chatbot',
          badge: 'clouWay OSS/BSS',
          badgeBuilding: '',
          desc: 'Co-founded an IT company that developed a carrier-grade, next-generation OSS/BSS platform for fixed telecom operators. End-to-end: billing, customer care, online rating & charging, resource management, service fulfillment, field operations, revenue assurance. In continuous production since 2009.',
          tech: ['Carrier-Grade', 'Billing', 'CRM', 'Provisioning', 'Revenue Assurance'],
          link: '',
        },
      ],
      saPlaybook: {
        title: 'AI Solutions Playbook',
        badge: 'Private · On Request',
        tagline: '',
        desc: 'Productivity system for Solutions Architects managing multiple DTC clients. Instant context switching between projects, automatic guardrails for production, and self-generating documentation.',
        features: [
          { icon: 'zap', text: 'Context switching from 30min to 30sec' },
          {
            icon: 'shield',
            text: 'Guardrails blocking destructive ops in prod',
          },
          {
            icon: 'fileText',
            text: 'Auto-generated SESSION_BRIEF on project open',
          },
          { icon: 'git', text: 'Full ADRs and operation logging' },
        ],
        footer: 'Available on request for relevant opportunities',
        cta: 'Request access',
      },
    },
    claudeCode: {
      title: 'AI-Augmented Development',
      badge: 'High-Agency · Builder',
      desc: 'Using Claude Code as a force multiplier for building production systems. The same engineering discipline I apply to telecom and AI infrastructure extends to my development workflow.',
      highlights: [
        'Career Ops: AI-powered job search pipeline processing 740+ offers with batch architecture',
        'Multi-agent orchestration for parallel evaluation and CV generation',
        'Claude Code skills and hooks for automated workflows across projects',
        'Open source contributions: career-ops, portfolio, and developer tooling',
      ],
      certs: [] as { title: string; url: string }[],
    },
    experience: {
      title: 'Work Experience',
      dictaro: {
        company: 'Dictaro',
        location: 'Remote',
        role: 'Founder & Lead Engineer',
        period: '2025 - Present · AI / Voice Technology',
        caseStudyUrl: '#projects',
        caseStudyLabel: 'See Dictaro project details',
        exit: '',
        exitDesc: '',
        highlights: [
          'Built and shipped a production distributed voice-to-text platform from scratch',
          'Rust desktop client: egui, tokio, WASAPI, Silero VAD, FLAC compression, 25 languages',
          'Python ASR server on NVIDIA DGX Spark: Canary-1B-v2, vLLM/SGLang (6 LLM models)',
          'Go licensing API: OAuth2 (Google, Azure AD, GitHub), Stripe billing, JWT RS256',
          '20+ Docker services across 2 machines, NATS service mesh, zero-trust networking',
          'Full observability: Prometheus + Grafana (46+ panels) + Loki + Promtail + Sentry',
          '14+ GitHub Actions CI/CD workflows with self-hosted runners and health checks',
        ],
        trustedBy: {
          label: 'Core technologies',
          logos: [] as { name: string; icon: string; src?: string }[],
        },
        businessOS: {
          title: 'Distributed Architecture',
          badge: 'NATS · Docker · Cloudflare',
          desc: '20+ Docker services across 2 machines (DGX Spark + Azure VM). NATS service mesh with request/reply patterns, health push every 30s, NKey per-instance authorization. Zero-trust networking via Cloudflare Tunnels (7+ tunnels — no exposed ports).',
          metrics: [
            { value: '20+', label: 'Docker services' },
            { value: '7+', label: 'Cloudflare tunnels' },
            { value: '46+', label: 'Grafana panels' },
          ],
          modules: [
            {
              icon: 'database',
              text: 'PostgreSQL on Azure with migration management',
            },
            {
              icon: 'users',
              text: 'Multi-provider OAuth2 + email/password authentication',
            },
            { icon: 'layout', text: 'Fleet management dashboard with real-time topology' },
            {
              icon: 'package',
              text: 'Stripe subscriptions, webhooks, customer portal',
            },
            {
              icon: 'messageSquare',
              text: 'NATS event monitoring and health push system',
            },
            {
              icon: 'receipt',
              text: 'Quota enforcement: free tier (10 min/day + cooldown), pro tier (unlimited)',
            },
            {
              icon: 'calendarCheck',
              text: 'Auto-update with SHA256 verification; MSIX and GitHub Releases distribution',
            },
          ],
          footer: 'See full architecture details',
        },
        jacobo: {
          title: 'ASR & LLM Pipeline',
          badge: 'NVIDIA DGX Spark',
          desc: 'GPU-accelerated inference with NVIDIA Canary-1B-v2 as primary ASR model. 6 switchable LLM models via vLLM/SGLang for post-processing. A/B model comparison and request replay via admin dashboard.',
          items: [
            {
              icon: 'network',
              text: 'NVIDIA Canary-1B-v2 primary model with Gemma4 alternatives',
            },
            {
              icon: 'calendar',
              text: '6 LLM models (Qwen 2B-9B, Gemma, BgGPT) for post-processing',
            },
            {
              icon: 'percent',
              text: 'A/B model comparison and request replay via admin dashboard',
            },
            {
              icon: 'package',
              text: 'Audio archived to Azure Blob Storage, metadata to Azure Log Analytics',
            },
            {
              icon: 'userCheck',
              text: 'Streaming VAD (Silero, 16kHz, 32ms frames) + hallucination filtering',
            },
          ],
          soldWith: 'Full ASR pipeline details',
          caseStudyUrl: '#projects',
        },
        webSeo: {
          title: 'Rust Desktop Client',
          badge: '65 source files',
          desc: 'Desktop application built with egui, tokio async runtime, and WASAPI audio capture. Streaming Voice Activity Detection, FLAC compression, 3 text injection methods with automatic fallback.',
          items: [
            {
              icon: 'fileText',
              text: 'Silero VAD via ONNX (16kHz, 32ms frames)',
            },
            {
              icon: 'image',
              text: 'FLAC audio compression (~60% bandwidth reduction)',
            },
            {
              icon: 'trendingUp',
              text: '3 text injection methods with automatic fallback',
            },
            {
              icon: 'gitBranch',
              text: 'Localized in 25 European languages',
            },
            { icon: 'bot', text: 'Sentry error tracking and telemetry' },
          ],
          codeAvailable: 'Rust client architecture',
          caseStudyUrl: '#projects',
        },
        erp: {
          title: 'Go Licensing API',
          desc: 'OAuth2, JWT RS256, Stripe integration, PostgreSQL, Prometheus metrics',
          metric: 'Production',
          caseStudyUrl: '#projects',
        },
        gpts: {
          title: 'Observability Stack',
          desc: 'Prometheus + Grafana (4 dashboards, 46+ panels) + Loki (30-day retention)',
          metric: '46+ panels',
          caseStudyUrl: '#projects',
        },
        reservas: {
          title: 'CI/CD Pipeline',
          desc: '14+ GitHub Actions workflows with self-hosted runners and health checks',
          metric: '14+ workflows',
          caseStudyUrl: '#projects',
        },
        crm: {
          title: 'Security Stack',
          desc: 'Zero-trust networking, multi-layer auth, SHA256 verification, rate limiting',
          metric: 'Zero-trust',
          caseStudyUrl: '#projects',
        },
        genAI: {
          title: 'Service Mesh',
          desc: 'NATS request/reply, health push every 30s, NKey per-instance authorization',
          metric: 'NATS',
          caseStudyUrl: '#projects',
        },
      },
      lico: {
        company: 'EVO.bg',
        location: 'Veliko Tarnovo, Bulgaria',
        role: 'Co-Founder & General Manager',
        period: '2003 - Present · Telecom / Infrastructure',
        desc: 'Co-founded and grew a next-generation broadband and TV operator from zero to 70K+ connected households. Built 500+ km fiber infrastructure connecting 3 cities and 18 rural areas. FTTH rollout: 52,000 households. Deployed Bulgaria\'s first alternative SDH link (155 Mbit/s, 67 km, 2004). Partly sold to a mobile network operator.',
        testimonial: {
          quote:
            '25 years of telecom-grade infrastructure — from 30m towers and fiber trenches to FTTH deployments serving tens of thousands of households.',
          author: 'EVO.bg',
          role: '70K+ connected households · 500+ km fiber',
        },
      },
      everis: {
        company: 'clouWay',
        role: 'Co-Founder',
        period: '2009 - Present · Enterprise Software',
        desc: 'Co-founded an IT company that developed a carrier-grade, next-generation OSS/BSS platform for fixed telecom operators. End-to-end telecom platform: billing, customer care, online rating & charging, resource and network management, service fulfillment, field operations, revenue assurance. In continuous production since 2009.',
        tesauro: {
          title: 'Carrier-Grade OSS/BSS Platform',
          desc: 'Deployed and operated by telecom operators — carrier-grade reliability requirements (24/7, five-nines target). Continuously enhanced over 15+ years in terms of functionality and process automation.',
        },
        testimonial: {
          quote:
            'A platform built for telecom-grade reliability — 24/7 operations, five-nines availability target, serving real operators with real customers.',
          author: 'clouWay',
          role: 'In production since 2009 · Carrier-grade reliability',
        },
      },
    },
    linkedinPosts: {
      title: 'Writing',
      cta: 'View on LinkedIn',
      items: [
        {
          hook: 'Built a voice-to-text platform from scratch — Rust client, Python ASR, Go API. 25 languages, 20+ Docker services.',
          reactions: '',
          comments: '',
          url: 'https://www.linkedin.com/in/rosenvelikov/',
        },
        {
          hook: '25 years in telecom taught me one thing: if it can break at 3 AM, it will. Build for that.',
          reactions: '',
          comments: '',
          url: 'https://www.linkedin.com/in/rosenvelikov/',
        },
        {
          hook: 'From 500+ km of fiber to NATS service meshes — infrastructure is infrastructure, just different layers.',
          reactions: '',
          comments: '',
          url: 'https://www.linkedin.com/in/rosenvelikov/',
        },
      ],
    },
    redditPosts: [] as { hook: string; upvotes: string; comments: string; subreddit: string; cta: string; url: string }[],
    speaking: {
      title: 'Sharing',
      slides: 'Slides',
      comingSoon: 'More coming soon.',
      aiFluency: {
        title: 'Open Source Contributions',
        badge: 'Builder · Open Source',
        desc: 'Active open source contributor. Career Ops (AI job search pipeline) and portfolio site are both open source. Building tools that solve real problems and sharing them with the community.',
        certs: [] as { title: string; url: string }[],
      },
      items: [
        {
          year: '2025',
          event: 'Open Source',
          eventUrl: 'https://github.com/djok/career-ops',
          title: 'Career Ops — AI Job Search Pipeline',
          desc: 'Open-sourced the AI-powered job search system: 740+ offers evaluated, 100+ tailored CVs generated. Built on Claude Code with batch processing architecture.',
          pdf: '',
          featured: true,
        },
        {
          year: '2025',
          event: 'Dictaro',
          eventUrl: '',
          title: 'Voice-to-Text Platform',
          desc: 'Built a production distributed voice-to-text platform: Rust + Python + Go, 25 European languages, NVIDIA DGX GPU inference.',
          pdf: '',
          featured: false,
        },
        {
          year: '2004',
          event: 'EVO.bg',
          eventUrl: '',
          title: 'First Alternative SDH Link in Bulgaria',
          desc: 'Deployed Bulgaria\'s first alternative SDH link (155 Mbit/s, 67 km to Veliko Tarnovo) — 30m tower, 2 km power line, 4 km fiber.',
          pdf: '',
          featured: false,
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          year: '2000s',
          org: 'Technical University',
          title: 'Telecommunications & IT',
          desc: 'Technical background in telecommunications and information technology',
          projectLink: '',
          projectLabel: '',
          testimonial: undefined as unknown as { quote: string; author: string; role: string; photo: string; linkedin: string },
        },
      ],
    },
    certifications: {
      title: 'Certifications',
      items: [] as { year: string; title: string; org: string; logo: string; url: string }[],
    },
    skills: {
      title: 'Skills',
      languages: 'Languages',
      spanish: 'Bulgarian',
      native: 'Native',
      english: 'English',
      professional: 'Professional working proficiency',
      technical: 'Technical Skills',
      soft: 'Soft Skills',
      softSkills: [
        'Systems Thinking',
        'E2E Ownership',
        'Security-First Mindset',
        'Leadership',
        'Fault-Tolerant Design',
        'Bias for Action',
        'Cross-Domain Integration',
      ],
    },
    cta: {
      title: "Let's talk",
      desc: 'Looking for a remote role (EU) where I can build production AI infrastructure, lead distributed systems engineering, and ship carrier-grade software.',
      contact: 'Contact',
    },
  },
} as const;

export type Lang = 'en';
