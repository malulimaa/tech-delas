// A página de oportunidades só abre após o envio do formulário nesta sessão.
if (window.location.pathname.endsWith("/conteudo.html") && !sessionStorage.getItem("techDelasParticipant")) {
  window.location.replace("../pages/cadastro.html");
}

const REGISTRATION_ENDPOINT = "https://script.google.com/macros/s/AKfycbxTsYxeGSxN46GMMzOhCVOsALI-QLJVvQWyKhYYqKZc6XsLdIFQjQeBRTfJUUP56RX0/exec";

const form = document.querySelector("#registration-form");
if (form) {
  const errorBox = document.querySelector("#form-error");
  const setupNote = document.querySelector("#setup-note");
  if (!REGISTRATION_ENDPOINT) setupNote.hidden = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorBox.textContent = "";
    errorBox.classList.remove("show");
    const name = form.elements.name.value.trim().replace(/\s+/g, " ");
    const email = form.elements.email.value.trim().toLowerCase();
    const consent = document.querySelector("#consent").checked;
    const honeypot = form.elements.website.value;

    if (honeypot) return;
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) {
      errorBox.textContent = "Confira seu nome, um e-mail válido e a confirmação de uso dos dados.";
      errorBox.classList.add("show");
      return;
    }
    if (!REGISTRATION_ENDPOINT) {
      errorBox.textContent = "O formulário ainda não está conectado.";
      errorBox.classList.add("show");
      return;
    }

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.innerHTML = "Enviando…";
    try {
      // Apps Script pode redirecionar a resposta; no-cors envia os campos sem
      // expor a leitura da planilha ao navegador. A confirmação é informativa.
      await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ name, email, consent: "true", website: "" })
      });
      sessionStorage.setItem("techDelasParticipant", name);
      window.location.href = "../pages/conteudo.html";
    } catch (error) {
      errorBox.textContent = "Não foi possível enviar agora. Verifique sua conexão e tente novamente.";
      errorBox.classList.add("show");
      button.disabled = false;
      button.innerHTML = "Continuar para o site <span>↗</span>";
    }
  });
}

const communityTrack = document.querySelector("#community-track");
if (communityTrack) {
  document.querySelectorAll("[data-carousel-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = communityTrack.querySelector(".community-card");
      const gap = Number.parseFloat(getComputedStyle(communityTrack).gap) || 0;
      const direction = Number(button.dataset.carouselStep);
      communityTrack.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
    });
  });
}
