import type { Color, SkiaMutableValue } from '@shopify/react-native-skia';

export type ProgressType = { color: Color | Color[] };

export type SkiaCircleProgressPropsType = ProgressType & {
  width: number;
  height: number;
  horizontalMargin: number;
  verticalMargin: number;
  loading: boolean;
  opacity: SkiaMutableValue<number>;
};
