import { Module } from '../core/module';
import { getRandomColor } from "../utils";

export class BackgroundModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.color;
    this.backgroundModuleWrapper;
  }

  trigger() {
    this.backgroundModuleWrapper = document.createElement('div');
    this.backgroundModuleWrapper.className = 'background-wrapper';

    document.body.append(this.backgroundModuleWrapper);

    this.color = getRandomColor();

    this.backgroundModuleWrapper.style.background = this.color;
  }
}