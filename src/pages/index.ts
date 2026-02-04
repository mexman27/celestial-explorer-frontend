import type { PageDefinition } from '@/engine/page/types';
import { explorerPage } from './explorer';
import {
  portfolioPage,
  renderPortfolioSidebar,
  renderButtonSection,
  renderCardSection,
  renderInputSection,
  renderDropdownSection,
  renderHeadingSection,
  renderIconSection,
} from './portfolio';

export const pages: Record<string, PageDefinition> = {
  '#/': explorerPage,
  '#/portfolio': portfolioPage,
  '#/portfolio/button': portfolioPage,
  '#/portfolio/card': portfolioPage,
  '#/portfolio/input': portfolioPage,
  '#/portfolio/dropdown': portfolioPage,
  '#/portfolio/heading': portfolioPage,
  '#/portfolio/icon': portfolioPage,
};

export const pageRenderers: Record<string, {
  content?: (container: HTMLElement) => void;
  sidebar?: (container: HTMLElement) => void;
}> = {
  '#/portfolio': {
    sidebar: renderPortfolioSidebar,
  },
  '#/portfolio/button': {
    content: renderButtonSection,
    sidebar: renderPortfolioSidebar,
  },
  '#/portfolio/card': {
    content: renderCardSection,
    sidebar: renderPortfolioSidebar,
  },
  '#/portfolio/input': {
    content: renderInputSection,
    sidebar: renderPortfolioSidebar,
  },
  '#/portfolio/dropdown': {
    content: renderDropdownSection,
    sidebar: renderPortfolioSidebar,
  },
  '#/portfolio/heading': {
    content: renderHeadingSection,
    sidebar: renderPortfolioSidebar,
  },
  '#/portfolio/icon': {
    content: renderIconSection,
    sidebar: renderPortfolioSidebar,
  },
};

export { explorerPage, portfolioPage };
