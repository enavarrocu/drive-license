<script setup lang="ts">
import { questionById, questions } from '../data/questions'
import { themes } from '../data/themes'
import { course } from '../data/course'
import { glossary } from '../data/glossary'
import { signByCode, signs } from '../data/signs'
import { renderScene } from '../lib/scene'
import { EXAM } from '../lib/exam'

/**
 * Portada pública (sin sesión) : solo presentación. No enlaza al registro: la app aún no está
 * abierta; los usuarios existentes entran por «Connexion».
 */
definePageMeta({ layout: 'default' })
useHead({ title: 'Permis Trainer — théorie B en français, expliquée en espagnol' })
const { lang } = useStore()

// Una situación de examen real del banco, dibujada por código, como muestra.
const demo = questionById['z-prio-05'] ?? questionById['sc-01']!
const demoScene = demo.scene ? renderScene(demo.scene) : ''
const demoSigns = ['A23', 'B1', 'C43', 'F12a'].map((c) => signByCode[c]).filter((s): s is NonNullable<typeof s> => !!s)

const stats = [
  { n: questions.length, fr: 'questions originales', es: 'preguntas originales' },
  { n: themes.length, fr: 'thèmes', es: 'temas' },
  { n: course.length, fr: 'chapitres de cours', es: 'capítulos de curso' },
  { n: signs.length, fr: 'signaux officiels', es: 'señales oficiales' },
  { n: glossary.length, fr: 'termes du glossaire', es: 'términos del glosario' },
]

const features = [
  {
    icon: '📖',
    fr: ['Le cours complet', 'Tout le programme de l\'examen théorique B, expliqué en espagnol avec les termes français de l\'examen.'],
    es: ['El curso completo', 'Todo el temario del examen teórico B, explicado en español con los términos franceses del examen.'],
  },
  {
    icon: '🇫🇷',
    fr: ['Questions en français, traduites', 'Comme à l\'examen, en français ; la traduction espagnole et le glossaire sont à un clic.'],
    es: ['Preguntas en francés, traducidas', 'Como en el examen, en francés; la traducción al español y el glosario, a un clic.'],
  },
  {
    icon: '🚦',
    fr: ['Carrefours dessinés', 'Des situations de priorité dessinées, avec les vrais signaux belges, pour s\'entraîner à « qui passe en premier ».'],
    es: ['Cruces dibujados', 'Situaciones de prioridad dibujadas, con las señales belgas reales, para practicar «quién pasa primero».'],
  },
  {
    icon: '⏱️',
    fr: ['Simulation avec le vrai barème', `${EXAM.questions} questions, réussite à ${EXAM.passMark}/${EXAM.questions}, faute grave −${EXAM.gravePenalty}, lecture à voix haute et 15 secondes pour répondre.`],
    es: ['Simulacro con el baremo real', `${EXAM.questions} preguntas, aprobado con ${EXAM.passMark}/${EXAM.questions}, falta grave −${EXAM.gravePenalty}, lectura en voz alta y 15 segundos para responder.`],
  },
  {
    icon: '⚠️',
    fr: ['Les fautes graves en priorité', 'Un mode dédié et la « mort subite » : vingt questions de faute grave, la première erreur arrête tout.'],
    es: ['Las faltas graves, primero', 'Un modo dedicado y la «muerte súbita»: veinte preguntas de falta grave, el primer fallo lo termina todo.'],
  },
  {
    icon: '🧠',
    fr: ['Révision intelligente', 'Les questions ratées reviennent au bon moment (révision espacée), et l\'on sait quand on est prêt.'],
    es: ['Repaso inteligente', 'Las preguntas falladas vuelven en el momento justo (repaso espaciado) y sabes cuándo estás listo.'],
  },
  {
    icon: '📱',
    fr: ['Sur le téléphone, même hors ligne', 'S\'installe comme une application ; la progression se synchronise au retour du réseau.'],
    es: ['En el móvil, incluso sin conexión', 'Se instala como una aplicación; el progreso se sincroniza cuando vuelve la red.'],
  },
]
</script>

<template>
  <div class="landing">
    <section class="card landing-hero">
      <p class="pill">{{ lang === 'fr' ? 'Examen théorique B · Bruxelles' : 'Examen teórico B · Bruselas' }}</p>
      <h1>
        {{ lang === 'fr' ? 'Réussir la théorie du permis B en français, avec tout expliqué en espagnol.' : 'Aprueba el teórico del permiso B en francés, con todo explicado en español.' }}
      </h1>
      <p class="muted">
        {{ lang === 'fr'
          ? 'Permis Trainer remplace le livre pour les hispanophones qui passent l\'examen à Bruxelles en français : cours, questions, signaux, glossaire et simulation dans une seule application.'
          : 'Permis Trainer sustituye al libro para los hispanohablantes que hacen el examen en Bruselas en francés: curso, preguntas, señales, glosario y simulacro en una sola aplicación.' }}
      </p>
      <div class="landing-stats">
        <div v-for="s in stats" :key="s.fr"><b>{{ s.n }}</b><span class="small muted">{{ s[lang] }}</span></div>
      </div>
    </section>

    <section class="landing-demo card">
      <div v-if="demoScene" class="scene-wrap" v-html="demoScene"></div>
      <div>
        <h2>{{ lang === 'fr' ? 'Comme à l\'examen' : 'Como en el examen' }}</h2>
        <p class="q">{{ demo.fr.q }}</p>
        <p class="q alt">{{ demo.es.q }}</p>
        <div class="landing-signs">
          <SignImage v-for="s in demoSigns" :key="s.code" :sign="s" />
        </div>
        <p class="small muted">{{ lang === 'fr' ? 'Signaux : images officielles belges.' : 'Señales: imágenes oficiales belgas.' }}</p>
      </div>
    </section>

    <section class="landing-features">
      <div v-for="f in features" :key="f.icon" class="card">
        <div class="landing-icon" aria-hidden="true">{{ f.icon }}</div>
        <h3>{{ f[lang][0] }}</h3>
        <p class="small muted">{{ f[lang][1] }}</p>
      </div>
    </section>

    <section class="card landing-access">
      <p>
        {{ lang === 'fr' ? 'L\'application n\'est pas encore ouverte au public : l\'accès se fait pour l\'instant sur invitation.' : 'La aplicación todavía no está abierta al público: por ahora el acceso es por invitación.' }}
      </p>
      <NuxtLink to="/login" class="btn">{{ lang === 'fr' ? 'Déjà un compte ? Se connecter' : '¿Ya tienes cuenta? Entrar' }}</NuxtLink>
    </section>
  </div>
</template>
