import { Easing } from '@shopify/react-native-skia';
import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaPulseIndicatorPropsType = BaseIndicatorPropsType;

export const defaultProps = {
  animationEasing: Easing.out(Easing.ease),
  progressDuration: 1200,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaPulseIndicatorPropsType, OmitChildComponentProps>;
