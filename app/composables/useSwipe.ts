import type { Ref } from 'vue'

/**
 * Glissement horizontal au doigt sur un élément (étude sur mobile). Seul un geste nettement
 * horizontal compte : on ne gêne ni le défilement vertical ni les champs de saisie.
 * `offset` suit le doigt pour un léger retour visuel.
 */
export function useSwipe(el: Ref<HTMLElement | null>, handlers: { onLeft?: () => void; onRight?: () => void }) {
  /** Distance minimale (px) pour déclencher. */
  const THRESHOLD = 70
  const offset = ref(0)
  let startX = 0
  let startY = 0
  let tracking = false
  let horizontal: boolean | null = null

  function onStart(e: TouchEvent) {
    const t = e.target as HTMLElement | null
    if (e.touches.length !== 1 || t?.closest('textarea, input, select, .gloss-tip, .report-form')) return
    startX = e.touches[0]!.clientX
    startY = e.touches[0]!.clientY
    tracking = true
    horizontal = null
  }
  function onMove(e: TouchEvent) {
    if (!tracking) return
    const dx = e.touches[0]!.clientX - startX
    const dy = e.touches[0]!.clientY - startY
    // On décide une fois pour toutes au premier mouvement net : horizontal ou vertical (défilement).
    if (horizontal === null && Math.abs(dx) + Math.abs(dy) > 10) horizontal = Math.abs(dx) > Math.abs(dy) * 1.5
    if (horizontal) offset.value = dx * 0.4
  }
  function onEnd(e: TouchEvent) {
    if (!tracking) return
    tracking = false
    const dx = (e.changedTouches[0]?.clientX ?? startX) - startX
    offset.value = 0
    if (!horizontal || Math.abs(dx) < THRESHOLD) return
    if (dx < 0) handlers.onLeft?.()
    else handlers.onRight?.()
  }
  function onCancel() {
    tracking = false
    offset.value = 0
  }

  watch(
    el,
    (node, old) => {
      old?.removeEventListener('touchstart', onStart)
      old?.removeEventListener('touchmove', onMove)
      old?.removeEventListener('touchend', onEnd)
      old?.removeEventListener('touchcancel', onCancel)
      node?.addEventListener('touchstart', onStart, { passive: true })
      node?.addEventListener('touchmove', onMove, { passive: true })
      node?.addEventListener('touchend', onEnd)
      node?.addEventListener('touchcancel', onCancel)
    },
    { immediate: true },
  )
  onBeforeUnmount(() => {
    el.value?.removeEventListener('touchstart', onStart)
    el.value?.removeEventListener('touchmove', onMove)
    el.value?.removeEventListener('touchend', onEnd)
    el.value?.removeEventListener('touchcancel', onCancel)
  })
  return { offset }
}
