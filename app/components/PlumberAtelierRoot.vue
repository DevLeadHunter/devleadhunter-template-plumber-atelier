<template>
  <div
    ref="root"
    class="atelier"
    :style="cssVars">
    <!-- ════ Top bar — fine, éditoriale ════ -->
    <header class="topbar">
      <div class="topbar-inner">
        <span class="wordmark">{{ businessName }}</span>
        <span class="topbar-tag"
          >Artisan plombier<template v-if="city"> · {{ city }}</template></span
        >
        <div class="topbar-actions">
          <a
            v-if="phone"
            :href="`tel:${phone}`"
            class="topbar-phone"
            >{{ phone }}</a
          >
          <a
            href="#contact"
            class="topbar-cta"
            >Devis</a
          >
        </div>
      </div>
    </header>

    <main>
      <!-- ════ Hero — asymétrique 7/5 ════ -->
      <HeroSection
        :hero="hero"
        :business-name="businessName"
        :phone="phone"
        :city="city" />

      <!-- ════ Bandeau confiance — registre, pas des cards ════ -->
      <TrustSection
        v-if="trustItems.length"
        :items="trustItems" />

      <!-- ════ Services — index numéroté ════ -->
      <ServicesSection :services="services" />

      <!-- ════ À propos — les mots du prospect (masquée sans `about`) ════ -->
      <AboutSection
        v-if="hasAboutText"
        :about="about"
        :business-name="businessName"
        :city="city" />

      <!-- ════ L'artisan — split éditorial + garanties ════ -->
      <ArtisanSection
        v-if="whyItems.length"
        :why-us="whyUs"
        :city="city" />

      <!-- ════ Galerie — planches numérotées (masquée sans `gallery`) ════ -->
      <GallerySection
        v-if="galleryItems.length"
        :gallery="gallery" />

      <!-- ════ Avis — registre de citations (masquée sans `reviews`) ════ -->
      <ReviewsSection
        v-if="reviewItems.length"
        :reviews="reviews" />

      <!-- ════ FAQ — accordéon hairline (masquée sans `faq`) ════ -->
      <FaqSection
        v-if="faqItems.length"
        :faq="faq" />

      <!-- ════ Contact — l'unique moment sombre, dramatique ════ -->
      <ContactSection
        :contact="contact"
        :hero="hero"
        :phone="phone"
        :city="city" />
    </main>

    <footer class="foot">
      <span
        >© {{ year }} {{ businessName }}<template v-if="city"> · {{ city }}</template></span
      >
    </footer>
  </div>
</template>

<script lang="ts" setup>
/**
 * Template 'plumber-atelier' (« Plombier Atelier ») — direction artistique « Atelier ».
 * Vitrine papier laiton/encre, typo display serif (Fraunces) + sans technique (Archivo),
 * fiche d'intervention, index de services numéroté, règle graduée, à-propos éditorial,
 * galerie en planches numérotées, registre d'avis, FAQ accordéon, horaires dans la
 * section contact sombre. Animations : reveals doux au scroll via IntersectionObserver,
 * désactivés quand l'utilisateur réduit les animations.
 *
 * Racine publique de la template : elle rend un `SiteContent` typé et POSSÈDE sa copie
 * éditoriale (via `buildPlumberAtelierContent`). Aucune dépendance à demo-host.
 */
import type { ComputedRef, PropType, Ref } from 'vue'
import HeroSection from './sections/HeroSection.vue'
import TrustSection from './sections/TrustSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ArtisanSection from './sections/ArtisanSection.vue'
import GallerySection from './sections/GallerySection.vue'
import ReviewsSection from './sections/ReviewsSection.vue'
import FaqSection from './sections/FaqSection.vue'
import ContactSection from './sections/ContactSection.vue'
import type {
  AboutBlock,
  ContactBlock,
  FaqBlock,
  GalleryBlock,
  HeroBlock,
  PlumberAtelierPageContent,
  ReviewsBlock,
  ServicesBlock,
  WhyUsBlock,
} from '~/types/plumber-atelier'
import { buildPlumberAtelierContent } from '~/types/plumber-atelier'
import type { SiteContent } from '~/types/SiteContent'

/**
 * Racine de la template — l'unique point d'entrée public rendu par demo-host.
 * `content` porte les données variables réelles du prospect (toutes clés optionnelles).
 */
const props = defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: true,
  },
})

const parsed: ComputedRef<PlumberAtelierPageContent> = computed((): PlumberAtelierPageContent =>
  buildPlumberAtelierContent(props.content),
)

const businessName: ComputedRef<string> = computed((): string => parsed.value.businessName)
const phone: ComputedRef<string> = computed((): string => parsed.value.phone)
const city: ComputedRef<string> = computed((): string => parsed.value.city)
const hero: ComputedRef<HeroBlock> = computed((): HeroBlock => parsed.value.hero)
const services: ComputedRef<ServicesBlock> = computed((): ServicesBlock => parsed.value.services)
const about: ComputedRef<AboutBlock> = computed((): AboutBlock => parsed.value.about)
const whyUs: ComputedRef<WhyUsBlock> = computed((): WhyUsBlock => parsed.value.whyUs)
const gallery: ComputedRef<GalleryBlock> = computed((): GalleryBlock => parsed.value.gallery)
const reviews: ComputedRef<ReviewsBlock> = computed((): ReviewsBlock => parsed.value.reviews)
const faq: ComputedRef<FaqBlock> = computed((): FaqBlock => parsed.value.faq)
const contact: ComputedRef<ContactBlock> = computed((): ContactBlock => parsed.value.contact)

