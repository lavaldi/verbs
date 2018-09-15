class App {

  constructor() {
    if (!App.instance) {
      this.setSettings();
      this.subscribeEvents();
      App.instance = this;
    }
    return App.instance;
  }

  setSettings() {
    this.settings = {
      isLoading: true,
      cardsClass: '.js-card',
      cardTplClass: 'js-card-template',
      baseFormClass: '.js-base-form-value',
      pastFormClass: '.js-past-form-value',
      pastParticipleFormClass: '.js-past-participle-form-value',
      sEsIesFormClass: '.js-s-es-ies-value',
      ingFormClass: '.js-ing-form-value',
      spinner: document.querySelector('.js-loader'),
      cardTemplate: document.querySelector('.js-card-template'),
      container: document.querySelector('.js-main'),
      searchInput: document.getElementById('searchVerb'),
    }
  }

  subscribeEvents() {
    document.addEventListener('DOMContentLoaded', this.initApp);
    document.getElementById('searchVerb').addEventListener('keyup', this.updateCardsToShow);
  }

  initApp = () => {
    window.localforage.getItem('verbs', (err, verbsList) => {
      if (verbsList) {
        this.showCards(verbsList);
      } else {
        this.getForecast();
      }
    });
  }

  updateCardsToShow = () => {
    const filter = this.settings.searchInput.value.toUpperCase();
    this.searchInCards(filter);
  }

  searchInCards = (filter) => {
    const cards = document.querySelectorAll(this.settings.cardsClass);
    for (const card of cards) {
      const name = card.querySelector(this.settings.baseFormClass)[0].innerHTML;
      if (name.toUpperCase().indexOf(filter) >= 0) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  }

  showCards = (data) => {
    for (const element of data) {
      const card = app.cardTemplate.cloneNode(true);
      card.classList.remove(this.settings.cardTplClass);
      card.removeAttribute('hidden');
      card.querySelector(this.settings.baseFormClass).textContent = element.baseForm;
      card.querySelector(this.settings.pastFormClass).textContent = element.pastForm;
      card.querySelector(this.settings.pastParticipleFormClass).textContent = element.pastParticipleForm;
      card.querySelector(this.settings.sEsIesFormClass).textContent = element.sEsIesForm;
      card.querySelector(this.settings.ingFormClass).textContent = element.ingForm;
      app.container.appendChild(card);
    }
    if (app.isLoading) {
      this.settings.spinner.setAttribute('hidden', true);
      this.settings.container.removeAttribute('hidden');
      this.settings.isLoading = false;
    }
  }

  getForecast = () => {
    const url = '/db/verbs.json';
    // Make the XHR to get the data, then update the cards
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          const response = JSON.parse(request.response);
          window.localforage.setItem('verbs', response);
          this.showCards(response);
        }
      }
    };
    request.open('GET', url);
    request.send();
  }
}

const installSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.info('Service Worker Registered');
      });
  }
}

window.addEventListener('load', () => {
  new App();
  installSW();
});
