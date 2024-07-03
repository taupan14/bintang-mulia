import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
    lerp: 0.125,
    duration: 1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    // wheelMultiplier: 1,
    // touchMultiplier: 1,
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)