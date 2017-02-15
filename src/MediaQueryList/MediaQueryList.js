// @flow

import type { ListenerType } from '../types';

export default class MediaQueryList {
  constructor() {
    throw new TypeError('Illegal constructor.');
  }

  get media(): void {
    throw new TypeError(
      "'get media' called on an object that does not implement interface MediaQueryList.",
    );
  }

  get matches(): void {
    throw new TypeError(
      "'get matches' called on an object that does not implement interface MediaQueryList.",
    );
  }

  addListener() {
    throw new TypeError(
      "'addListener' called on an object that does not implement interface MediaQueryList.",
    );
  }

  removeListener() {
    throw new TypeError(
      "'removeListener' called on an object that does not implement interface MediaQueryList.",
    );
  }

  media: string;
  matches: boolean;
  addListener: (listener: ListenerType) => void;
  removeListener: (listener: ListenerType) => void;
}
