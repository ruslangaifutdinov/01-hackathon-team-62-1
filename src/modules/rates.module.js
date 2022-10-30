import {Module} from '../core/module';
import { getData, createCustomSelect } from '../utils';

export class RatesModule extends Module {
  #ratesData;
  #ratesModuleWrapper;
  #select;
  #rateKey;
  #ratesInfoWrapper;

  constructor(type, text) {
    super(type, text);
    this.#ratesData;
    this.#ratesModuleWrapper;
    this.#select;
    this.#rateKey = 'RUB';
    this.#ratesInfoWrapper;
  }

  #RATES_URL = 'https://cdn.cur.su/api/latest.json';

  async #getRates() {
    const ratePromise = await getData(this.#RATES_URL);
    this.#ratesData = ratePromise.rates;
  }

  #createSelect() {
    this.#select = createCustomSelect();
    this.#ratesModuleWrapper.append(this.#select);

    const select = document.querySelector('.select');
    const selectHeader = document.querySelector('.select__header');
    const selectItems = document.querySelectorAll('.select__item');
    const selectCurrent = document.querySelector('.select__current');

    selectHeader.addEventListener('click', event => {
      select.classList.toggle('active');
    });

    selectItems.forEach(item => {
      item.addEventListener('click', event => {
        const text = event.target.textContent;
        selectCurrent.textContent = text;
        selectCurrent.dataset.rateName = event.target.dataset.rateName;
        select.classList.toggle('active');
        this.#changeRateKey();
        this.#renderRateInfo();
      });
    });
  }

  #createRatesInfoWrapper() {
    this.#ratesInfoWrapper = document.createElement('div');
    this.#ratesInfoWrapper.className = 'rates-info-wrapper';

    const infoWrapperContent = `
      <div class="dollar-icon"></div>
      <div class="current-rate">
        <h1 class="rate-title">Получам данные ...</h1>
      </div>
    `;

    this.#ratesInfoWrapper.innerHTML = infoWrapperContent;
    this.#ratesModuleWrapper.append(this.#ratesInfoWrapper);
  }

  #changeRateKey() {
    this.#rateKey = this.#select.querySelector('.select__current').dataset.rateName;
  }

  #renderRateInfo() {
    const rateInfoTitle = this.#ratesInfoWrapper.querySelector('.rate-title');
    const rate = `${this.#ratesData[this.#rateKey].toFixed(2)} ${this.#rateKey}`;
    rateInfoTitle.textContent = rate;
  }

  trigger() {
    this.#getRates();

    this.#ratesModuleWrapper = document.createElement('div');
    this.#ratesModuleWrapper.className = 'rates-wrapper';
    document.body.append(this.#ratesModuleWrapper);
 
    this.#createSelect();
    this.#createRatesInfoWrapper();
    this.#changeRateKey();

    setTimeout(() => {
      this.#renderRateInfo();
    }, 500);
  }
}