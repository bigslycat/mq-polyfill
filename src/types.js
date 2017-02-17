// @flow

import MediaQueryList from './MediaQueryList';

export type MatchMediaType = (media: string) => MediaQueryList;

export type ContextType = {

  innerWidth: number,
  innerHeight: number,

  screen: Screen,

  addEventListener: (eventName: string, cb: () => void) => void,
  MediaQueryList?: Class<MediaQueryList>,
  matchMedia?: MatchMediaType,

  resizeTo: (width: number, height: number) => void,
  resizeBy: (width: number, height: number) => void,
};

export type EvalQueryType = (rawQuery: string) => boolean;

export type ListenerType = (mq: MediaQueryList) => void;

export type ListenersType = Map<MediaQueryList, ListenerType[]>;
export type AddRemoveListenerType = (listener: ListenerType) => void;
