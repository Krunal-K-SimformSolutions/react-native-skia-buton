import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaMaterialIndicatorPropsType = BaseIndicatorPropsType & {
  trackWidth?: number;
  direction?: 'clockwise' | 'counter-clockwise';
};

export const defaultProps = {
  direction: 'counter-clockwise',
  progressDuration: 40000,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaMaterialIndicatorPropsType, OmitChildComponentProps>;
