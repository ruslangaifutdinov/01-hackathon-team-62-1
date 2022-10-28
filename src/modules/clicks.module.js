import {Module} from '../core/module';

export class ClicksModule extends Module {


  constructor(type, text) {
    super(type, text);

    this.time = 5;
    this.score = 0;

    this.moduleWrapper = document.createElement('div');
    this.moduleWrapper.style.width = '50%';
    this.moduleWrapper.style.height = '100%';
    this.moduleWrapper.style.marginLeft = 'auto';
    this.moduleWrapper.style.marginRight = 'auto';
    this.moduleWrapper.style.backgroundColor = '#dfdbdd';
    this.moduleWrapper.style.boxShadow = '7px 7px 4px #b9b2b6';
    this.moduleWrapper.style.borderRadius = '10px';
    this.moduleWrapper.style.display = 'flex';
    this.moduleWrapper.style.justifyContent = 'center';
    this.moduleWrapper.style.alignItems = 'center';
    document.body.append(this.moduleWrapper);
    

    this.timeInfoHTML = document.createElement('h1');
    this.moduleWrapper.append(this.timeInfoHTML);

    this.resultInfoHTML = document.createElement('h2');
  }

  finishClick() {
    this.timeInfoHTML.remove();
    if (this.score === 0) {
      this.resultInfoHTML.textContent = `Странно, но ты не кликнул ни одного раза ...`;
    } else {
      this.resultInfoHTML.textContent = `Ты кликнул ${this.score} раз(а)!`;
    }
    
    this.moduleWrapper.append(this.resultInfoHTML);
  }

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

  trigger() {
    setInterval(() => {
      this.decreaseTime();
    }, 1000);

    document.body.addEventListener('selectstart', event => event.preventDefault());

    document.body.addEventListener('click', () => {
      if (this.time > 0) this.score++;
    });
  }
}
