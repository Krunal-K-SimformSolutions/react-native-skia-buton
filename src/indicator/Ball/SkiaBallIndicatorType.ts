import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaBallIndicatorPropsType = BaseIndicatorPropsType & {
  count?: number;
};

export const defaultProps = {
  count: 8,
  progressDuration: 1200,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaBallIndicatorPropsType, OmitChildComponentProps>;
