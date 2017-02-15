// @flow

import unitToPixels from './unitToPixels';
import type { UnitType } from './unitToPixels';

type UnitsReplaceType = ($0: string, $1: string, $2: UnitType) => string;
type CompileQueryType = (rawQuery: string) => string;

const unitsReplace: UnitsReplaceType = ($0, $1, $2) => String(+$1 * unitToPixels($2));

const compileQuery: CompileQueryType = rawQuery =>
  'try { return !!(%s) } catch(e) { return false }'
    .replace('%s', rawQuery.split(/\s*,\s*/g).map(
      part => part
        .replace(/^\s*only\s+/, '')
        .replace(/^\s*not\s*(.+)/, '!($1)')
        .replace(/(?:min-)([\w.]+)\s*:\s*/g, 'media.$1 >= ')
        .replace(/(?:max-)([\w.]+)\s*:\s*/g, 'media.$1 <= ')
        .replace(/([\w.]+)\s*:\s*/g, 'media.$1 === ')
        .replace(/\s*all|screen\s*/g, 'true')
        .replace(/\s*print\s*/g, 'false')
        .replace(/[\s()]+or[\s()]+/g, ' || ')
        .replace(/\s*and\s*/g, ' && ')
        .replace(/dpi/g, '')
        .replace(/(\d+)(cm|em|in|dppx|mm|pc|pt|px|rem)/g, unitsReplace)
        .replace(/^(.*)$/, '($1)'),
    ).join(' || '));

export default compileQuery;
