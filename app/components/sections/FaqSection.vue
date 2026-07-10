<template>
  <section class="faq">
    <div class="section-head">
      <p class="section-kicker">FAQ</p>
      <h2
        class="section-title reveal"
        data-reveal>
        {{ faq.heading || "Les questions qu'on nous pose" }}
      </h2>
      <p
        v-if="faq.subheading"
        class="section-lede reveal"
        data-reveal
        style="--d: 90ms">
        {{ faq.subheading }}
      </p>
    </div>

    <div class="faq-list">
      <details
        v-for="(item, i) in faqItems"
        :key="i"
        class="faq-item reveal"
        data-reveal
        :style="{ '--d': `${i * 60}ms` }">
        <summary class="faq-q">
          <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="faq-question">{{ item.question }}</span>
          <svg
            class="faq-plus"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </summary>
        <p
          v-if="item.answer"
          class="faq-a">
          {{ item.answer }}
        </p>
      </details>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { FaqBlock } from '~/types/plumber-atelier'

const props = defineProps<{
  faq: FaqBlock
}>()

const faqItems: ComputedRef<Array<{ question?: string; answer?: string }>> = computed(
  (): Array<{ question?: string; answer?: string }> =>
    Array.isArray(props.faq.items) ? props.faq.items : [],
)
</script>

<style scoped>
.faq {
  padding: clamp(3.5rem, 7vw, 6rem) 0;
}
.faq-list {
  max-width: 1200px;
  margin: clamp(2rem, 4vw, 3.2rem) auto 0;
  padding: 0 1.5rem;
  border-top: 1px solid var(--hair);
}
.faq-item {
  border-bottom: 1px solid var(--hair);
}
.faq-q {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 1rem;
  padding: 1.25rem 0.5rem;
  cursor: pointer;
  list-style: none;
  transition: background 0.22s ease;
}
.faq-q::-webkit-details-marker {
  display: none;
}
.faq-q:hover {
  background: var(--paper-2);
}
.faq-num {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--brass);
  font-variant-numeric: tabular-nums;
}
.faq-question {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  letter-spacing: -0.01em;
}
.faq-plus {
  align-self: center;
  width: 1.15rem;
  height: 1.15rem;
  color: var(--ink-soft);
  transition:
    transform 0.25s ease,
    color 0.25s ease;
}
.faq-item[open] .faq-plus {
  transform: rotate(45deg);
  color: var(--brass);
}
.faq-a {
  margin: 0;
  padding: 0 2.5rem 1.5rem 3.7rem;
  color: var(--ink-soft);
  max-width: 72ch;
}

/* ════════════ Responsive ════════════ */
@media (max-width: 860px) {
  .faq-q {
    grid-template-columns: 1.8rem minmax(0, 1fr) auto;
    gap: 0.8rem;
  }
  .faq-a {
    padding: 0 1rem 1.4rem 3.1rem;
  }
}
</style>
