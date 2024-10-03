// Classe de validation du formulaire
class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll("input, textarea");
  }

  validate() {
    let isValid = true;
    this.clearErrors();

    this.fields.forEach((field) => {
      if (!field.value.trim()) {
        this.showError(field, `* ${field.name} ne doit pas être vide.`);
        isValid = false;
      } else if (field.type === "email" && !this.isValidEmail(field.value)) {
        this.showError(field, `L'email est invalide.`);
        isValid = false;
      }
    });

    return isValid;
  }

  isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  showError(field, message) {
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    field.parentElement.appendChild(errorMessage);
    // Ajoute le message d'erreur directement après le champ concerné
    field.insertAdjacentElement("afterend", errorMessage);
  }

  clearErrors() {
    const errorMessages = this.form.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());
  }
}

// Fonction Factory pour créer une instance de FormValidator
export function formValidatorFactory(form) {
  return new FormValidator(form);
}
