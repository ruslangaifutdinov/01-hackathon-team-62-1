import { Module } from "../core/module";

export class TimerModule extends Module {
  #timerWrapperElement; // Main Div block where timer located
  #timerCounterElement; // Special Div block for time display
  #timerID; // SetInterval ID for destruction
  #timerOnPause; // Flag, which allows pausing timer
  #secondsInput; // Value from input tag (User input data)
  #minutes; // Seconds input -> minutes (Ex. 120 -> 2mins)
  #seconds; // Seconds input -> seconds (Ex. 65 -> 5sec (and 1 minute in #minutes))

  constructor(type, text) {
    super(type, text);
    this.#generateHTML();
    this.#timerOnPause = true;
  }

  #destructor() {
    clearInterval(this.#timerID);
    this.#timerWrapperElement.remove();
    this.#timerOnPause = true;
    this.#generateHTML();
  }

  trigger() {
    if (document.body.querySelector(".timer-wrapper")) this.#destructor();
    else document.body.append(this.#timerWrapperElement);
  }

  #generateHTML() {
    this.#timerWrapperElement = document.createElement("div");
    this.#timerWrapperElement.className = "timer-wrapper";
    this.#timerWrapperElement.innerHTML = `<div class="timer-counter"></div>
             <input class="timer-seconds-input" type="number" placeholder="Input seconds">
             <div class="timer-buttons">
                <button class="timer-button-start">Start</button>
                <button class="timer-button-continue">Continue</button>
                <button class="timer-button-stop">Stop</button>
                <button class="timer-button-submit">Submit</button>
             </div>`;

    this.#timerWrapperElement
      .querySelector(".timer-button-start")
      .addEventListener("click", this.#changeTimerStatus.bind(this));
    this.#timerWrapperElement
      .querySelector(".timer-button-continue")
      .addEventListener("click", this.#changeTimerStatus.bind(this));
    this.#timerWrapperElement
      .querySelector(".timer-button-stop")
      .addEventListener("click", this.#changeTimerStatus.bind(this));
    this.#timerWrapperElement
      .querySelector(".timer-button-submit")
      .addEventListener("click", this.#initTimer.bind(this));
  }

  #initTimer() {
    this.#timerCounterElement = document.querySelector(".timer-counter");
    const secondsInputElement = this.#timerWrapperElement.querySelector(
      ".timer-seconds-input"
    );

    if (secondsInputElement.value > 9999999999) this.#secondsInput = 9999999999;
    else if (secondsInputElement.value < 1) this.#secondsInput = 1;
    else this.#secondsInput = Number(secondsInputElement.value);
    secondsInputElement.remove();

    this.#timeDisplay();
    TimerModule.#changeButton(".timer-button-submit", ".timer-button-start");

    this.#timerID = setInterval(this.#timerCountdown.bind(this), 1000);
  }

  #changeTimerStatus(event) {
    if (event.target.className === "timer-button-start") {
      TimerModule.#changeButton(".timer-button-start", ".timer-button-stop");
      this.#timerOnPause = false;
    } else if (event.target.className === "timer-button-stop") {
      TimerModule.#changeButton(".timer-button-stop", ".timer-button-continue");
      this.#timerOnPause = true;
    } else {
      TimerModule.#changeButton(".timer-button-continue", ".timer-button-stop");
      this.#timerOnPause = false;
    }
  }

  static #changeButton(firstButton, secondButton) {
    document.querySelector(firstButton).style.display = "none";
    document.querySelector(secondButton).style.display = "block";
  }

  static #addZero(number) {
    return "0" + number;
  }

  #timeDisplay() {
    this.#minutes = Math.floor(this.#secondsInput / 60);
    this.#seconds = this.#secondsInput % 60;

    if (this.#minutes < 10) this.#minutes = TimerModule.#addZero(this.#minutes);
    if (this.#seconds < 10) this.#seconds = TimerModule.#addZero(this.#seconds);
    this.#timerCounterElement.innerHTML = `${this.#minutes} : ${this.#seconds}`;
  }

  #timerCountdown() {
    if (this.#secondsInput > 0) {
      if (!this.#timerOnPause) {
        this.#secondsInput--;
        this.#timeDisplay();
      }
    } else {
      this.#timerCounterElement.innerHTML = "Time is out!";
      clearInterval(this.#timerID);
      this.#timerWrapperElement.querySelector(".timer-buttons").remove();
      setTimeout(this.#destructor.bind(this), 3000);
    }
  }
}
