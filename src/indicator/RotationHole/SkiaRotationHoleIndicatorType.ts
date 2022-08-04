import type { Color } from '@shopify/react-native-skia';
import { Colors } from '../../Constant';
import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaRotationHoleIndicatorPropsType = BaseIndicatorPropsType & {
  trackWidth?: number;
  circleColor?: Color;
  direction?: 'clockwise' | 'counter-clockwise';
};

export const defaultProps = {
  trackWidth: 8,
  circleColor: Colors.redVelvet,
  direction: 'counter-clockwise',
  progressDuration: 8000,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaRotationHoleIndicatorPropsType, OmitChildComponentProps>;
