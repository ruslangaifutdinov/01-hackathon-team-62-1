import {Module} from '../core/module';

export class ClicksModule extends Module {
  #time;
  #score;
  #clicksModuleWrapper;
  #selectTimeWrapper;
  #timer;
  #timeInfoHTML;
  #resultInfoHTML;
  #againButton;

  constructor(type, text) {
    super(type, text);
    this.#time = 0;
    this.#score = 0;
    this.#clicksModuleWrapper;
    this.#selectTimeWrapper;
    this.#timer;
    this.#timeInfoHTML;
    this.#resultInfoHTML;
    this.#againButton;

    document.body.addEventListener('selectstart', event => event.preventDefault());

    document.body.addEventListener('click', event => {
      if (this.#time > 0) {
        this.#score += 1;
      }

      if (this.#time) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
        
        document.body.append(cursor);

        setTimeout(() => {
          cursor.remove();
        }, 45);
      }
    });
  }

  #finishClick() {
    this.#timeInfoHTML.remove();

    this.#resultInfoHTML = document.createElement('h2');
    this.#resultInfoHTML.className = 'result-title';

    if (this.#score === 0) {
      this.#resultInfoHTML.textContent = `Странно, но ты не кликнул ни одного раза ...`;
    } else {
      this.#resultInfoHTML.textContent = `Общее количество кликов - ${this.#score}`;
    }
    
    this.#clicksModuleWrapper.append(this.#resultInfoHTML);

    this.#againButton = document.createElement('button');
    this.#againButton.className = 'again-button';
    this.#againButton.textContent = 'Еще раз';
    this.#clicksModuleWrapper.append(this.#againButton);

    this.#againButton.addEventListener('click', () => {
      this.#clearModule();
    });
  }

  #clearModule() {
    this.#clicksModuleWrapper.remove();
    this.trigger();
  }

  #setTime(time) {
    this.#timeInfoHTML.textContent = `Кликай! У тебя осталось 00:${time} сек.`;
  }

  #decreaseTime() {
    if (this.#time === 0) {
      clearInterval(this.#timer);
      this.#finishClick();
    } else {
      let currentTime = this.#time--;
      if (currentTime < 10) currentTime = `0${currentTime}`;
      this.#setTime(currentTime);
    }
  }

  #selectTime() {
    this.#selectTimeWrapper = document.createElement('div');
    this.#selectTimeWrapper.className = 'select-time-wrapper';
    this.#selectTimeWrapper.innerHTML = `
      <h2>Выбери время:</h2>
      <ul class="time-list">
        <li><button class="time-btn" data-time="5">5 сек.</button></li>
        <li><button class="time-btn" data-time="10">10 сек.</button></li>
        <li><button class="time-btn" data-time="15">15 сек.</button></li>
        <li><button class="time-btn" data-time="20">20 сек.</button></li>
      </ul>
    `;
    this.#clicksModuleWrapper.append(this.#selectTimeWrapper);

    const timeList = this.#selectTimeWrapper.querySelector('.time-list');

    timeList.addEventListener('click', event => {
      if (event.target.classList.contains('time-btn')) {
        const targetTime = parseInt(event.target.dataset.time);
        this.#time = targetTime;
        this.#selectTimeWrapper.remove();
        this.#startClick();
      }
    });
  }

  #startClick() {
    this.#timeInfoHTML = document.createElement('h1');
    this.#timeInfoHTML.className = 'time-info-title';
    this.#clicksModuleWrapper.append(this.#timeInfoHTML);

    this.#timer = setInterval(() => {
      this.#decreaseTime();
    }, 1000);
  }

  trigger() {
    this.#score = -1;

    this.#clicksModuleWrapper = document.createElement('div');
    this.#clicksModuleWrapper.className = 'clicks-module-wrapper';

    document.body.append(this.#clicksModuleWrapper);

    this.#selectTime();
  }
}