const trustItems: ComputedRef<Array<{ value: string; label: string }>> = computed(
  (): Array<{ value: string; label: string }> => parsed.value.trustItems,
)
const whyItems: ComputedRef<Array<{ label?: string }>> = computed(
  (): Array<{ label?: string }> => parsed.value.whyUs.items ?? [],
)
const hasAboutText: ComputedRef<boolean> = computed(
  (): boolean => (parsed.value.about.text ?? '').length > 0,
)
const galleryItems: ComputedRef<Array<{ url?: string; alt?: string }>> = computed(
  (): Array<{ url?: string; alt?: string }> => parsed.value.gallery.items ?? [],
)
const reviewItems: ComputedRef<Array<{ author?: string; rating?: number; text?: string }>> =
  computed(
    (): Array<{ author?: string; rating?: number; text?: string }> =>
      parsed.value.reviews.items ?? [],
  )
const faqItems: ComputedRef<Array<{ question?: string; answer?: string }>> = computed(
  (): Array<{ question?: string; answer?: string }> => parsed.value.faq.items ?? [],
)

const cssVars: ComputedRef<Record<string, string>> = computed((): Record<string, string> => ({
  '--brass': parsed.value.theme.primary,
  '--ink': parsed.value.theme.secondary,
  '--steel': parsed.value.theme.accent,
}))

const year: number = new Date().getFullYear()

/* ── Motion : reveals au scroll en IntersectionObserver ── */
const root: Ref<HTMLElement | null> = ref(null)

onMounted((): void => {
  if (!import.meta.client) return
  const el = root.value
  if (!el) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-in'))
    return
  }

  const io = new IntersectionObserver(
    (entries, obs): void => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          obs.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  )
  targets.forEach((t) => io.observe(t))
})

// Les polices sont déclarées ICI (pas dans un <head> global partagé) : demo-host ne charge
// que la racine de la template rendue, donc seule la typo de CETTE template est téléchargée.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap',
    },
  ],
})
</script>

<style scoped>
/* ════════════ Tokens & fondations ════════════ */
.atelier {
  --paper: #f5f1ea;
  --paper-2: #ece5d8;
  --paper-3: #e2d9c8;
  --hair: color-mix(in srgb, var(--ink) 16%, transparent);
  --ink-soft: color-mix(in srgb, var(--ink) 64%, var(--paper));

  background: var(--paper);
  color: var(--ink);
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.55;
  position: relative;
  overflow-x: clip;
}
/* grain papier */
.atelier::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
}
.atelier > * {
  position: relative;
  z-index: 1;
}
.atelier :deep(svg) {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.atelier :deep(.btn) {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Archivo', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  padding: 0.85rem 1.5rem;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;
}
.atelier :deep(.btn .ico) {
  width: 1.05rem;
  height: 1.05rem;
}
.atelier :deep(.btn-brass) {
  background: var(--brass);
  color: var(--paper);
  box-shadow: 4px 4px 0 var(--ink);
}
.atelier :deep(.btn-brass:hover) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ink);
}
.atelier :deep(.btn-ink) {
  background: transparent;
  color: var(--ink);
  border: 1.5px solid var(--ink);
}
.atelier :deep(.btn-ink:hover) {
  background: var(--ink);
  color: var(--paper);
}

/* ════════════ Top bar ════════════ */
.topbar {
  border-bottom: 1px solid var(--hair);
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(6px);
  position: sticky;
  top: 0;
  z-index: 40;
}
.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.wordmark {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
}
.topbar-tag {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--ink-soft);
  border-left: 1px solid var(--hair);
  padding-left: 1.2rem;
}
.topbar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1.1rem;
}
.topbar-phone {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  border-bottom: 2px solid var(--brass);
  padding-bottom: 1px;
}
.topbar-cta {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.45rem 1rem;
  border: 1.5px solid var(--ink);
}
.topbar-cta:hover {
  background: var(--ink);
  color: var(--paper);
}

/* ════════════ Sections génériques ════════════ */
.atelier :deep(.section-head) {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.atelier :deep(.section-kicker) {
  font-size: 0.74rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--brass);
  margin-bottom: 1rem;
}
.atelier :deep(.section-title) {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  max-width: 18ch;
}
.atelier :deep(.section-lede) {
  margin-top: 1.1rem;
  color: var(--ink-soft);
  max-width: 46ch;
}

/* ════════════ Footer ════════════ */
.foot {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.6rem 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

/* ════════════ Reveals ════════════ */
.atelier :deep(.reveal) {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
  will-change: opacity, transform;
}
.atelier :deep(.reveal.is-in) {
  opacity: 1;
  transform: none;
}

/* ════════════ Responsive ════════════ */
@media (max-width: 860px) {
  .topbar-inner {
    gap: 0.75rem;
  }
  .wordmark {
    font-size: 1rem;
    line-height: 1.1;
  }
  .topbar-phone {
    font-size: 0.85rem;
  }
  .topbar-cta {
    padding: 0.4rem 0.75rem;
  }
  .topbar-tag {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .atelier :deep(.reveal) {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .atelier * {
    scroll-behavior: auto;
  }
}
</style>
