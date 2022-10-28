import './styles.css'

import { ClicksModule } from './modules/clicks.module';

const clicksModule = new ClicksModule('clicks', 'Аналитика кликов');
clicksModule.trigger();
