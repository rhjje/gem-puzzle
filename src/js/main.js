import GemPuzzle from './modules/gem-puzzle';
import resumeGame from './modules/resume-game';
import Setting from './modules/settings';

document.addEventListener('DOMContentLoaded', () => {
  new GemPuzzle().init();
  resumeGame();
  new Setting().init();
});
