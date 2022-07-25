import type { Color, SkiaMutableValue } from '@shopify/react-native-skia';
import type { ButtonType } from '../Button';

export type TextType = {
  size: number;
  label: string;
  color: Color;
  font?: ReturnType<typeof require> | string | Uint8Array;
};

export type SkiaTextPropsType = ButtonType &
  TextType & {
    scale: number;
    width: number;
    height: number;
    opacity: SkiaMutableValue<number>;
  };
