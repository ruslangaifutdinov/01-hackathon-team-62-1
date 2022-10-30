import {Module} from '../core/module';

export class RatesModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    console.log("Rates Module");
  }
}