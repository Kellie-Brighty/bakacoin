document.addEventListener("DOMContentLoaded", () => {
  // CA Copy Functionality
  const copyBtn = document.getElementById("copy-btn");
  const caText = document.getElementById("ca-text").innerText;
  const toast = document.getElementById("toast");

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(caText);

      // Show toast
      toast.classList.add("show");

      // Add a little feedback to button
      copyBtn.style.transform = "scale(0.9)";
      setTimeout(() => {
        copyBtn.style.transform = "";
      }, 150);

      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy CA: ", err);

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = caText;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textArea);
    }
  });

  // Add scroll parallax effect to BG shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll(".bg-shape");

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});
