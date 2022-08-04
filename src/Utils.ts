import { Skia, SkPath } from '@shopify/react-native-skia';

export const roundedRect = (
  width: number,
  height: number,
  left: number,
  top: number,
  right: number,
  bottom: number,
  topLeftRadius: number,
  topRightRadius: number,
  bottomLeftRadius: number,
  bottomRightRadius: number
): SkPath => {
  const path: SkPath = Skia.Path.Make();
  const maxSize: number = Math.min(width / 2, height / 2);

  let topLeftRadiusAbs: number = Math.abs(topLeftRadius);
  let topRightRadiusAbs: number = Math.abs(topRightRadius);
  let bottomLeftRadiusAbs: number = Math.abs(bottomLeftRadius);
  let bottomRightRadiusAbs: number = Math.abs(bottomRightRadius);

  if (topLeftRadiusAbs > maxSize) {
    topLeftRadiusAbs = maxSize;
  }
  if (topRightRadiusAbs > maxSize) {
    topRightRadiusAbs = maxSize;
  }
  if (bottomLeftRadiusAbs > maxSize) {
    bottomLeftRadiusAbs = maxSize;
  }
  if (bottomRightRadiusAbs > maxSize) {
    bottomRightRadiusAbs = maxSize;
  }

  path.moveTo(left + topLeftRadiusAbs, top);
  path.lineTo(right - topRightRadiusAbs, top);

  path.quadTo(right, top, right, top + topRightRadiusAbs);
  path.lineTo(right, bottom - bottomRightRadiusAbs);

  path.quadTo(right, bottom, right - bottomRightRadiusAbs, bottom);
  path.lineTo(left + bottomLeftRadiusAbs, bottom);

  path.quadTo(left, bottom, left, bottom - bottomLeftRadiusAbs);
  path.lineTo(left, top + topLeftRadiusAbs);

  path.quadTo(left, top, left + topLeftRadiusAbs, top);
  path.close();

  return path;
};
