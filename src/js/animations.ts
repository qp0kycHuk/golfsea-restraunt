import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const gsapAnimation: Record<string, any> = {
  fadeInLeft: {
    from: { x: '-75', opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fadeInRight: {
    from: { x: '75', opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fadeInUp: {
    from: { y: '75', opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fadeInDown: {
    from: { y: '-75', opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { scale: 1.5 },
    to: { scale: 1 },
  },
}

function init() {
  // animations init
  gsap.registerPlugin(ScrollTrigger)

  gsap.to('.top-image-img', {
    y: 100,
    scrollTrigger: {
      trigger: '.top-image-wrapper',
      scrub: true,
      start: 'top top',
      end: 'bottom top',
    },
  })

  const scrollElements = document.querySelectorAll('[data-animation]')

  scrollElements.forEach((element) => {
    const key = element.getAttribute('data-animation')
    const duration = element.getAttribute('data-duration') || 1
    const end = element.getAttribute('data-end') || 'top center'
    const start = element.getAttribute('data-start') || 'top 85%'
    const delay = element.getAttribute('data-delay') || 0.1

    const animation = gsapAnimation[key || '']

    if (!animation) {
      return
    }

    const instance = gsap.fromTo(element, animation.from, {
      ...animation.to,
      duration,
      delay,
      ease: 'elastic.out(1,1)',
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        // scrub: true,
        // markers: true,
        // id: "scrub"
      },
    })
  })
}

export default { init }
