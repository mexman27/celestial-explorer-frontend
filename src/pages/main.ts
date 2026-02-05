import styles from './main.module.css';
import { Header } from '../components/header/header';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
import { View } from '../components/view/view';

export function main(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = styles['main'];

  const header = new Header({ title: 'Celestial Explorer', navbar: new Navbar({ items: ['Stars', 'Planets', 'Galaxies'] }) });
  header.mount(el);

  const sidebar = new Sidebar({ content: 'Sidebar' });
  sidebar.mount(el);

  const view = new View({ content: 'Main View' });
  view.mount(el);

  return el;
}
