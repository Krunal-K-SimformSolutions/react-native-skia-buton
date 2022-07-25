import { TileMode, vec } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
// Gradient ->
// Gradient -> Type, angle, colors, positions
//     Radial -> radius
// background -> Color
// corder -> radius, topLeft, Right, bottomLeft, Right
// Image -> tint color
// anim -> duration
// stroke -> width, color, dash width, gap

// type StrokeType = { width?: number, color?: string, dashWidth?: number, dashGap?: number }
// type AnimType = { duration?: number }
// type ImageType = { color?: string, width?: number, height?: number } & ({ normalSource?: string, svgSource?: never } | { normalSource?: never, svgSource?: string })
// type GradientName = { gradientName?: string }

type GradientCommonType = {
  colors: string[];
  positions: number[];
  mode: TileMode;
};
type LinearGradientType = GradientCommonType & {
  type: 'linear';
  start: [number, number];
  end: [number, number];
};
type RadialGradientType = GradientCommonType & {
  type: 'radial';
  center: [number, number];
  radius: number;
};
type ConicalGradientType = GradientCommonType & {
  type: 'conical';
  start: [number, number];
  startRadius: number;
  end: [number, number];
  endRadius: number;
};
type SweepGradientType = GradientCommonType & {
  type: 'sweep';
  center: [number, number];
  startAngle: number;
  endAngle: number;
};
type GradientType =
  | LinearGradientType
  | RadialGradientType
  | ConicalGradientType
  | SweepGradientType;

type BackgroundType =
  | { color: string; gradient?: never }
  | { color?: never; gradient: GradientType };
type Shadow = { dx: number; dy: number; blur: number; color: string };
type ShadowType = { lightShadow: Shadow; darkShadow: Shadow };
type TextType = { fontSize: number; label: string; color: string };
type ProgressType = { color: string | string[] };

export type SkiaButtonPropsType = {
  width: number;
  height: number;
  borderRadius: number;
  loading: boolean;
  onPress: () => void;
  background: BackgroundType;
  shadow?: ShadowType;
  text: TextType;
  progress: ProgressType;
};

const width = Dimensions.get('window').width;

export const defaultProps: SkiaButtonPropsType = {
  width: width,
  height: 45,
  borderRadius: 5,
  loading: false,
  onPress: () => {},
  background: { color: '#add8e6' },
  shadow: {
    lightShadow: { dx: -5, dy: -5, blur: 5, color: '#93b8c4' },
    darkShadow: { dx: 5, dy: 5, blur: 5, color: '#c7f8ff' },
  },
  text: { fontSize: 24, label: 'Button', color: '#000000' },
  progress: { color: ['#F44336', '#2196F3', '#009688'] },
};
