// @flow

import compileQuery from './compileQuery';

import type {
  ContextType,
  EvalQueryType,
} from '../types';

type CreateEvalQueryType = (context: ContextType) => EvalQueryType;

const evalQuery: CreateEvalQueryType = context =>
  rawQuery => !!(
    // eslint-disable-next-line no-new-func
    new Function('media', compileQuery(rawQuery))({
      width: context.innerWidth,
      height: context.innerHeight,
      orientation: context.screen.orientation ?
        context.screen.orientation.type.replace(/^(landscape|portrait).*$/, '$1') :
        'landscape',
    })
  );

export default evalQuery;
