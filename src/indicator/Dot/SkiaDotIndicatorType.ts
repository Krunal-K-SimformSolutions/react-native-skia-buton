import { Easing } from '@shopify/react-native-skia';
import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaDotIndicatorPropsType = BaseIndicatorPropsType & {
  count?: number;
  reverse?: boolean;
};

export const defaultProps = {
  count: 3,
  reverse: false,
  progressDuration: 1200,
  animationEasing: Easing.inOut(Easing.ease),
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaDotIndicatorPropsType, OmitChildComponentProps>;