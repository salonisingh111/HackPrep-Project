/**
 * How It Works intersection controller triggering sequential step reveals.
 */
export function initHowItWorks(sectionId = "how-it-works") {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const steps = section.querySelectorAll(".workflow-step");
  if (!steps.length) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isReducedMotion || !("IntersectionObserver" in window)) {
    steps.forEach(step => step.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        steps.forEach(step => step.classList.add("is-revealed"));
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
  });

  observer.observe(section);
}
