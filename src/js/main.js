import GemPuzzle from './modules/gem-puzzle';
import Settings from './modules/settings';
import LeaderBoard from './modules/leaderboard';

document.addEventListener('DOMContentLoaded', () => {
  new GemPuzzle().init();
  new Settings().init();
  new LeaderBoard().init();
});
