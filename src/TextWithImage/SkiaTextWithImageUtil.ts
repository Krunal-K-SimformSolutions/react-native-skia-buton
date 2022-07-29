import type { SkFont } from '@shopify/react-native-skia';
import type {
  ImageType,
  TextType,
  TextWithImageXY,
} from './SkiaTextWithImageType';

export const getTextWithImageXY = (
  height: number,
  width: number,
  verticalMargin: number,
  horizontalMargin: number,
  fontFamily: SkFont | null,
  text?: TextType,
  image?: ImageType,
  imageDirection?: 'left' | 'right' | 'top' | 'bottom'
): TextWithImageXY => {
  const newHeight: number = height + 2 * verticalMargin;
  const newWidth: number = width + 2 * horizontalMargin;

  const textWidth: number =
    fontFamily === null ? 0 : fontFamily.getTextWidth(text?.label ?? '');
  const textHeight: number = (text?.size ?? 0) / 3;
  const imageWidth: number = image?.width ?? 0;
  const imageHeight: number = image?.height ?? 0;
  const betweenSpace: number = 5;
  const totalTextImageWith = textWidth + imageWidth + betweenSpace;
  const totalTextImageHeight = textHeight + imageHeight + betweenSpace;

  let textX: number = 0;
  let imageX: number = 0;
  let textY: number = 0;
  let imageY: number = 0;

  switch (imageDirection) {
    case 'left':
      let cx: number = newWidth / 2 - totalTextImageWith / 2;
      imageX = cx - betweenSpace - betweenSpace / 2;
      imageY = newHeight / 2 - imageHeight / 2;
      textX = imageX + imageWidth + betweenSpace;
      textY = newHeight / 2 + textHeight;
      break;
    case 'right':
      cx = newWidth / 2 - totalTextImageWith / 2;
      textX = cx;
      textY = newHeight / 2 + textHeight;
      imageX = textX + textWidth + 2 * betweenSpace;
      imageY = newHeight / 2 - imageHeight / 2;
      break;
    case 'top':
      let cy: number = newHeight / 2 - totalTextImageHeight / 2;
      imageX = newWidth / 2 - imageWidth / 2;
      imageY = cy - betweenSpace - betweenSpace / 2;
      textX = newWidth / 2 - textWidth / 2;
      textY = imageY + imageHeight + textHeight + 2 * betweenSpace;
      break;
    case 'bottom':
      cy = newHeight / 2 - totalTextImageHeight / 2;
      textX = newWidth / 2 - textWidth / 2;
      textY = cy + textHeight + 2 * betweenSpace;
      imageX = newWidth / 2 - imageWidth / 2;
      imageY = textY + betweenSpace;
      break;
    default:
      textX = newWidth / 2 - textWidth / 2;
      textY = newHeight / 2 + textHeight;
      imageX = newWidth / 2 - imageWidth / 2;
      imageY = newHeight / 2 - imageHeight / 2;
      break;
  }

  return { textX, textY, imageX, imageY };
};
