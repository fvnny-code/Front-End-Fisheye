// Fonction pour activer ou désactiver le focus des éléments en arrière-plan
export function togglePageFocus(enable) {
    const elements = document.querySelectorAll("header, main, footer");
    elements.forEach((element) => {
      element.setAttribute("aria-hidden", !enable);
    });
  }