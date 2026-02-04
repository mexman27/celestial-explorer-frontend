import type { PageDefinition } from '@/engine/page/types';
import { createButton } from '@/components/common/button/button';
import { createCard } from '@/components/common/card/card';
import { createInput } from '@/components/common/input/input';
import { createDropdown } from '@/components/common/dropdown/dropdown';
import { createHeading } from '@/components/common/heading/heading';
import { createIcon, type IconName } from '@/components/common/icon/icon';
import styles from './portfolio.module.css';

export const portfolioPage: PageDefinition = {
  visualization: { mode: 'portfolio', highlightedStars: [] },
  sidebar: { view: 'portfolio' },
  detail: null,
  header: {
    title: 'Component Portfolio',
    breadcrumbs: [],
  },
};

const SECTIONS = ['Button', 'Card', 'Input', 'Dropdown', 'Heading', 'Icon'] as const;

export function renderPortfolioSidebar(container: HTMLElement): void {
  container.innerHTML = '';
  const sidebarClass = styles.portfolio__sidebar;
  if (sidebarClass) {
    container.classList.add(sidebarClass);
  }

  const nav = document.createElement('nav');
  nav.className = styles.portfolio__nav ?? '';
  nav.innerHTML = SECTIONS.map(
    (name) => `<a href="#/portfolio/${name.toLowerCase()}" class="${styles.portfolio__navLink ?? ''}">${name}</a>`
  ).join('');

  container.appendChild(nav);
}

function createContentWrapper(container: HTMLElement): HTMLElement {
  container.innerHTML = '';
  const portfolioClass = styles.portfolio;
  if (portfolioClass) {
    container.classList.add(portfolioClass);
  }

  const content = document.createElement('div');
  content.className = styles.portfolio__content ?? '';
  container.appendChild(content);
  return content;
}

function createSection(title: string): HTMLElement {
  const section = document.createElement('section');
  section.className = styles.portfolio__section ?? '';
  section.id = `section-${title.toLowerCase()}`;
  section.innerHTML = `<h2 class="${styles['portfolio__section-title'] ?? ''}">${title}</h2>`;
  return section;
}

function createRow(label: string): HTMLElement {
  const row = document.createElement('div');
  row.className = styles.portfolio__row ?? '';
  row.innerHTML = `<span class="${styles['portfolio__row-label'] ?? ''}">${label}</span>`;

  const items = document.createElement('div');
  items.className = styles['portfolio__row-items'] ?? '';
  row.appendChild(items);

  return row;
}

function getRowItems(row: HTMLElement): HTMLElement {
  const itemsClass = styles['portfolio__row-items'];
  if (!itemsClass) {
    return row.lastElementChild as HTMLElement;
  }
  return row.querySelector(`.${itemsClass}`) as HTMLElement;
}

export function renderButtonSection(container: HTMLElement): void {
  const wrapper = createContentWrapper(container);
  const section = createSection('Button');
  const variants = ['primary', 'secondary', 'ghost', 'danger', 'success', 'warning', 'info'] as const;
  const sizes = ['small', 'medium', 'large'] as const;

  variants.forEach((variant) => {
    const row = createRow(variant.charAt(0).toUpperCase() + variant.slice(1));
    const items = getRowItems(row);
    sizes.forEach((size) => {
      createButton(items, {
        label: size.charAt(0).toUpperCase() + size.slice(1),
        variant,
        size,
      });
    });
    createButton(items, { label: 'Disabled', variant, disabled: true });
    createButton(items, { label: 'Loading', variant, loading: true });
    section.appendChild(row);
  });

  wrapper.appendChild(section);
}

export function renderCardSection(container: HTMLElement): void {
  const wrapper = createContentWrapper(container);
  const section = createSection('Card');

  const variantsRow = createRow('Variants');
  const variantsItems = getRowItems(variantsRow);

  (['default', 'elevated', 'outlined'] as const).forEach((variant) => {
    const card = createCard(variantsItems, { variant });
    card.setContent(`<strong>${variant}</strong><p>Card content goes here</p>`);
  });
  section.appendChild(variantsRow);

  const interactiveRow = createRow('Interactive');
  const interactiveItems = getRowItems(interactiveRow);

  const card = createCard(interactiveItems, {
    variant: 'elevated',
    interactive: true,
    onClick: () => console.log('Card clicked'),
  });
  card.setContent('<strong>Clickable</strong><p>Hover and click me</p>');
  section.appendChild(interactiveRow);

  wrapper.appendChild(section);
}

