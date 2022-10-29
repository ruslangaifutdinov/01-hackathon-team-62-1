import { Module } from '../core/module';
import { random } from "../utils";

export class BackgroundModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.symbols = '0123456789ABCDEF';
        this.color;
    }

    #randomColor() {
        this.color = '#'; 
        let randomIndex;
        for (let i = 0; i < 6; i++) {
            randomIndex = random(0, this.symbols.length - 1);
            this.color += this.symbols[randomIndex];
        }
    }

    trigger() {
        this.#randomColor();
        document.body.style.background = this.color;
    }
}