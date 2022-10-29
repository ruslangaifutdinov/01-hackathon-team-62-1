import { Module } from '../core/module';
import { getRandomColor } from "../utils";

export class BackgroundModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.color;
    }

    trigger() {
        this.color = getRandomColor();
        document.body.style.background = this.color;
    }
}