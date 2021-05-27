import GemPuzzle from './modules/gem-puzzle';
import Settings from './modules/settings';

document.addEventListener('DOMContentLoaded', () => {
  new GemPuzzle().init();
  new Settings().init();
});
