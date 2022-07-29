import { interpolate, rect, rrect, SkRRect } from '@shopify/react-native-skia';

export const isNotEmpty = (value?: number): boolean => {
  return value !== null && value !== undefined && value > 0;
};

export const animRRectValue = (
  animCurrentProgress: number,
  width: number,
  height: number,
  radius: number,
  horizontalMargin: number,
  verticalMargin: number,
  strokeWidth: number,
  isDashed: boolean
): SkRRect => {
  const newHeight: number = height + 2 * verticalMargin;
  const newWidth: number = width + 2 * horizontalMargin;
  const animSize = Math.min(newWidth, newHeight) - 5;
  const stroke: number = isDashed ? strokeWidth / 2 : 0;
  const strokeDouble: number = 2 * stroke;
  const radiusOutput: [number, number] = [radius, animSize / 2];

  return rrect(
    rect(
      interpolate(
        animCurrentProgress,
        [0, 1],
        [horizontalMargin + stroke, newWidth / 2 - animSize / 2 + stroke]
      ),
      interpolate(
        animCurrentProgress,
        [0, 1],
        [verticalMargin + stroke, newHeight / 2 - animSize / 2 + stroke]
      ),
      interpolate(
        animCurrentProgress,
        [0, 1],
        [width - strokeDouble, animSize - strokeDouble]
      ),
      interpolate(
        animCurrentProgress,
        [0, 1],
        [height - strokeDouble, animSize - strokeDouble]
      )
    ),
    interpolate(animCurrentProgress, [0, 1], radiusOutput),
    interpolate(animCurrentProgress, [0, 1], radiusOutput)
  );
};
