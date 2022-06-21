import { Dashboard } from './Dashboard';
import { Game } from '@src/Game';

export default [
  { path: '/', component: Dashboard, icon: 'home', label: 'Home' },
  { path: '/game', component: Game, icon: 'th', label: 'Game' }
];
