(() => {
  const carousel = document.querySelector("[data-history-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector(".history-viewport");
  const track = carousel.querySelector("[data-history-track]");
  const cards = [...carousel.querySelectorAll("[data-history-card]")];
  const previousButton = carousel.querySelector("[data-history-prev]");
  const nextButton = carousel.querySelector("[data-history-next]");
  const dotsContainer = carousel.querySelector("[data-history-dots]");

  if (!viewport || !track || cards.length === 0) return;

  let activeIndex = Math.min(1, cards.length - 1);
  let pointerStart = null;

  const dots = cards.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver antecedente ${index + 1}`);
    dot.addEventListener("click", () => showCard(index));
    dotsContainer?.append(dot);
    return dot;
  });

  function showCard(index) {
    activeIndex = (index + cards.length) % cards.length;
    const activeCard = cards[activeIndex];
    const offset = viewport.clientWidth / 2 - (activeCard.offsetLeft + activeCard.offsetWidth / 2);

    track.style.transform = `translate3d(${offset}px, 0, 0)`;

    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  previousButton?.addEventListener("click", () => showCard(activeIndex - 1));
  nextButton?.addEventListener("click", () => showCard(activeIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showCard(activeIndex - 1);
    if (event.key === "ArrowRight") showCard(activeIndex + 1);
  });

  viewport.addEventListener("pointerdown", (event) => {
    pointerStart = event.clientX;
  });

  viewport.addEventListener("pointerup", (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) < 45) return;
    showCard(activeIndex + (distance < 0 ? 1 : -1));
  });

  viewport.addEventListener("pointercancel", () => {
    pointerStart = null;
  });

  window.addEventListener("resize", () => showCard(activeIndex));
  showCard(activeIndex);
})();
