import { createApp } from 'vue';
import App from './App.vue';
import NeedUi from '../packages';
import './styles/index.css';

createApp(App).use(NeedUi).mount('#app');
