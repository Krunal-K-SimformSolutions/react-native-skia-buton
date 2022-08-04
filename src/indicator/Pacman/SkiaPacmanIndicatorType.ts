import type {
  BaseIndicatorPropsType,
  OmitChildComponentProps,
  RenderComponentArgType,
} from '../Base';

export type SkiaPacmanIndicatorPropsType = BaseIndicatorPropsType;

export const defaultProps = {
  progressDuration: 600,
};

export type RenderIndicatorPropsType = RenderComponentArgType &
  Omit<SkiaPacmanIndicatorPropsType, OmitChildComponentProps>;
