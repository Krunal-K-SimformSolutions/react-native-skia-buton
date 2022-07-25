import type {
  Color,
  SkiaMutableValue,
  SkRRect,
} from '@shopify/react-native-skia';

type Shadow = { dx: number; dy: number; blur: number; color: Color };

export type ShadowType = { lightShadow: Shadow; darkShadow: Shadow };

export type SkiaShadowPropsType = {
  animRRect: SkiaMutableValue<SkRRect>;
  isPressed: boolean;
  darkShadow?: Shadow;
  lightShadow?: Shadow;
};