export function renderInputSection(container: HTMLElement): void {
  const wrapper = createContentWrapper(container);
  const section = createSection('Input');

  const typesRow = createRow('Types');
  const typesItems = getRowItems(typesRow);
  createInput(typesItems, { type: 'text', placeholder: 'Text input' });
  createInput(typesItems, { type: 'number', placeholder: 'Number input' });
  createInput(typesItems, { type: 'search', placeholder: 'Search...' });
  section.appendChild(typesRow);

  const statesRow = createRow('States');
  const statesItems = getRowItems(statesRow);
  createInput(statesItems, { placeholder: 'Default' });
  createInput(statesItems, { value: 'With value' });
  createInput(statesItems, { placeholder: 'Disabled', disabled: true });
  createInput(statesItems, { value: 'Error state', error: 'Invalid input' });
  section.appendChild(statesRow);

  wrapper.appendChild(section);
}

export function renderDropdownSection(container: HTMLElement): void {
  const wrapper = createContentWrapper(container);
  const section = createSection('Dropdown');

  const options = [
    { value: 'o', label: 'O-type' },
    { value: 'b', label: 'B-type' },
    { value: 'a', label: 'A-type' },
    { value: 'f', label: 'F-type' },
    { value: 'g', label: 'G-type (Sun)' },
    { value: 'k', label: 'K-type' },
    { value: 'm', label: 'M-type' },
  ];

  const statesRow = createRow('States');
  const statesItems = getRowItems(statesRow);

  createDropdown(statesItems, {
    options,
    placeholder: 'Select spectral type...',
  });

  createDropdown(statesItems, {
    options,
    value: 'g',
  });

  createDropdown(statesItems, {
    options,
    placeholder: 'Disabled',
    disabled: true,
  });

  section.appendChild(statesRow);
  wrapper.appendChild(section);
}

export function renderHeadingSection(container: HTMLElement): void {
  const wrapper = createContentWrapper(container);
  const section = createSection('Heading');

  const levelsRow = createRow('Levels');
  const levelsItems = getRowItems(levelsRow);
  levelsItems.style.flexDirection = 'column';
  levelsItems.style.alignItems = 'flex-start';

  ([1, 2, 3, 4, 5, 6] as const).forEach((level) => {
    createHeading(levelsItems, { text: `Heading ${level}`, level });
  });
  section.appendChild(levelsRow);

  const variantsRow = createRow('Variants');
  const variantsItems = getRowItems(variantsRow);
  createHeading(variantsItems, { text: 'Default heading', level: 3 });
  createHeading(variantsItems, { text: 'Muted heading', level: 3, variant: 'muted' });
  section.appendChild(variantsRow);

  wrapper.appendChild(section);
}

export function renderIconSection(container: HTMLElement): void {
  const wrapper = createContentWrapper(container);
  const section = createSection('Icon');

  const allIcons: IconName[] = [
    'star',
    'search',
    'filter',
    'close',
    'chevron-right',
    'chevron-down',
    'info',
    'settings',
    'ruler',
    'globe',
    'sun',
    'moon',
  ];

  const iconsRow = createRow('All Icons');
  const iconsItems = getRowItems(iconsRow);
  iconsItems.style.flexWrap = 'wrap';

  allIcons.forEach((name) => {
    createIcon(iconsItems, { name, label: name });
  });
  section.appendChild(iconsRow);

  const sizesRow = createRow('Sizes');
  const sizesItems = getRowItems(sizesRow);
  createIcon(sizesItems, { name: 'star', size: 'small', label: 'small' });
  createIcon(sizesItems, { name: 'star', size: 'medium', label: 'medium' });
  createIcon(sizesItems, { name: 'star', size: 'large', label: 'large' });
  section.appendChild(sizesRow);

  wrapper.appendChild(section);
}
