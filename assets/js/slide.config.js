import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

import '@splidejs/splide/dist/css/splide.min.css'

document.querySelectorAll('[data-slide-facilities]').forEach((slideEl) => {
    const slideFacilites = new Splide(slideEl, {
        type: 'loop',
        autoWidth: true,
        gap: 16*3,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                perPage: 1
            }
        },
        autoScroll: {
            pauseOnFocus: false,
        },
    })
    slideFacilites.mount({AutoScroll})
})

document.querySelectorAll('[data-slide-footer]').forEach((slideEl) => {
    const slideFooter = new Splide(slideEl, {
        type: 'loop',
        autoWidth: true,
        gap: 16*2,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                perPage: 1
            }
        },
        autoScroll: {
            pauseOnFocus: false,
            pauseOnHover: false
        },
    })
    slideFooter.mount({AutoScroll})
})

document.querySelectorAll('[data-slide-about]').forEach((slideEl) => {
    const slideAbout = new Splide(slideEl, {
        type: 'loop',
        perPage: 5,
        gap: 16*2,
        speed: 700,
        easing: 'cubic-bezier(.135,.9,.15,1)',
        arrows: false,
        pagination: false,
        autoScroll: {
            pauseOnFocus: false,
            pauseOnHover: false
        },
    })
    slideAbout.mount({AutoScroll})
})