import {Module} from '../core/module';
import { random } from "../utils";
import { getRandomColor } from "../utils";

export class ShapeModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.shapeWidth;
        this.shapeHeight;
        this.borderRadius;
        this.color;
        this.transform;
        this.top;
        this.left;
    }

    #createShapeHTML() {
        this.#getRandomValues();
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'shape';
        shapeDiv.style.width = this.shapeWidth;
        shapeDiv.style.height = this.shapeHeight;
        shapeDiv.style.borderRadius = this.borderRadius;
        shapeDiv.style.backgroundColor = this.color; 
        shapeDiv.style.transform = this.transform;
        shapeDiv.style.position = 'absolute';
        shapeDiv.style.top = this.top;
        shapeDiv.style.left = this.left;

        return shapeDiv;
    }

    #getRandomValues() {
        this.shapeWidth = `${random(100, 200)}px`;
        this.shapeHeight = `${random(100, 200)}px`;
        this.borderRadius = `${random(0, 50)}%`;
        this.color = getRandomColor();
        this.transform = `skew(${random(-30, 30)}deg)`;
        const { width, height } = document.body.getBoundingClientRect();
        const randomTop = random(0, height);
        const randomLeft = random(0, width);
        if (randomLeft + parseInt(this.shapeWidth) < width) {
            this.left = `${randomLeft}px`;
        } else {
            this.left = `${width - parseInt(this.shapeWidth)}px`;
        }
        console.log(randomTop + parseInt(this.shapeHeight) < height)
        if (randomTop + parseInt(this.shapeHeight) < height) {
            this.top = `${randomTop}px`;
        } else {
            this.top = `${height - parseInt(this.shapeHeight)}px`;
        }
    }


    trigger() {
        document.body.style.overflow = 'hidden';
        const divToRemove = document.querySelector('.shape');
        if (divToRemove) {
            divToRemove.remove();
        }
        const divToAdd = this.#createShapeHTML();
        document.body.append(divToAdd);
    }
}