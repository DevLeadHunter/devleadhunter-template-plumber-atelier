/**
 * Types + construction du contenu de la template 'plumber-atelier' (« Plombier Atelier »).
 *
 * La template est une couche (layer) Nuxt autonome : elle ne connaît rien de Storyblok,
 * du tunnel ou de PostHog. Elle rend un `SiteContent` typé (les données variables réelles
 * du prospect) et POSSÈDE sa propre copie éditoriale/boilerplate (titres de sections,
 * badge hero, libellés CTA, repères de confiance, garanties de l'artisan, services par
 * défaut…) sous forme de valeurs par défaut — c'est du design, pas de la donnée client.
 *
 * `buildPlumberAtelierContent` fusionne les deux : données variables issues de `SiteContent`,
 * boilerplate issu des défauts ci-dessous, pour produire la structure typée que les
 * sections attendent.
 */
import type { SiteContent } from '~/types/SiteContent'

export type Theme = { primary: string; secondary: string; accent: string }

/** Atelier laiton/papier — le laiton porte la signature, l'encre les zones sombres. */
export const defaultTheme: Theme = { primary: '#B8732E', secondary: '#1C1B19', accent: '#2E5B6B' }

export interface HeroBlock {
  component?: string
  title?: string
  subtitle?: string
  phone?: string
  cta_label?: string
  badge?: string
  image?: string
}

export interface TrustBlock {
  component?: string
  items?: Array<{ value?: string; label?: string }>
}

export interface ServicesBlock {
  component?: string
  heading?: string
  subheading?: string
  items?: Array<{ label?: string; description?: string; icon?: string }>
}

export interface WhyUsBlock {
  component?: string
  heading?: string
  items?: Array<{ label?: string }>
}

export interface AboutBlock {
  component?: string
  heading?: string
  text?: string
  image?: string
}

export interface GalleryBlock {
  component?: string
  heading?: string
  subheading?: string
  items?: Array<{ url?: string; alt?: string }>
}

export interface ReviewsBlock {
  component?: string
  heading?: string
  subheading?: string
  items?: Array<{ author?: string; rating?: number; text?: string }>
}

export interface FaqBlock {
  component?: string
  heading?: string
  subheading?: string
  items?: Array<{ question?: string; answer?: string }>
}

export interface ContactBlock {
  component?: string
  heading?: string
  subheading?: string
  email?: string
  phone?: string
  city?: string
  openingHours?: Array<{ day?: string; hours?: string }>
}

/** Contenu complet de la page, prêt à être rendu par les sections. */
export interface PlumberAtelierPageContent {
  theme: Theme
  businessName: string
  phone: string
  city: string
  hero: HeroBlock
  trustItems: Array<{ value: string; label: string }>
  services: ServicesBlock
  about: AboutBlock
  whyUs: WhyUsBlock
  gallery: GalleryBlock
  reviews: ReviewsBlock
  faq: FaqBlock
  contact: ContactBlock
}

/**
 * Copie éditoriale/boilerplate possédée par la template (design, pas donnée client).
 * Ces libellés reproduisent l'intention d'une page entièrement remplie, afin que le rendu
 * visuel soit identique même quand `SiteContent` ne fournit que les données variables
 * (nom, téléphone, services…).
 */
const atelierDefaults = {
  heroBadge: 'Dépannage 7j/7',
  heroSubtitle:
    'Dépannage, installation et rénovation — un artisan de confiance, pas un standard téléphonique.',
  heroCtaLabel: 'Appeler',

  trustItems: [
    { value: '7j/7', label: 'Dépannage & urgences' },
    { value: 'Sous 2h', label: 'Réponse au devis' },
    { value: '0 €', label: 'Devis sans engagement' },
    { value: '10 ans', label: 'Travaux garantis' },
  ] as Array<{ value: string; label: string }>,

  servicesHeading: 'Ce que nous réparons',
  servicesSubheading:
    "Du dépannage d'urgence à la rénovation complète, tout le savoir-faire d'un plombier au même endroit.",
  servicesItems: [
    {
      label: 'Dépannage & urgences',
      description:
        'Fuite, canalisation bouchée ou chauffe-eau en panne : intervention rapide 7j/7 pour limiter les dégâts.',
      icon: 'emergency',
    },
    {
      label: 'Recherche de fuite',
      description: 'Détection précise sans casse inutile, puis réparation durable de la fuite.',
      icon: 'leak',
    },
    {
      label: 'Installation sanitaire',
      description:
        'Salle de bain, cuisine, WC : pose complète et soignée, du réseau aux finitions.',
      icon: 'install',
    },
    {
      label: 'Chauffe-eau & chauffage',
      description:
        'Installation, remplacement et entretien de vos chauffe-eau et systèmes de chauffage.',
      icon: 'heater',
    },
    {
      label: 'Débouchage de canalisation',
      description: 'Éviers, WC, colonnes : débouchage rapide et remise en service propre.',
      icon: 'drain',
    },
    {
      label: 'Rénovation de salle de bain',
      description: "Modernisation complète de vos pièces d'eau, de la dépose à la mise en service.",
      icon: 'bath',
    },
  ] as Array<{ label: string; description: string; icon: string }>,

  whyUsHeading: 'Un artisan, pas un standard téléphonique',
  whyUsItems: [
    { label: 'Un interlocuteur unique, du devis à la fin du chantier' },
    { label: 'Devis gratuit et détaillé, sans engagement' },
    { label: 'Travaux couverts par la garantie décennale' },
    { label: 'Chantier laissé propre après chaque intervention' },
    { label: 'Des prix transparents, annoncés avant de commencer' },
  ] as Array<{ label: string }>,

  aboutHeading: "L'artisan derrière l'atelier",

  galleryHeading: 'Le travail, en images',
  gallerySubheading: 'Quelques chantiers récents — livrés propres, finis, garantis.',

  reviewsHeading: 'Le travail parle, les clients aussi',
  reviewsSubheading: 'Des retours de chantiers réels, sans tri ni retouche.',

  faqHeading: "Les questions qu'on nous pose",
  faqSubheading: "Et les réponses franches qu'on vous donne avant d'intervenir.",

  contactHeading: 'Un problème de plomberie ?',
  contactSubheading: 'Réponse sous 2h · Devis gratuit · Intervention rapide',
} as const

