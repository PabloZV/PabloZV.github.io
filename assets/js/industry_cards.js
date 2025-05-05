const cards = document.querySelectorAll('.industry-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // solo una vez
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));