// @flow

import MediaQueryList from './MediaQueryList';

import type {
  EvalQueryType,
  MatchMediaType,
  AddRemoveListenerType,
} from './types';

type CreateMatchMediaType = (props: {
  evalQuery: EvalQueryType,
  addListener: AddRemoveListenerType,
  removeListener: AddRemoveListenerType,
}) => MatchMediaType;

const matchMedia: CreateMatchMediaType = ({
  evalQuery,
  addListener,
  removeListener,
}) =>
  (media) => {
    const mqList = Object.create(MediaQueryList.prototype, {
      media: { enumerable: true, value: media },
      matches: { enumerable: true, configurable: true, value: evalQuery(media) },
      addListener: { value: addListener },
      removeListener: { value: removeListener },
      addEventListener: { value: (type, listener) => addListener(listener) },
      removeEventListener: { value: (type, listener) => removeListener(listener) },
    });

    return mqList;
  };

export default matchMedia;
