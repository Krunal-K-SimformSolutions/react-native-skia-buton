import type { Color, TouchHandler } from '@shopify/react-native-skia';
import type { StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../Constant';
import type { SkiaBallIndicatorPropsType } from './Ball';
import type { SkiaBarIndicatorPropsType } from './Bar';
import type { BaseIndicatorPropsType } from './Base';
import type { SkiaBreathingIndicatorPropsType } from './Breathing';
import type { SkiaCircleIndicatorPropsType } from './Circle';
import type { SkiaDotIndicatorPropsType } from './Dot';
import type { SkiaMaterialIndicatorPropsType } from './Material';
import type { SkiaPacmanIndicatorPropsType } from './Pacman';
import type { SkiaPulseIndicatorPropsType } from './Pulse';
import type { SkiaRotationCircleIndicatorPropsType } from './RotationCircle';
import type { SkiaRotationHoleIndicatorPropsType } from './RotationHole';
import type { SkiaSkypeIndicatorPropsType } from './Skype';
import type { SkiaUIActivityIndicatorPropsType } from './UIActivity';
import type { SkiaWaveIndicatorPropsType } from './Wave';

type OmitBaseProps =
  | 'animationEasing'
  | 'animating'
  | 'width'
  | 'height'
  | 'borderRadius'
  | 'opacity'
  | 'color'
  | 'progressDuration';

type BallIndicatorType = {
  type: 'Ball';
} & Omit<SkiaBallIndicatorPropsType, OmitBaseProps>;

type BarIndicatorType = {
  type: 'Bar';
} & Omit<SkiaBarIndicatorPropsType, OmitBaseProps>;

type CircleIndicatorType = {
  type: 'Circle';
} & Omit<SkiaCircleIndicatorPropsType, OmitBaseProps>;

type DotIndicatorType = {
  type: 'Dot';
} & Omit<SkiaDotIndicatorPropsType, OmitBaseProps>;

type MaterialIndicatorType = {
  type: 'Material';
} & Omit<SkiaMaterialIndicatorPropsType, OmitBaseProps>;

type PacmanIndicatorType = {
  type: 'Pacman';
} & Omit<SkiaPacmanIndicatorPropsType, OmitBaseProps>;

type PulseIndicatorType = {
  type: 'Pulse';
} & Omit<SkiaPulseIndicatorPropsType, OmitBaseProps>;

type SkypeIndicatorType = {
  type: 'Skype';
} & Omit<SkiaSkypeIndicatorPropsType, OmitBaseProps>;

type UIActivityIndicatorType = {
  type: 'UIActivity';
} & Omit<SkiaUIActivityIndicatorPropsType, OmitBaseProps>;

type WaveIndicatorType = {
  type: 'Wave';
} & Omit<SkiaWaveIndicatorPropsType, OmitBaseProps>;

type BreathingIndicatorType = {
  type: 'Breathing';
} & Omit<SkiaBreathingIndicatorPropsType, OmitBaseProps>;

type RotationHoleIndicatorType = {
  type: 'RotationHole';
} & Omit<SkiaRotationHoleIndicatorPropsType, OmitBaseProps>;

type RotationCircleIndicatorType = {
  type: 'RotationCircle';
} & Omit<SkiaRotationCircleIndicatorPropsType, OmitBaseProps>;

export type SkiaIndicatorPropsType = {
  style?: StyleProp<ViewStyle>;
  onTouch?: TouchHandler;
  isShadow?: boolean;
} & BaseIndicatorPropsType &
  (
    | BallIndicatorType
    | BarIndicatorType
    | CircleIndicatorType
    | DotIndicatorType
    | MaterialIndicatorType
    | PacmanIndicatorType
    | PulseIndicatorType
    | SkypeIndicatorType
    | UIActivityIndicatorType
    | WaveIndicatorType
    | BreathingIndicatorType
    | RotationHoleIndicatorType
    | RotationCircleIndicatorType
  );

export type SkiaIndicatorType = {
  color: Color;
  progressDuration?: number;
} & (
  | BallIndicatorType
  | BarIndicatorType
  | CircleIndicatorType
  | DotIndicatorType
  | MaterialIndicatorType
  | PacmanIndicatorType
  | PulseIndicatorType
  | SkypeIndicatorType
  | UIActivityIndicatorType
  | WaveIndicatorType
);

export const defaultProps = {
  color: Colors.redVelvet,
};
