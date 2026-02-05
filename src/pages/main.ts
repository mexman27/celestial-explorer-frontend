import styles from './main.module.css';
import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { View } from '../components/view/view';

export function main(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = styles['main'];

  new Header({ parent: el });
  new Sidebar({ parent: el });
  new View({ parent: el });

  return el;
}
