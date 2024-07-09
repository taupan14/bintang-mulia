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

        const showAnim = gsap.from('#section-header', { 
            yPercent: -100,
            paused: true,
            duration: 0.7,
            ease: 'custom',
        }).progress(1)
          
        ScrollTrigger.create({
            start: `top -${spaceHeader}`,
            end: 'max',
            onUpdate: (self) => {
                if (self.direction === -1) {
                    showAnim.play(); // Play animation if scrolling down
                    sectionHeader.style.pointerEvents = 'auto'; // Enable pointer events
                } else {
                    showAnim.reverse(); // Reverse animation if scrolling up
                    sectionHeader.style.pointerEvents = 'none'; // Disable pointer events
                }
            }
        })

        let isAnyMenuHovered = false
        document.querySelectorAll('.nav-header-menu').forEach((navHeaderMenu) => {
            const navHeaderWrapper = navHeaderMenu.querySelector('.nav-header-wrapper')
            const navSubMenu = navHeaderMenu.querySelector('.nav-header-submenu')
            const navMenuContent = navHeaderMenu.querySelector('.nav-menu-content')
            const backdrop = document.querySelector('#backdrop')

            gsap.set(backdrop, {
                opacity: 0
            })

            if (navSubMenu) {
                navHeaderWrapper.style.zIndex = '-1'
                navHeaderWrapper.style.pointerEvents = 'none'

                gsap.set(navSubMenu, {
                    clipPath: 'rect(0% 100% 0% 0%)',
                    display: 'none'
                })
                gsap.set(navMenuContent, {
                    opacity: 0,
                    yPercent: 25
                })

                navHeaderMenu.addEventListener('mouseenter', () => {
                    isAnyMenuHovered = true
                    navHeaderWrapper.style.zIndex = 'auto'
                    navHeaderWrapper.style.pointerEvents = 'auto'

                    document.documentElement.classList.add('is-hover-menu')

                    gsap.to(navSubMenu, {
                        clipPath: 'rect(0% 100% 100% 0%)',
                        display: 'block',
                        duration: 0.7,
                        ease: 'custom',
                    })
                    gsap.to(navMenuContent, {
                        opacity: 1,
                        yPercent: 0,
                        duration: 0.7,
                        ease: 'custom'
                    })

                    gsap.to(backdrop, {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'custom'
                    })
                })

                navHeaderMenu.addEventListener('mouseleave', () => {
                    isAnyMenuHovered = false
                    navHeaderWrapper.style.zIndex = '-1'
                    navHeaderWrapper.style.pointerEvents = 'none'

                    gsap.to(navSubMenu, {
                        clipPath: 'rect(0% 100% 0% 0%)',
                        duration: 0.7,
                        ease: 'custom',
                        onComplete: () => {
                            navSubMenu.style.display = 'none'
                            
                        },
                        onUpdate: () => {
                            if (!isAnyMenuHovered) {
                                setTimeout(() => {
                                    document.documentElement.classList.remove('is-hover-menu')
                                }, 350)
                            }
                        }
                    })
                    gsap.to(navMenuContent, {
                        opacity: 0,
                        yPercent: 25,
                        duration: 0.7,
                        ease: 'custom'
                    })

                    gsap.to(backdrop, {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'custom'
                    })
                })
            }
        })
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



function handleInput(event) {
    const inputElement = event.target;
    if (inputElement.value.length > 0) {
        inputElement.parentNode.classList.add('is-focus')
    } else {
        inputElement.parentNode.classList.remove('is-focus')
    }
}

function setupInput() {
    document.querySelectorAll('.js-textarea').forEach((textareaEl) => {
        textareaEl.addEventListener('input', () => {
            textareaEl.style.height = 'auto'
            textareaEl.style.height = textareaEl.scrollHeight + 'px'
        })
    })

    document.querySelectorAll('.c-input').forEach((inputElement) => {
        if (inputElement.value.length > 0) {
            inputElement.parentNode.classList.add('is-focus')
        } else {
            inputElement.parentNode.classList.remove('is-focus')
        }
    
        inputElement.addEventListener('focus', () => {
            inputElement.parentNode.classList.add('is-focus')
        })
        
        inputElement.addEventListener('focusout', handleInput)
        inputElement.addEventListener('input', handleInput)
        inputElement.addEventListener('change', handleInput)
    })
}



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



// function setupCircularSlide() {
//     document.querySelectorAll('[data-circular-slide]').forEach((circularSlide) => {
//         const slideItems = circularSlide.querySelectorAll('[data-slide-item]')
//         const currentItemCount = slideItems.length
//         const itemsNeeded = 36 - currentItemCount

//         for (let i = 0; i < itemsNeeded; i++) {
//             const clone = slideItems[i % currentItemCount].cloneNode(true);
//             circularSlide.appendChild(clone)
//         }

//         const updatedSlideItems = circularSlide.querySelectorAll('[data-slide-item]')

//         updatedSlideItems.forEach((slideItem, index) => {
//             const slideWidth = slideItem.clientWidth
//             const rotationAngle = index * 10
//             slideItem.parentNode.parentNode.style.transformOrigin = `${slideWidth / 2}px 160vmax`
//             slideItem.style.transformOrigin = `${slideWidth / 2}px 160vmax`
//             slideItem.style.transform = `rotate(${rotationAngle}deg)`

//             gsap.to(slideItem, {
//                 rotation: "-=360",
//                 transformOrigin: `${slideWidth / 2}px 160vmax`,
//                 ease: "none",
//                 repeat: -1,
//                 duration: 200
//             })
//         })
//     })
// }



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
        setupInput()
        
    }, 500)
})