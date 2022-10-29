import {Module} from '../core/module';

export class ClicksModule extends Module {


  constructor(type, text) {
    super(type, text);

    this.time = 0;
    this.score = -1;

    this.clicksModuleWrapper = document.createElement('div');
    this.clicksModuleWrapper.className = 'clicks-module-wrapper';

    this.selectTimeWrapper = document.createElement('div');
    this.selectTimeWrapper.className = 'select-time-wrapper';

    this.timeInfoHTML = document.createElement('h1');
    this.clicksModuleWrapper.append(this.timeInfoHTML);

    this.resultInfoHTML = document.createElement('h2');

    // this.againButton = document.createElement('button');
    // this.againButton.className = 'again-button';
    // this.againButton.textContent = 'Еще раз';
  }

  finishClick() {
    this.timeInfoHTML.remove();
    if (this.score === 0) {
      this.resultInfoHTML.textContent = `Странно, но ты не кликнул ни одного раза ...`;
    } else {
      this.resultInfoHTML.textContent = `Ты кликнул ${this.score} раз(а)!`;
    }
    
    this.clicksModuleWrapper.append(this.resultInfoHTML);
    // this.clicksModuleWrapper.append(this.againButton);
    // this.againButton.addEventListener('click', () => {
    //   this.clearModule();
    //   this.trigger();
    // });

  }

  // clearModule() {
  //   this.clicksModuleWrapper.innerHTML = '';
  // }

  setTime(time) {
    this.timeInfoHTML.textContent = `Кликай! У тебя осталось 00:${time} сек.`;
  }

  decreaseTime() {
    if (this.time === 0) {
      this.finishClick();
    } else {
      let currentTime = this.time--;
      if (currentTime < 10) currentTime = `0${currentTime}`;
      this.setTime(currentTime);
    }
  }

  selectTime() {
    this.selectTimeWrapper.innerHTML = `
      <h2>Выбери время:</h2>
      <ul class="time-list">
        <li><button class="time-btn" data-time="5">5 сек.</button></li>
        <li><button class="time-btn" data-time="10">10 сек.</button></li>
        <li><button class="time-btn" data-time="15">15 сек.</button></li>
        <li><button class="time-btn" data-time="20">20 сек.</button></li>
      </ul>
    `;
    this.clicksModuleWrapper.append(this.selectTimeWrapper);
    const timeList = this.selectTimeWrapper.querySelector('.time-list');
    timeList.addEventListener('click', event => {
      if (event.target.classList.contains('time-btn')) {
        const targetTime = parseInt(event.target.dataset.time);
        this.time = targetTime;
        this.selectTimeWrapper.remove();
        this.startClick();
      }
    });
  }

  startClick() {
    setInterval(() => {
      this.decreaseTime();
    }, 1000);
    
    document.body.addEventListener('selectstart', event => event.preventDefault());

    document.body.addEventListener('click', () => {
      if (this.time > 0) this.score++;
    });
  }

  trigger() {
    document.body.append(this.clicksModuleWrapper);
    this.selectTime();

  }
}
