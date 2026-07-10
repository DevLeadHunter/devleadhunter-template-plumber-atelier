<template>
  <section class="about">
    <div
      class="about-grid"
      :class="{ 'about-grid--solo': !about.image }">
      <div class="about-body">
        <p class="section-kicker">À propos</p>
        <h2
          class="section-title reveal"
          data-reveal>
          {{ about.heading || "L'artisan derrière l'atelier" }}
        </h2>
        <p
          class="about-text reveal"
          data-reveal
          style="--d: 90ms">
          {{ about.text }}
        </p>
      </div>
      <figure
        v-if="about.image"
        class="about-figure reveal"
        data-reveal
        style="--d: 180ms">
        <div class="figure-corner figure-corner-tl"></div>
        <div class="figure-corner figure-corner-br"></div>
        <img
          class="about-img"
          :src="about.image"
          :alt="aboutImageAlt"
          loading="lazy" />
        <figcaption class="about-cap">
          {{ businessName }}<template v-if="city"> · {{ city }}</template>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { AboutBlock } from '~/types/plumber-atelier'

const props = defineProps<{
  about: AboutBlock
  businessName: string
  city: string
}>()

const aboutImageAlt: ComputedRef<string> = computed((): string =>
  props.businessName ? `L'atelier de ${props.businessName}` : "L'atelier de l'artisan",
)
</script>

<style scoped>
.about {
  padding: clamp(3.5rem, 7vw, 6rem) 0 clamp(2.5rem, 5vw, 4rem);
}
.about-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.about-grid--solo {
  grid-template-columns: 1fr;
}
.about-text {
  margin-top: 1.6rem;
  color: var(--ink-soft);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 58ch;
  white-space: pre-line;
}
.about-figure {
  position: relative;
  border: 1px solid var(--hair);
  background: var(--paper-2);
  padding: 0.5rem;
}
.figure-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--brass);
  z-index: 1;
}
.figure-corner-tl {
  top: -1px;
  left: -1px;
  border-right: 0;
  border-bottom: 0;
}
.figure-corner-br {
  bottom: -1px;
  right: -1px;
  border-left: 0;
  border-top: 0;
}
.about-img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}
.about-cap {
  padding: 0.8rem 0.5rem 0.35rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-soft);
}

/* ════════════ Responsive ════════════ */
@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
