import type { Color } from '@shopify/react-native-skia';
import type { BackgroundType, GradientNameType, GradientType } from '../Background';

type StrokeCommonType = { width: number; dashWidth?: number; dashGap?: number };

export type StrokeType = StrokeCommonType & BackgroundType;

export type SkiaStrokePropsType = {
  width: number;
  height: number;
  strokeWidth: number;
  dashWidth?: number;
  dashGap?: number;
  color?: Color;
  gradient?: GradientType;
  gradientName?: GradientNameType
  isDashed: boolean;
};