/**
 * Construit le contenu de page entièrement typé à partir d'un `SiteContent`.
 *
 * Les champs VARIABLES (nom, téléphone, ville, sous-titre, à-propos, images, galerie, avis,
 * FAQ, horaires, services, email) proviennent de `content` ; les champs BOILERPLATE (badge
 * hero, repères de confiance, garanties de l'artisan, titres de sections, services par
 * défaut) proviennent des défauts de la template. Les services sont repris de `content`
 * s'ils existent, sinon remplacés par les services éditoriaux par défaut afin que la
 * section reste complète. Les sections adossées à du contenu prospect (à-propos, galerie,
 * avis, FAQ, horaires) restent VIDES quand la clé est absente — la racine les masque.
 * @param content - Données variables du prospect.
 * @returns Le contenu typé prêt pour le rendu par les sections.
 */
export function buildPlumberAtelierContent(content: SiteContent): PlumberAtelierPageContent {
  const palette = content.palette ?? {}

  const businessName: string = content.businessName ?? ''
  const phone: string = content.phone ?? ''
  const city: string = content.city ?? ''

  const services: Array<{ label: string; description: string; icon?: string }> =
    Array.isArray(content.services) && content.services.length > 0
      ? content.services.map((service): { label: string; description: string; icon?: string } => ({
          label: service.title ?? '',
          description: service.description ?? '',
          icon: service.icon,
        }))
      : atelierDefaults.servicesItems

  const galleryItems: Array<{ url: string; alt: string }> = Array.isArray(content.gallery)
    ? content.gallery
        .filter((image): boolean => typeof image.url === 'string' && image.url.length > 0)
        .map((image): { url: string; alt: string } => ({
          url: image.url ?? '',
          alt: image.alt ?? '',
        }))
    : []

  const reviewItems: Array<{ author: string; rating: number; text: string }> = Array.isArray(
    content.reviews,
  )
    ? content.reviews
        .filter((review): boolean => typeof review.text === 'string' && review.text.length > 0)
        .map((review): { author: string; rating: number; text: string } => ({
          author: review.author ?? '',
          rating: typeof review.rating === 'number' ? review.rating : 0,
          text: review.text ?? '',
        }))
    : []

  const faqItems: Array<{ question: string; answer: string }> = Array.isArray(content.faq)
    ? content.faq
        .filter((item): boolean => typeof item.question === 'string' && item.question.length > 0)
        .map((item): { question: string; answer: string } => ({
          question: item.question ?? '',
          answer: item.answer ?? '',
        }))
    : []

  const openingHours: Array<{ day: string; hours: string }> = Array.isArray(content.openingHours)
    ? content.openingHours
        .filter(
          (slot): boolean =>
            (typeof slot.day === 'string' && slot.day.length > 0) ||
            (typeof slot.hours === 'string' && slot.hours.length > 0),
        )
        .map((slot): { day: string; hours: string } => ({
          day: slot.day ?? '',
          hours: slot.hours ?? '',
        }))
    : []

  return {
    theme: {
      primary:
        typeof palette.primary === 'string' && palette.primary.length > 0
          ? palette.primary
          : defaultTheme.primary,
      secondary:
        typeof palette.secondary === 'string' && palette.secondary.length > 0
          ? palette.secondary
          : defaultTheme.secondary,
      accent:
        typeof palette.accent === 'string' && palette.accent.length > 0
          ? palette.accent
          : defaultTheme.accent,
    },
    businessName,
    phone,
    city,
    hero: {
      badge: atelierDefaults.heroBadge,
      title: businessName,
      subtitle:
        content.subtitle && content.subtitle.length > 0
          ? content.subtitle
          : atelierDefaults.heroSubtitle,
      phone,
      cta_label: atelierDefaults.heroCtaLabel,
      image: content.heroImage ?? '',
    },
    trustItems: atelierDefaults.trustItems,
    services: {
      heading: atelierDefaults.servicesHeading,
      subheading: atelierDefaults.servicesSubheading,
      items: services,
    },
    about: {
      heading: atelierDefaults.aboutHeading,
      text: content.about ?? '',
      image: content.aboutImage ?? '',
    },
    whyUs: {
      heading: atelierDefaults.whyUsHeading,
      items: atelierDefaults.whyUsItems,
    },
    gallery: {
      heading: atelierDefaults.galleryHeading,
      subheading: atelierDefaults.gallerySubheading,
      items: galleryItems,
    },
    reviews: {
      heading: atelierDefaults.reviewsHeading,
      subheading: atelierDefaults.reviewsSubheading,
      items: reviewItems,
    },
    faq: {
      heading: atelierDefaults.faqHeading,
      subheading: atelierDefaults.faqSubheading,
      items: faqItems,
    },
    contact: {
      heading: atelierDefaults.contactHeading,
      subheading: atelierDefaults.contactSubheading,
      email: content.email ?? '',
      phone,
      city,
      openingHours,
    },
  }
}
