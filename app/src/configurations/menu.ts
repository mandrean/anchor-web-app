import { ancUstLpPathname } from 'pages/trade/env';

export interface RouteMenu {
  to: string;
  exact?: boolean;
  title: string;
}

export const menus: RouteMenu[] = [
  {
    to: `/${ancUstLpPathname}`,
    title: 'ANC-UST LP',
  },
  {
    to: `/claim/${ancUstLpPathname}`,
    title: 'CLAIM',
  },
];
