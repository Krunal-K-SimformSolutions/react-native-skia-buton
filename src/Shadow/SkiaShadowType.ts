import type {
  Color,
  SkiaMutableValue,
  SkRRect,
} from '@shopify/react-native-skia';
import type { GradientNameType, GradientType } from '../Background';

type Shadow = { dx: number; dy: number; blur: number; color: Color };

export type ShadowType = { lightShadow: Shadow; darkShadow: Shadow };

export type SkiaShadowPropsType = {
  width: number;
  height: number;
  color?: Color;
  gradient?: GradientType;
  gradientName?: GradientNameType;
  box: SkiaMutableValue<SkRRect>;

  isPressed: boolean;
  darkShadow?: Shadow;
  lightShadow?: Shadow;
};
