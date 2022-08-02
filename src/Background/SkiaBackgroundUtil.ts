import type {
  GetStartAndEndReturnType,
  GradientDataType,
} from './SkiaBackgroundType';

const toRadians = (angle: number): number => {
  return (angle * Math.PI) / 180;
};

export const getStartAndEnd = (
  angle: number,
  width: number,
  height: number
): GetStartAndEndReturnType => {
  const radians: number = toRadians(angle);
  const hyp = Math.sqrt(width * width + height * height);

  let startX = 0;
  let startY = 0;
  let endX = Math.cos(radians) * hyp;
  let endY = Math.sin(radians) * hyp;

  if (endX < 0) {
    startX = width;
    endX = width + endX;
  }
  if (endY < 0) {
    startY = height;
    endY = height + endY;
  }
  return {
    start: [startX, startY],
    end: [endX, endY],
  };
};

export const getGradientFromName = (
  gradientName?: string | null
): GradientDataType | null => {
  if (
    gradientName !== null &&
    gradientName !== undefined &&
    gradientName !== ''
  ) {
    const gradientJson = require('./GradientData.json');
    const gradientObject = gradientJson.filter(
      (item: GradientDataType) =>
        item.name.trim().toLowerCase() === gradientName.trim().toLowerCase()
    );
    if (gradientObject.length > 0) {
      return gradientObject[0];
    }
  }
  return null;
};
