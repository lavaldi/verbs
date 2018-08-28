(function () {
  'use strict';

  const app = {
    isLoading: true,
    spinner: document.querySelector('.js-loader'),
    cardTemplate: document.querySelector('.js-card-template'),
    container: document.querySelector('.js-main'),
    searchInput: document.getElementById('searchVerb'),
  };

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  /* Event listener for search input */
  document.getElementById('searchVerb').addEventListener('keyup', function () {
    app.updateCardsToShow();
  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Show the cards with the list of the verbs.
  app.showCards = function (data) {
    for (const element of data) {
      const card = app.cardTemplate.cloneNode(true);
      card.classList.remove('js-card-template');
      card.removeAttribute('hidden');
      card.querySelector('.js-base-form-value').textContent = element.baseForm;
      card.querySelector('.js-past-form-value').textContent = element.pastForm;
      card.querySelector('.js-past-participle-form-value').textContent = element.pastParticipleForm;
      card.querySelector('.js-s-es-ies-value').textContent = element.sEsIesForm;
      card.querySelector('.js-ing-form-value').textContent = element.ingForm;
      app.container.appendChild(card);
    }
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

  app.updateCardsToShow = function () {
    const filter = app.searchInput.value.toUpperCase();
    app.searchInCards(filter);
  }

  app.searchInCards = function (filter) {
    const cards = document.querySelectorAll('.js-card');
    for (const card of cards) {
      const name = card.getElementsByClassName('js-base-form-value')[0].innerHTML;
      if (name.toUpperCase().indexOf(filter) >= 0) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  }

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  // Get all verbs
  app.getForecast = function () {
    const url = '/db/verbs.json';
    // Make the XHR to get the data, then update the cards
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          const response = JSON.parse(request.response);
          window.localforage.setItem('verbs', response);
          app.showCards(response);
        }
      }
    };
    request.open('GET', url);
    request.send();
  };

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    window.localforage.getItem('verbs', function (err, verbsList) {
      if (verbsList) {
        app.showCards(verbsList);
      } else {
        app.getForecast();
      }
    });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function () {
        console.info('Service Worker Registered');
      });
  }
})();
