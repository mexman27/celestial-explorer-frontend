import './styles/variables.css';
import { App } from './app';

const container = document.getElementById('app');
if (!container) {
  throw new Error('Root element #app not found');
}

const app = new App(container);
app.start();
