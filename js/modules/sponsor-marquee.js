(() => {
  document.querySelectorAll("[data-sponsor-track]").forEach((track) => {
    const group = track.querySelector(".sponsor-group");

    if (!group || track.children.length > 1) return;

    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.append(clone);
  });
})();
