import styles from './main.module.css';
import { Header } from '../components/header/header';
import { Navbar } from '../components/navbar/navbar';
import { Item } from '../components/navbar/item/item';
import { Sidebar } from '../components/sidebar/sidebar';
import { SidebarNav } from '../components/sidebar/nav/nav';
import { View } from '../components/view/view';
import { Router } from '../router/router';
import { routes } from '../router/routes';
import { PATHS } from '../router/paths';
import { sidebarLinks } from '../router/sidebar';

export function main(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = styles['main'];

  const header = new Header({
    title: 'Celestial Explorer',
    navbar: new Navbar({
      items: [
        new Item({ label: 'Home', href: PATHS.HOME }),
        new Item({ label: 'Stars', href: PATHS.STARS }),
        new Item({ label: 'Planets', href: PATHS.PLANETS }),
        new Item({ label: 'Galaxies', href: PATHS.GALAXIES }),
      ],
    }),
  });
  header.mount(el);

  const sidebar = new Sidebar({
    nav: new SidebarNav({ links: sidebarLinks }),
  });
  sidebar.mount(el);

  const view = new View({ content: '' });
  view.mount(el);

  new Router(view.el, routes, PATHS.HOME);

  return el;
}
