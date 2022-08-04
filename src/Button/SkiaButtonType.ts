import { Dimensions } from 'react-native';
import type { StrokeType } from '../Stroke';
import type { BackgroundType } from '../Background';
import type { TextWithImageType } from '../TextWithImage';
import type { ShadowType } from '../Shadow';
import type { SkiaIndicatorType } from '../Indicator';

export type SkiaButtonStateType =
  | 'idle'
  | 'loading'
  | 'succeeded'
  | 'failed'
  | 'disable';

type SkiaButtonType = {
  width: number;
  height: number;
  borderRadius: number;
  background: BackgroundType;
  shadow?: ShadowType;
  stroke?: StrokeType;
};

type SkiaButtonSizeType = {
  isRevetSize: boolean;
};

type SkiaButtonStatePropType = {
  idle: SkiaButtonType & TextWithImageType;
  disable?: SkiaButtonType & TextWithImageType;
  loading?: Partial<SkiaButtonType>;
  succeeded?: Partial<SkiaButtonType> & TextWithImageType & SkiaButtonSizeType;
  failed?: Partial<SkiaButtonType> & TextWithImageType & SkiaButtonSizeType;
};

export type SkiaButtonAnimType = {
  duration: number;
  width?: number;
  height?: number;
  borderRadius?: number;
};

type SkiaButtonCommonType = {
  currentState: SkiaButtonStateType;
  onPress: (state: string) => void;
  anim?: SkiaButtonAnimType;
  progress: SkiaIndicatorType;
};

export type SkiaButtonPropsType = SkiaButtonCommonType &
  (
    | { state: SkiaButtonStatePropType }
    | ({
        state?: never;
        width: number;
        height: number;
        borderRadius: number;
        background: BackgroundType;
        shadow?: ShadowType;
        stroke?: StrokeType;
      } & TextWithImageType)
  );

const width: number = Dimensions.get('window').width;

export const defaultProps = {
  width: width - 40,
  height: 50,
  borderRadius: 0,
  currentState: 'idle',
  anim: { duration: 1200 },
  onPress: () => {},
};

export type AnimRRectValueArgsType = {
  animCurrentProgress: number;
  width: number;
  height: number;
  borderRadius: number;
  animWidth: number;
  animHeight: number;
  animBorderRadius: number;
  strokeWidth: number;
  isDashed: boolean;
  isShadow: boolean;
};
