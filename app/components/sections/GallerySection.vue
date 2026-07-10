<template>
  <section class="gallery">
    <div class="section-head">
      <p class="section-kicker">Réalisations</p>
      <h2
        class="section-title reveal"
        data-reveal>
        {{ gallery.heading || 'Le travail, en images' }}
      </h2>
      <p
        v-if="gallery.subheading"
        class="section-lede reveal"
        data-reveal
        style="--d: 90ms">
        {{ gallery.subheading }}
      </p>
    </div>

    <div class="gal-grid">
      <figure
        v-for="(image, i) in galleryItems"
        :key="i"
        class="gal-item reveal"
        data-reveal
        :style="{ '--d': `${i * 70}ms` }">
        <div class="gal-frame">
          <img
            class="gal-img"
            :src="image.url"
            :alt="image.alt || `Réalisation ${i + 1}`"
            loading="lazy" />
        </div>
        <figcaption class="gal-cap">
          <span class="gal-num">Pl. {{ String(i + 1).padStart(2, '0') }}</span>
          <span
            v-if="image.alt"
            class="gal-alt"
            >{{ image.alt }}</span
          >
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { GalleryBlock } from '~/types/plumber-atelier'

const props = defineProps<{
  gallery: GalleryBlock
}>()

const galleryItems: ComputedRef<Array<{ url?: string; alt?: string }>> = computed(
  (): Array<{ url?: string; alt?: string }> =>
    Array.isArray(props.gallery.items) ? props.gallery.items : [],
)
</script>

<style scoped>
.gallery {
  padding: clamp(3.5rem, 7vw, 6rem) 0;
}
.gal-grid {
  max-width: 1200px;
  margin: clamp(2rem, 4vw, 3.2rem) auto 0;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}
.gal-frame {
  border: 1px solid var(--hair);
  background: var(--paper-2);
  padding: 0.5rem;
  overflow: hidden;
}
.gal-img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.gal-item:hover .gal-img {
  transform: scale(1.03);
}
.gal-cap {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  padding: 0.7rem 0.1rem 0;
}
.gal-num {
  flex: none;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--brass);
  font-variant-numeric: tabular-nums;
}
.gal-alt {
  font-size: 0.82rem;
  color: var(--ink-soft);
}
</style>
