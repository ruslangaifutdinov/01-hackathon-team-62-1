import "./styles.css";
import ContextMenu from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { ShapeModule } from "./modules/shape.module";
import { ClicksModule } from "./modules/clicks.module";
import { SoundModule } from "./modules/sound.module";
import { TimerModule } from "./modules/timer.module";
import { SnakeModule } from "./modules/snake.module";

const menu = new ContextMenu("#menu");
const backgroundModule = new BackgroundModule("background", "Случайный фон");
const shapeModule = new ShapeModule("shape", "Случайная фигура");
const clicksModule = new ClicksModule("click", "Игра 'подсчёт кликов'");
const soundModule = new SoundModule("sound", "Случайный звук");
const timerModule = new TimerModule('timer', 'Таймер отсчета');
const snakeModule = new SnakeModule('snake', 'Змейка');

menu.add(backgroundModule);
menu.add(shapeModule);
menu.add(clicksModule);
menu.add(soundModule);
menu.add(timerModule);
menu.add(snakeModule);
