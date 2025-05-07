// Limpieza de instancias previas (seguro incluso en reloads)
if (window.pJSDom && window.pJSDom.length) {
  window.pJSDom.forEach(p => {
    if (p && p.pJS && p.pJS.fn && typeof p.pJS.fn.vendors.destroypJS === "function") {
      p.pJS.fn.vendors.destroypJS();
    }
  });
  window.pJSDom = [];
}

// Helper para inicializar si el div existe
function safeInitParticles(id, config) {
  const container = document.getElementById(id);
  if (container) {
    particlesJS(id, config);
  }
}

// Config para la sección inferior
const configBottom = {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 1 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
};

// Config para el hero
const configHero = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#224261" },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: 2, random: true },
    line_linked: { enable: true, distance: 120, color: "#224261", opacity: 0.6, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 150, line_linked: { opacity: 0.9 } } }
  },
  retina_detect: true
};

// Inicialización segura
safeInitParticles("particles-js", configBottom);
safeInitParticles("particles-js-hero", configHero);
