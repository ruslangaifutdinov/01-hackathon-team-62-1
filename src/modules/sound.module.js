import { Module } from "../core/module";
import { random } from "../utils";

import sound1 from "../assets/sound/1.mp3";
import sound2 from "../assets/sound/2.mp3";
import sound3 from "../assets/sound/3.mp3";
import sound4 from "../assets/sound/4.mp3";
import sound5 from "../assets/sound/5.mp3";

export class SoundModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.sounds = [sound1, sound2, sound3, sound4, sound5];
    this.collection = [];
    this.#init(this.sounds);
    this.notClean = false;
  }

  #init(sounds) {
    sounds.forEach((item, index) => {
      const audio = new Audio(sounds[index]);
      this.collection.push(audio);
    });
  }

  trigger() {
    const randomSound = random(0, this.collection.length - 1);
    const audio = this.collection[randomSound];

    if (this.notClean) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
      this.notClean = true;
    }
  }
}
