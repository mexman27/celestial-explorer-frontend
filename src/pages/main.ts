import styles from './main.module.css';
import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { View } from '../components/view/view';

export function main(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = styles['main'];

  new Header().mount(el);
  new Sidebar().mount(el);
  new View().mount(el);

  return el;
}
