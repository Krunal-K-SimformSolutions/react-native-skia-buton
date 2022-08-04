import {
  Group,
  Image,
  ImageSVG,
  Paint,
  SkFont,
  SkImage,
  SkSVG,
  Text,
  useFont,
  useImage,
  usePaintRef,
  useSVG,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import type {
  SkiaTextWithImagePropsType,
  TextWithImageXY,
} from './SkiaTextWithImageType';
import { getTextWithImageXY } from './SkiaTextWithImageUtil';

const SkiaTextWithImage = ({
  text,
  width,
  height,
  opacity,
  image,
  imageDirection,
}: SkiaTextWithImagePropsType) => {
  const paint = usePaintRef();
  const fontFamily: SkFont | null = useFont(
    text?.font ?? require('./SFProText-BoldItalic.otf'),
    text?.size
  );
  const img: SkImage | null = useImage(
    image?.normalSource ??
      (image?.svgSource ? undefined : require('./ic_react.png'))
  );
  const svg: SkSVG | null = useSVG(
    image?.svgSource ??
      (image?.normalSource ? undefined : require('./ic_react_native.svg'))
  );

  const { textX, textY, imageX, imageY } = useMemo<TextWithImageXY>(
    () =>
      getTextWithImageXY(
        height,
        width,
        fontFamily,
        text,
        image,
        imageDirection
      ),
    [height, width, fontFamily, image, imageDirection, text]
  );

  return (
    <Group layer={paint}>
      <Paint ref={paint} opacity={opacity} />
      {text && fontFamily && (
        <Text
          x={textX}
          y={textY}
          text={text.label}
          font={fontFamily}
          size={text.size}
          color={text.color}
        />
      )}
      {image && img && (
        <Image
          width={image.width}
          height={image.height}
          x={imageX}
          y={imageY}
          fit={image.fit ?? 'contain'}
          image={img}
        />
      )}
      {image && svg && (
        <ImageSVG
          width={image.width}
          height={image.height}
          x={imageX}
          y={imageY}
          svg={svg}
        />
      )}
    </Group>
  );
};

export default SkiaTextWithImage;
