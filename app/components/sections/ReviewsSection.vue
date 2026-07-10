<template>
  <section class="reviews">
    <div class="section-head">
      <p class="section-kicker">Avis</p>
      <h2
        class="section-title reveal"
        data-reveal>
        {{ reviews.heading || 'Le travail parle, les clients aussi' }}
      </h2>
      <p
        v-if="reviews.subheading"
        class="section-lede reveal"
        data-reveal
        style="--d: 90ms">
        {{ reviews.subheading }}
      </p>
    </div>

    <div class="rev-grid">
      <figure
        v-for="(review, i) in reviewItems"
        :key="i"
        class="rev-entry reveal"
        data-reveal
        :style="{ '--d': `${i * 70}ms` }">
        <span
          v-if="ratingOf(review) > 0"
          class="rev-stars"
          role="img"
          :aria-label="`Note : ${ratingOf(review)} sur 5`">
          <svg
            v-for="starIndex in 5"
            :key="starIndex"
            class="rev-star"
            :class="{ 'is-filled': starIndex <= ratingOf(review) }"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path
              d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3Z" />
          </svg>
        </span>
        <blockquote class="rev-text">« {{ review.text }} »</blockquote>
        <figcaption
          v-if="review.author"
          class="rev-author">
          — {{ review.author }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ReviewsBlock } from '~/types/plumber-atelier'

const props = defineProps<{
  reviews: ReviewsBlock
}>()

const reviewItems: ComputedRef<Array<{ author?: string; rating?: number; text?: string }>> =
  computed((): Array<{ author?: string; rating?: number; text?: string }> =>
    Array.isArray(props.reviews.items) ? props.reviews.items : [],
  )

/**
 * Note d'un avis bornée à l'échelle 0–5 (les étoiles ne sont rendues qu'au-delà de 0).
 * @param review - L'avis dont on lit la note.
 * @param review.rating - La note brute fournie par le prospect (optionnelle).
 * @returns La note entière entre 0 et 5.
 */
function ratingOf(review: { rating?: number }): number {
  return Math.min(5, Math.max(0, Math.round(review.rating ?? 0)))
}
</script>

<style scoped>
.reviews {
  padding: clamp(3rem, 6vw, 5.5rem) 0;
  background: var(--paper-2);
  border-top: 1px solid var(--hair);
  border-bottom: 1px solid var(--hair);
}
.rev-grid {
  max-width: 1200px;
  margin: clamp(2rem, 4vw, 3.2rem) auto 0;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
  gap: 0 3rem;
}
.rev-entry {
  padding: 1.7rem 0;
  border-top: 1px solid var(--hair);
}
.rev-stars {
  display: inline-flex;
  gap: 0.25rem;
  margin-bottom: 0.9rem;
}
.rev-star {
  width: 1rem;
  height: 1rem;
  color: var(--brass);
}
.rev-star.is-filled {
  fill: currentColor;
}
.rev-text {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.15rem;
  line-height: 1.45;
  letter-spacing: -0.01em;
  max-width: 46ch;
}
.rev-author {
  margin-top: 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-soft);
}
</style>
