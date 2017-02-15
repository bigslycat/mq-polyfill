// @flow

type UnitToPixelsType = (unit: string) => number;

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
    default:
      return 1;
  }
};

export default unitToPixels;
