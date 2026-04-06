import type { ComponentType } from 'react'

export interface ArticleSeo {
  title: string
  description: string
}

export interface ArticleSeoMeta {
  datePublished: string
  dateModified: string
  keywords: string[]
  articleType: 'Article' | 'TechArticle'
  articleTags: string
  images: string[]
  about: Array<Record<string, string>>
  extra?: Record<string, string>
  citation?: Array<{ '@type': string; name: string; url: string }>
  isBasedOn?: Record<string, unknown>
  mentions?: Array<Record<string, string>>
  discussionUrl?: string
  relatedLink?: string
}

export interface ArticleConfig {
  id: string
  slugs: { en: string }
  titles: { en: string }
  seo: { en: ArticleSeo }
  sectionLabels: { en: Record<string, string> }
  type: 'collab' | 'case-study' | 'bridge'
  ogImage?: string
  heroImage?: string
  component: () => Promise<{ default: ComponentType<{ lang: 'en' }> }>
  xDefaultSlug?: string
  ragReady?: boolean
  i18nFile?: string
  seoMeta?: ArticleSeoMeta
}

/** Article registry — currently empty, will be populated with Rosen's case studies later */
export const articleRegistry: ArticleConfig[] = []

/** Page titles for breadcrumb navigation */
export function getPageTitles(): Record<string, string> {
  const map: Record<string, string> = {
    '/': "Rosen's Portfolio",
    '/en': "Rosen's Portfolio",
    '/about': 'About',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.en}`] = article.titles.en
  }
  return map
}

/** Section labels for breadcrumb sub-navigation */
export function getSectionLabels(): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {}
  for (const article of articleRegistry) {
    map[`/${article.slugs.en}`] = article.sectionLabels.en
  }
  return map
}
