import { finder } from '@medv/finder';
import querySelectorAllWithHas from '~core/polyfill-css-has';
import type { PlasmoContentScript } from 'plasmo';

export const config: PlasmoContentScript = {
  matches: ['https://*.twitter.com/*'],
  all_frames: true,
};

addEventListener('load', () => {
  let isPressingQ = false; // 任意のキーコンビネーションをやるため。(shiftやctrlとかだったらEventに含まれてるんだけどね......)
  document.addEventListener('keydown', (e) => isPressingQ = e.key === 'q');
  document.addEventListener('keyup', () => isPressingQ = false);

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement)) {
      console.log('not HTMLELEMENT!', e);
      return;
    }

    if (!isPressingQ || e.target.tagName !== 'IMG') return;
    e.stopPropagation();
    e.preventDefault();

    const clickedElSelector = finder(e.target);
    const tweetSelector = `article:has(${clickedElSelector})`;
    const tweet = querySelectorAllWithHas(tweetSelector);

    console.log(isPressingQ);
    console.log(e);
    console.log(e.target);
    console.log(tweetSelector);
    console.log(tweet);
  }, true);

  console.log('content script loaded');
});
