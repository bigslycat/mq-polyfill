// @flow

import getMultipler from './getMultipler';

import type {
  ContextType,
  EvalQueryType,
} from './types';

type ReplacerType = ($0: string, $1: string, $2: string) => string;
type CreateEvalQueryType = (context: ContextType) => EvalQueryType;

const replaceUnit: ReplacerType = ($0, $1, $2) => String(+$1 * getMultipler($2));

const evalQuery: CreateEvalQueryType = context =>
  (rawQuery = 'true') => {
    const query = rawQuery
      .replace(/^only\s+/, '')
      .replace(/(device)-([\w.]+)/g, '$1.$2')
      .replace(/([\w.]+)\s*:/g, 'media.$1 ===')
      .replace(/min-([\w.]+)\s*===/g, '$1 >=')
      .replace(/max-([\w.]+)\s*===/g, '$1 <=')
      .replace(/all|screen/g, '1')
      .replace(/print/g, '0')
      .replace(/,/g, '||')
      .replace(/\band\b/g, '&&')
      .replace(/dpi/g, '')
      .replace(/(\d+)(cm|em|in|dppx|mm|pc|pt|px|rem)/g, replaceUnit);

    const funcBody = 'try{ return !!(%s) }catch(e){ return false }'.replace('%s', query);

    // eslint-disable-next-line no-new-func
    return !!new Function('media', funcBody)({
      width: context.innerWidth,
      height: context.innerHeight,
      orientation: context.orientation || 'landscape',
      device: {
        width: context.screen.width,
        height: context.screen.height,
        orientation: context.screen.orientation || context.orientation || 'landscape',
      },
    });
  };

export default evalQuery;
