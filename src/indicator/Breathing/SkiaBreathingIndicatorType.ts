import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaBreathingIndicatorPropsType = BaseIndicatorPropsType & {
  trackWidth?: number;
};

export const defaultProps = {
  progressDuration: 1600,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaBreathingIndicatorPropsType, OmitChildComponentProps>;
