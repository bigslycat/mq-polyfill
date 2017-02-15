// @flow

import compileQuery from './compileQuery';

import type {
  ContextType,
  EvalQueryType,
} from './types';

type CreateEvalQueryType = (context: ContextType) => EvalQueryType;

const evalQuery: CreateEvalQueryType = ({
  innerWidth: width,
  innerHeight: height,
  screen: { orientation },
}) =>
  rawQuery =>
    // eslint-disable-next-line no-new-func
    !!new Function('media', compileQuery(rawQuery))({
      width,
      height,
      orientation: orientation ?
        orientation.type.replace(/^(landscape|portrait).*$/, '$1') :
        'landscape',
    });

export default evalQuery;
