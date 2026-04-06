import { StrictMode, lazy, Suspense, useState, useEffect, useRef, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import GlobalNav from './GlobalNav.tsx'

const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'))
const AboutPage = lazy(() => import('./AboutPage'))

/** Reset scroll + fade-in on route change (no animation on initial load to match prerender) */
function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { pathname } = location
  const initialPathname = useRef(pathname)
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setHasNavigated(true)
    }

    if (location.hash) {
      // Hash scroll: multi-pass to handle async rendering + highlight on final pass
      const hash = location.hash
      const scroll = () => {
        const el = document.querySelector(hash)
        el?.scrollIntoView({ behavior: 'instant' })
        return el
      }
      const t1 = setTimeout(scroll, 50)
      const t2 = setTimeout(scroll, 300)
      const t3 = setTimeout(() => {
        const el = scroll()
        if (el instanceof HTMLElement) {
          el.classList.add('hash-highlight')
          el.addEventListener('animationend', () => el.classList.remove('hash-highlight'), { once: true })
        }
      }, 800)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, location.hash, location.key])

  return (
    <div key={pathname} style={hasNavigated ? { animation: 'page-fade-in 0.25s ease-out' } : undefined}>
      {children}
    </div>
  )
}

function ConditionalNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/ops')) return null
  return <GlobalNav />
}

// Console easter egg
const ASCII_ART = `\n ██████╗  ██████╗ ███████╗███████╗███╗   ██╗\n ██╔══██╗██╔═══██╗██╔════╝██╔════╝████╗  ██║\n ██████╔╝██║   ██║███████╗█████╗  ██╔██╗ ██║\n ██╔══██╗██║   ██║╚════██║██╔══╝  ██║╚██╗██║\n ██║  ██║╚██████╔╝███████║███████╗██║ ╚████║\n ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝\n`
console.log(`%c${ASCII_ART}`, 'color: #f97316; font-size: 12px; font-family: monospace;')
console.log('%c Most people scroll. You inspect. I like that. ', 'background: #f97316; color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 3px;')
console.log('%cThe %cbest %cwork %cis %cinvisible.', 'color: #94a3b8; font-size: 13px;', 'color: #7e8d9d; font-size: 13px;', 'color: #687882; font-size: 13px;', 'color: #526268; font-size: 13px;', 'color: #3d4d52; font-size: 13px;')
console.log('%cYou just found some of it.', 'color: #94a3b8; font-size: 13px;')
console.log('%c I build the details. Let\'s solve something hard → rosen.st.velikov@gmail.com ', 'background: #f97316; color: #1a1a1a; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 3px;')

// Debug API for technical recruiters — type window.__rosen in console
Object.defineProperty(window, '__rosen', {
  value: Object.freeze({
    stack: 'React 19 + TypeScript + Vite + Tailwind v4 + Motion',
    render: 'Client-side SPA on GitHub Pages',
    perf: () => { const n = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming; console.table({ TTFB: `${Math.round(n.responseStart - n.requestStart)}ms`, DOMContentLoaded: `${Math.round(n.domContentLoadedEventEnd - n.startTime)}ms`, Load: `${Math.round(n.loadEventEnd - n.startTime)}ms` }); },
    hire_me: 'rosen.st.velikov@gmail.com',
  }),
  configurable: false,
})

function NotFound() {
  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
    robots.content = 'noindex, nofollow'
    document.title = '404 — Page not found | Rosen Velikov'
    return () => { robots.content = 'index, follow' }
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl font-display font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        {'<-'} Back to home
      </Link>
    </div>
  )
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter basename="/me">
      <ConditionalNav />
      <PageTransition>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/en" element={<App />} />
            <Route path="/about" element={<AboutPage lang="en" />} />
            <Route path="/privacy" element={<PrivacyPolicy lang="en" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <Analytics />
    </BrowserRouter>
  </StrictMode>
)

// Always use createRoot (no pre-rendered content on GitHub Pages)
createRoot(root).render(app)
