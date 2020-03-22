# mq-polyfill

[CSSOM](https://drafts.csswg.org/cssom-view/#dom-window-matchmedia)-valid and
[jsdom](https://github.com/tmpvar/jsdom)/[Jest](https://facebook.github.io/jest/)-compatible
[matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) polyfill
for server-side unit tests.

## Install

```bash
npm install --save-dev mq-polyfill
```

## Usage

```javascript
import { jsdom } from 'jsdom';
import matchMediaPolyfill from 'mq-polyfill';
import { resizeTo } from 'window-resizeto';

const window = jsdom().defaultView;

/**
 * Define the window.matchMedia
 */
matchMediaPolyfill(window);

window
  .matchMedia('(min-width: 920px)') // Create MediaQueryList instance
  .addListener(console.log);        // Subscribe to MQ mode changes

/**
 * For dispatching resize event
 * we must implement window.resizeTo in jsdom
 */
window.resizeTo = function (width, height) {
  resizeTo(this, width, height);
}

window.resizeTo(800, 600);
// console.log() output:
// MediaQueryList { media: '(min-width: 920px)', matches: false }

window.resizeTo(720, 480);
// Do nothing (MQ mode heven't changed)

window.resizeTo(1024, 768);
// console.log() output:
// MediaQueryList { media: '(min-width: 920px)', matches: true }
```
