import type { Color, Fit, SkiaMutableValue } from '@shopify/react-native-skia';

type SourceType = ReturnType<typeof require> | string | Uint8Array;

export type TextWithImageXY = {
  textX: number;
  textY: number;
  imageX: number;
  imageY: number;
};

export type TextType = {
  size: number;
  label: string;
  color: Color;
  font?: SourceType;
};

type ImageCommonType = {
  width: number;
  height: number;
};

export type ImageType = ImageCommonType &
  (
    | { normalSource?: SourceType; svgSource?: never; fit?: Fit }
    | { normalSource?: never; svgSource?: SourceType; fit?: never }
  );

export type TextWithImageType =
  | {
      text: TextType;
      image?: never;
      imageDirection?: never;
    }
  | { text?: never; image: ImageType; imageDirection?: never }
  | {
      text: TextType;
      image: ImageType;
      imageDirection: 'left' | 'right' | 'top' | 'bottom';
    };

export type SkiaTextWithImagePropsType = {
  text?: TextType;
  width: number;
  height: number;
  opacity: SkiaMutableValue<number>;
  horizontalMargin: number;
  verticalMargin: number;
  image?: ImageType;
  imageDirection?: 'left' | 'right' | 'top' | 'bottom';
};
