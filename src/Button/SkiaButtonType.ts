import { Dimensions } from 'react-native';
import type { StrokeType } from '../Stroke';
import type { BackgroundType } from '../Background';
import type { ProgressType } from '../CircleProgress';
import type { TextWithImageType } from '../TextWithImage';
import type { ShadowType } from '../Shadow';

export type SkiaButtonStateType =
  | 'idle'
  | 'loading'
  | 'succeeded'
  | 'failed'
  | 'disable';

type SkiaButtonType = {
  width: number;
  height: number;
  horizontalMargin: number;
  verticalMargin: number;
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

type SkiaButtonCommonType = {
  currentState: SkiaButtonStateType;
  duration: number;
  onPress: (state: string) => void;
  progress: ProgressType;
};

export type SkiaButtonPropsType = SkiaButtonCommonType &
  (
    | { state: SkiaButtonStatePropType }
    | ({
        state?: never;
        width: number;
        height: number;
        horizontalMargin: number;
        verticalMargin: number;
        borderRadius: number;
        background: BackgroundType;
        shadow?: ShadowType;
        stroke?: StrokeType;
      } & TextWithImageType)
  );

const width: number = Dimensions.get('window').width;

export const defaultProps = {
  width: width,
  height: 45,
  borderRadius: 0,
  horizontalMargin: 0,
  verticalMargin: 0,
  currentState: 'idle',
  duration: 1000,
  onPress: () => {},
  // background: { color: '#add8e6' },
  // shadow: {
  //   lightShadow: { dx: -5, dy: -5, blur: 5, color: '#c7f8ff' },
  //   darkShadow: { dx: 5, dy: 5, blur: 5, color: '#93b8c4' },
  // },
  // text: { size: 24, label: 'Button', color: '#000000' },
  // progress: { color: ['#F44336', '#2196F3', '#009688'] },
  // stroke: { color: '#F44336', width: 3 },
  // image: {
  //   width: 24,
  //   height: 24,
  //   normalSource: require('../Image/ic_react.png'),
  // },
  // state: {
  //   idle: {
  //     width: width,
  //     height: 45,
  //     borderRadius: 0,
  //     horizontalMargin: 0,
  //     verticalMargin: 0,
  //     background: { color: '#add8e6' },
  //     text: { size: 24, label: 'Button', color: '#000000' },
  //   },
  //   loading: {},
  //   succeeded: {
  //     text: { size: 24, label: 'Button', color: '#000000' },
  //   },
  //   failed: {
  //     text: { size: 24, label: 'Button', color: '#000000' },
  //   },
  // },
};
