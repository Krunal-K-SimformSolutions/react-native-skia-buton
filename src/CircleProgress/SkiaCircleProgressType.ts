import type { Color, SkiaMutableValue } from '@shopify/react-native-skia';
import type { ButtonType } from '../Button';

export type ProgressType = { color: Color | Color[] };

export type SkiaCircleProgressPropsType = ButtonType &
  ProgressType & {
    width: number;
    height: number;
    loading: boolean;
    opacity: SkiaMutableValue<number>;
  };
