import { home } from '@/pages/home';
import { HeaderRegion } from '@/components/header/header';
import { SidebarRegion } from '@/components/sidebar/sidebar';
import { VisualizationRegion } from '@/components/visualization/visualization';

export function main(container: HTMLElement): void {
  const regionHeader = new HeaderRegion(container);
  const regionSidebar = new SidebarRegion(container);
  const regionVisualization = new VisualizationRegion(container);

  regionHeader.update(home.header);
  regionSidebar.update(home.sidebar);
  regionVisualization.update(home.visualization);
}
