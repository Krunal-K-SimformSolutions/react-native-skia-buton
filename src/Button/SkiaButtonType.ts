import { Dimensions } from 'react-native';
import type { StrokeType } from '../Stroke';
import type { BackgroundType } from '../Background';
import type { ProgressType } from '../CircleProgress';
import type { TextWithImageType } from '../TextWithImage';
import type { ShadowType } from '../Shadow';

export type ButtonType = {
  horizontalMargin: number;
  verticalMargin: number;
};

export type SkiaButtonPropsType = ButtonType & {
  width: number;
  height: number;
  borderRadius: number;
  loading: boolean;
  duration: number;
  onPress: () => void;
  background: BackgroundType;
  shadow?: ShadowType;
  progress: ProgressType;
  stroke?: StrokeType;
} & TextWithImageType;

const width: number = Dimensions.get('window').width;

export const defaultProps = {
  width: width,
  height: 45,
  borderRadius: 0,
  horizontalMargin: 0,
  verticalMargin: 0,
  loading: false,
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
};
