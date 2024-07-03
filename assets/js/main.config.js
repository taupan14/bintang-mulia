import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(CustomEase,ScrollTrigger)



let mediaScreen = gsap.matchMedia()



CustomEase.create("custom", "0.76, 0, 0.24, 1")



const links = document.querySelectorAll('a:not([href="#"], [href="#!"], [href="javascript:;"], [target="_blank"], [href="javascript:void(0)"], [data-toggle])')
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        document.body.style.cursor = 'wait'
        document.body.style.overflow = 'hidden'
        
        const preloaderDiv = document.createElement('div')
        preloaderDiv.id = 'preloader'
        document.querySelector('#app').appendChild(preloaderDiv)
        
        gsap.fromTo(preloaderDiv, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.7,
            ease: 'custom'
        });

        setTimeout(() => {
            window.location.href = link.href
        }, 700)
    })
})
window.addEventListener('pageshow', (e) => {
    const historyTraversal = e.persisted || (typeof window.performance !== "undefined" && window.performance.navigation.type === 2)
    if (historyTraversal) {
        window.location.reload()
    }
})



function setupHeader() {
    document.querySelectorAll('#section-header').forEach((sectionHeader) => {
        const spaceHeader = sectionHeader.clientHeight
        document.documentElement.style.setProperty('--space-header', `${spaceHeader}px`)
    })
}



function setupBtnHoverEffect() {
    const navHover = document.querySelectorAll('[data-hover-effect]')
    navHover.forEach((navEl) => {
        const circleIcons = navEl.querySelectorAll('.circle-icon')
        const arrowIcons = navEl.querySelectorAll('.arrow-icon')

        circleIcons.forEach(function(circleIcon) {
            var wrapperDiv = document.createElement('div')
            wrapperDiv.classList.add('btn-circle')
            wrapperDiv.appendChild(circleIcon.cloneNode(true))
            circleIcon.parentElement.replaceChild(wrapperDiv, circleIcon)
        })

        arrowIcons.forEach(arrowEl => {
            const icon = arrowEl.querySelector('i')
            if (icon) {
                const btnDiv = document.createElement('div')
                btnDiv.className = 'inline-flex overflow-clip'
                btnDiv.appendChild(icon.cloneNode(true))
                arrowEl.replaceChild(btnDiv, icon)
            }
        })
        
        navEl.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                const btnDiv = document.createElement('div')
                const btnSpan = document.createElement('span')
                btnDiv.className = 'inline-flex overflow-clip'
                btnSpan.appendChild(node.cloneNode(true))
                btnDiv.appendChild(btnSpan)
                navEl.replaceChild(btnDiv, node)

            } else if (node.tagName === 'svg') {
                const btnDiv = document.createElement('div')
                btnDiv.className = 'inline-flex overflow-clip'
                btnDiv.appendChild(node.cloneNode(true))
                navEl.insertBefore(btnDiv, node.nextSibling)
                node.parentNode.removeChild(node)

            } else if (node.tagName === 'I') {
                const btnDiv = document.createElement('div')
                btnDiv.className = 'inline-flex overflow-clip'
                btnDiv.appendChild(node.cloneNode(true))
                navEl.insertBefore(btnDiv, node.nextSibling)
                node.parentNode.removeChild(node)
            }
        })
    })
}



function setupComputedSVG() {
    document.querySelectorAll('.icon-stroke > *').forEach((iconStroke) => {
        iconStroke.setAttribute('vector-effect','non-scaling-stroke')
        iconStroke.setAttribute('stroke-linecap','round')
        iconStroke.setAttribute('stroke-linejoin','round')
    })

    document.querySelectorAll('.icon').forEach((iconSize) => {
        const computedStyle = window.getComputedStyle(iconSize)
        const getSize = computedStyle.getPropertyValue('font-size')
        
        iconSize.style.width = getSize
        iconSize.style.height = getSize
    })
}



// const tlHeroImg = gsap.timeline({
//     scrollTrigger: {
//         trigger: '#section-hero',
//         start: 'top top',
//         scrub: true
//     }
// })

// tlHeroImg.to('#hero-image', {
//     marginLeft: '2rem',
//     marginRight: '2rem'
// })



function setupImageFollow() {
    mediaScreen.add("(min-width: 1024px)", () => {
        const imageFollowElements = document.querySelectorAll('[data-hover-image]');
        imageFollowElements.forEach((hoverImage) => {
            const image = hoverImage.querySelector('[data-image]');
            gsap.set(image, { scale: 0.75, opacity: 1 });
    
            document.addEventListener('mousemove', (e) => {
                gsap.to(image, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 0.3
                });
            });
    
            hoverImage.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'custom'
                });
                image.classList.remove('is-show');
            });
    
            hoverImage.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'custom'
                });
                image.classList.add('is-show');
            });
        });
    })
}



window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.documentElement.classList.add('is-load')
        const isLoad = document.documentElement.classList.contains('is-load')
        
        if(isLoad) {
            gsap.to('#preloader', {
                opacity: 0,
                duration: 0.7,
                ease: 'custom',
                onComplete: () => {
                    document.querySelector('#preloader').remove()
                }
            })
        }

        setupBtnHoverEffect()
        setupComputedSVG()
        setupHeader()
        setupImageFollow()
        
    }, 800);
})