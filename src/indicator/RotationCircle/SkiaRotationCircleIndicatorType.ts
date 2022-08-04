import type { Color } from '@shopify/react-native-skia';
import { Colors } from '../../Constant';
import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaRotationCircleIndicatorPropsType = BaseIndicatorPropsType & {
  circleColor?: Color;
  direction?: 'clockwise' | 'counter-clockwise';
};

export const defaultProps = {
  circleColor: Colors.redVelvet,
  direction: 'counter-clockwise',
  progressDuration: 8000,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaRotationCircleIndicatorPropsType, OmitChildComponentProps>;
