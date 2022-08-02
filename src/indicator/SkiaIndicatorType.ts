import { Easing } from '@shopify/react-native-skia';

export type SkiaIndicatorPropsType = {
  amimationEasing: Easing;
  animationDuration: number;
  hideAnimationDuration: number;

  animating: boolean;
  interaction: boolean;
  hidesWhenStopped: boolean;

  renderComponent: () => JSX.Element;
  count: number;
};

export const defaultProps = {
  animationEasing: Easing.linear,
  animationDuration: 1200,
  hideAnimationDuration: 200,

  animating: true,
  interaction: true,
  hidesWhenStopped: true,

  count: 1,
};
