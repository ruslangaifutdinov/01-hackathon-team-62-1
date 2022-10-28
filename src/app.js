import "./styles.css";
import ContextMenu from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { ShapeModule } from "./modules/shape.module";
import { ClicksModule } from "./modules/clicks.module";

const menu = new ContextMenu("#menu");
const backgroundModule = new BackgroundModule("background", "Случайный фон");
const shapeModule = new ShapeModule("shape", "Случайная фигура");
const clicksModule = new ClicksModule("click", "Игра 'подсчёт кликов'");

menu.add(backgroundModule);
menu.add(shapeModule);
menu.add(clicksModule);
