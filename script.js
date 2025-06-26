// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add scroll effect to header
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.4)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.2)"
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe sections for animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Button click effects
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Card hover effects
  const cards = document.querySelectorAll(".benefit-card, .event-card, .testimonial-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-5px)"
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)"
      this.style.boxShadow = "none"
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const heroOverlay = document.querySelector(".hero-overlay")

    if (hero && heroOverlay) {
      heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Mobile menu toggle (if needed)
  const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
      const nav = document.querySelector(".nav")
      const header = document.querySelector(".header .container")

      if (!document.querySelector(".mobile-menu-btn")) {
        const menuBtn = document.createElement("button")
        menuBtn.className = "mobile-menu-btn"
        menuBtn.innerHTML = "☰"
        menuBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `

        header.appendChild(menuBtn)

        menuBtn.addEventListener("click", () => {
          nav.style.display = nav.style.display === "flex" ? "none" : "flex"
          nav.style.position = "absolute"
          nav.style.top = "100%"
          nav.style.left = "0"
          nav.style.right = "0"
          nav.style.background = "rgba(0, 0, 0, 0.9)"
          nav.style.flexDirection = "column"
          nav.style.padding = "1rem"
          nav.style.gap = "1rem"
        })
      }
    }
  }

  createMobileMenu()
  window.addEventListener("resize", createMobileMenu)

  // Add loading states to buttons
  const addLoadingState = (button, text = "Cargando...") => {
    const originalText = button.innerHTML
    button.innerHTML = `<span class="loading">⏳</span> ${text}`
    button.disabled = true

    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false
    }, 2000)
  }

  // Add click handlers for download buttons
  const downloadButtons = document.querySelectorAll(".btn-primary, .btn-purple")
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      addLoadingState(this, "Redirigiendo...")
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        img.onload = () => {
          img.style.opacity = "1"
        }

        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })

  // Add scroll progress indicator
  const createScrollProgress = () => {
    const progressBar = document.createElement("div")
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ec4899, #f97316);
            z-index: 9999;
            transition: width 0.1s ease;
        `
    document.body.appendChild(progressBar)

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      progressBar.style.width = scrollPercent + "%"
    })
  }

  createScrollProgress()

  console.log("🎵 Movi - Tu viaje, mucho más que un destino")
  console.log("Landing page cargada correctamente")
})

// Add some utility functions
const utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },

  // Smooth scroll to element
  scrollToElement: (element, offset = 0) => {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  },
}

// Export utils for potential use
window.moviUtils = utils
