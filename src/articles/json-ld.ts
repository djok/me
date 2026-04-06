type Lang = 'en'

interface JsonLdOptions {
  lang: Lang
  url: string
  altUrl: string
  headline: string
  alternativeHeadline: string
  description: string
  datePublished: string
  dateModified: string
  keywords: string[]
  images: string[]
  breadcrumbHome: string
  breadcrumbCurrent: string
  publisher?: { name: string; url: string }
  faq?: readonly { q: string; a: string }[]
  articleType?: 'Article' | 'TechArticle'
  about?: Array<Record<string, string>>
  extra?: Record<string, string>
  citation?: Array<{ '@type': string; name: string; url: string }>
  isBasedOn?: Record<string, unknown>
  mentions?: Array<Record<string, string>>
  discussionUrl?: string
  relatedLink?: string
}

const SITE_URL = 'https://djok.github.io/me'

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Rosen Velikov',
  url: SITE_URL,
  jobTitle: 'AI Infrastructure Engineer',
  sameAs: [
    'https://www.linkedin.com/in/rosenvelikov',
    'https://github.com/djok',
  ],
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Rosen Velikov Portfolio',
  url: SITE_URL,
}

export function buildArticleJsonLd(opts: JsonLdOptions) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': opts.articleType || 'Article',
      '@id': `${opts.url}/#article`,
      headline: opts.headline,
      alternativeHeadline: opts.alternativeHeadline,
      description: opts.description,
      author: { '@id': `${SITE_URL}/#person` },
      ...(opts.publisher ? {
        publisher: {
          '@type': 'Organization',
          name: opts.publisher.name,
          url: opts.publisher.url,
        },
      } : {}),
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
      keywords: opts.keywords,
      url: opts.url,
      mainEntityOfPage: opts.url,
      image: opts.images,
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      ...(opts.about ? { about: opts.about } : {}),
      ...(opts.extra || {}),
      ...(opts.citation ? { citation: opts.citation } : {}),
      ...(opts.isBasedOn ? { isBasedOn: opts.isBasedOn } : {}),
      ...(opts.mentions ? { mentions: opts.mentions } : {}),
      ...(opts.discussionUrl ? { discussionUrl: opts.discussionUrl } : {}),
      ...(opts.relatedLink ? { relatedLink: opts.relatedLink } : {}),
    },
    PERSON,
    WEBSITE,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: opts.breadcrumbHome, item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: opts.breadcrumbCurrent, item: opts.url },
      ],
    },
  ]

  if (opts.faq && opts.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: opts.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
