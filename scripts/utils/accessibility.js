

// Fonction pour activer ou désactiver le focus sur les éléments en arrière-plan
export function toggleFocusOnBackground(enable) {
    const focusableElements = document.querySelectorAll("header, main, footer");
    focusableElements.forEach(element => {
      element.setAttribute("aria-hidden", !enable);
    });
  }
  
  // Fonction pour activer la navigation au clavier
  export function enableKeyboardNavigation(container, handlers = {}) {
    container.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" && handlers.onNext) {
        handlers.onNext(event);
      } else if (event.key === "ArrowLeft" && handlers.onPrev) {
        handlers.onPrev(event);
      } else if (event.key === "Escape" && handlers.onClose) {
        handlers.onClose(event);
      } else if (["Enter", " "].includes(event.key) && handlers.onSelect) {
        handlers.onSelect(event);
      }
    });
  }
  
  // Utilitaire pour restreindre le focus à l'intérieur d'un élément spécifique (par exemple, une modale)
  export function trapFocusInElement(element) {
    const focusableSelectors = [
      'a[href]', 'button', 'textarea', 'input[type="text"]',
      'input[type="radio"]', 'input[type="checkbox"]', 'select', 'input[type="email"]' 
    ];
    const focusableElements = element.querySelectorAll(focusableSelectors.join(", "));
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
  
    element.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }