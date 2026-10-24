<script setup lang="ts">
import type { SignWithSvg } from '../data/signs'

/** Imagen de una señal: la oficial (PNG/WebP del SPW) si existe, si no el dibujo SVG propio. */
defineProps<{ sign: SignWithSvg }>()
</script>

<template>
  <img v-if="sign.img" :src="sign.img" :alt="sign.code" class="sign-img" loading="lazy" decoding="async" />
  <span v-else class="sign-img" v-html="sign.svg"></span>
</template>
