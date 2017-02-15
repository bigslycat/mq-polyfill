// @flow

export type UnitType = 'cm' | 'em' | 'rem' | 'in' | 'dppx' | 'mm' | 'pc' | 'pt' | 'px';
type UnitToPixelsType = (unit: UnitType) => number;

const unitToPixels: UnitToPixelsType = (unit) => {
  switch (unit) {
    case 'cm':
      return 0.3937 * 96;
    case 'em':
    case 'rem':
      return 16;
    case 'in':
    case 'dppx':
      return 96;
    case 'mm':
      return (0.3937 * 96) / 10;
    case 'pc':
      return (12 * 96) / 72;
    case 'pt':
      return 96 / 72;
    case 'px':
    default:
      return 1;
  }
};

export default unitToPixels;
