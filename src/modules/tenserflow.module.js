import { Module } from "../core/module";

export class TenserFlow extends Module {
  constructor(type, text) {
    super(type, text);
    const URL = "https://teachablemachine.withgoogle.com/models/5K-3f5lqM/";
    let model, webcam, labelContainer, maxPredictions;
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
      init();
    });

    async function init() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const flip = true;
      webcam = new tmImage.Webcam(200, 200, flip);
      await webcam.setup();
      await webcam.play();
      window.requestAnimationFrame(loop);

      document.getElementById("webcam-container").appendChild(webcam.canvas);
      labelContainer = document.getElementById("label-container");
      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
      }
    }
  }
}
