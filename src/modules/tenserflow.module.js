import { Module } from "../core/module";

export class TenserFlow extends Module {
  constructor(type, text) {
    super(type, text);
    this.url = "https://teachablemachine.withgoogle.com/models/5K-3f5lqM/";
    this.model;
    this.webcam;
    this.labelContainer;
    this.maxPredictions;

    this.init = async () => {
      console.log(this.url);
      const modelURL = this.url + "model.json";
      const metadataURL = this.url + "metadata.json";

      this.model = await tmImage.load(modelURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();

      const flip = true;
      this.webcam = new tmImage.Webcam(200, 200, flip);
      await this.webcam.setup();
      await this.webcam.play();
      window.requestAnimationFrame(this.loop);

      document
        .getElementById("webcam-container")
        .appendChild(this.webcam.canvas);
      this.labelContainer = document.getElementById("label-container");
      console.log(this.labelContainer);
      for (let i = 0; i < this.maxPredictions; i++) {
        this.labelContainer.appendChild(document.createElement("div"));
      }
    };

    this.loop = async () => {
      this.webcam.update();
      await this.predict();
      window.requestAnimationFrame(this.loop);
    };

    this.predict = async () => {
      const prediction = await this.model.predict(this.webcam.canvas);
      for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        this.labelContainer.childNodes[i].innerHTML = classPrediction;
      }
    };
  }

  initial() {}

  trigger() {
    console.log("Trigger");
    this.render();
    this.initial();
  }

  render() {
    console.log("Render");
    const div = document.createElement("div");
    div.textContent = "Помощник выбора цвета";

    const btn = document.createElement("button");
    btn.textContent = "Запустить камеру";

    const camera = document.createElement("div");
    camera.id = "webcam-container";

    const label = document.createElement("div");
    label.id = "label-container";

    document.body.append(div, btn, camera, label);

    btn.addEventListener("click", () => {
      this.init();
    });
  }
}
