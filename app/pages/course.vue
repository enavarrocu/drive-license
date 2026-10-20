<script setup lang="ts">
import { course } from '../data/course'
import { renderMd } from '../lib/md'
import { linkifySignsHtml } from '../lib/signRefs'
import { signs } from '../data/signs'

const { lang, courseRead, markChapter } = useStore()
const { onClickDelegated } = useSignPopup()
const route = useRoute()
const router = useRouter()

const current = computed(() => (typeof route.query.c === 'string' ? route.query.c : course[0]!.id))
const chapter = computed(() => course.find((c) => c.id === current.value) ?? course[0]!)
const idx = computed(() => course.findIndex((c) => c.id === chapter.value.id))
const prev = computed(() => course[idx.value - 1])
const next = computed(() => course[idx.value + 1])

function go(id: string) {
  router.push({ query: { c: id } })
  if (import.meta.client) window.scrollTo({ top: 0 })
}
async function markRead() {
  await markChapter(chapter.value.id, true)
  if (next.value) go(next.value.id)
}
function signsFor(codes?: string[]) {
  if (!codes?.length) return []
  return signs.filter((s) => codes.includes(s.code))
}
const doneCount = computed(() => course.filter((c) => courseRead.value[c.id]).length)
</script>

<template>
  <div class="course">
    <div class="card">
      <div class="row">
        <h2 class="grow" style="margin: 0">{{ lang === 'fr' ? 'Cours complet' : 'Curso completo' }}</h2>
        <span class="pill ok">{{ doneCount }} / {{ course.length }}</span>
      </div>
      <p class="muted small" style="margin: 6px 0 10px">
        {{ lang === 'fr'
          ? 'Toute la matière de l\'examen, expliquée en espagnol avec les termes français de l\'examen.'
          : 'Todo el temario del examen, explicado en español con los términos franceses que verás en las preguntas.' }}
      </p>
      <ol class="toc">
        <li v-for="c in course" :key="c.id">
          <button type="button" :class="{ active: c.id === chapter.id, done: courseRead[c.id] }" @click="go(c.id)">
            <span class="num">{{ c.number }}</span>
            <span class="t">{{ c.title[lang] }}<span class="muted small"> — {{ lang === 'fr' ? c.title.es : c.title.fr }}</span></span>
            <span v-if="courseRead[c.id]" class="chk">✓</span>
          </button>
        </li>
      </ol>
    </div>

    <article class="card chapter">
      <p class="muted small" style="margin: 0">{{ lang === 'fr' ? 'Chapitre' : 'Capítulo' }} {{ chapter.number }}</p>
      <h2 style="font-size: 1.5rem; margin: 2px 0 4px">{{ chapter.title.es }}</h2>
      <p class="muted" style="margin-top: 0"><i>{{ chapter.title.fr }}</i></p>
      <p class="intro">{{ chapter.intro }}</p>

      <section v-for="s in chapter.sections" :key="s.id" class="section">
        <h3>{{ s.title.es }} <span class="muted small">— {{ s.title.fr }}</span></h3>
        <div class="md" @click="onClickDelegated" v-html="linkifySignsHtml(renderMd(s.body))"></div>
        <div v-if="signsFor(s.signs).length" class="signs-inline">
          <div v-for="sg in signsFor(s.signs)" :key="sg.code" class="sign-mini">
            <div v-html="sg.svg"></div>
            <div class="code">{{ sg.code }}</div>
          </div>
        </div>
      </section>

      <div class="row" style="margin-top: 18px">
        <button class="btn" type="button" :disabled="!prev" @click="prev && go(prev.id)">← {{ prev ? prev.title[lang] : '' }}</button>
        <span class="grow"></span>
        <NuxtLink :to="{ path: '/study', query: { theme: chapter.theme } }" class="btn ghost">{{ lang === 'fr' ? 'Pratiquer ce thème' : 'Practicar este tema' }}</NuxtLink>
        <button class="btn primary" type="button" @click="markRead">{{ next ? (lang === 'fr' ? 'Lu, chapitre suivant →' : 'Leído, siguiente →') : (lang === 'fr' ? 'Terminer' : 'Terminar') }}</button>
      </div>
    </article>
  </div>
</template>
