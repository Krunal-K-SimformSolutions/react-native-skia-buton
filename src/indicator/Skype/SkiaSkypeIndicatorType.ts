import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaSkypeIndicatorPropsType = BaseIndicatorPropsType & {
  count?: number;
  minScale?: number;
  maxScale?: number;
};

export const defaultProps = {
  count: 5,
  minScale: 0.2,
  maxScale: 1.0,
  progressDuration: 1600,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaSkypeIndicatorPropsType, OmitChildComponentProps>;
