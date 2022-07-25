import type { Fit, SkiaMutableValue } from '@shopify/react-native-skia';
import type { ButtonType } from '../Button';

type ImageCommonType = {
  width: number;
  height: number;
  x?: number;
  y?: number;
};

export type ImageType = ImageCommonType &
  (
    | { normalSource?: ReturnType<typeof require> | string | Uint8Array; svgSource?: never; fit?: Fit }
    | { normalSource?: never; svgSource?: ReturnType<typeof require> | string | Uint8Array; fit?: never }
  );

export type SkiaImagePropsType = ButtonType & {
  width: number;
  height: number;
  imageWidth: number;
  imageHeight: number;
  x?: number;
  y?: number;
  fit: Fit;
  normalSource?: ReturnType<typeof require> | string | Uint8Array;
  svgSource?: ReturnType<typeof require> | string | Uint8Array;
  opacity: SkiaMutableValue<number>;
};
