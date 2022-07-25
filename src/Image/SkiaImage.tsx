import {
  Group,
  Image,
  SkImage,
  ImageSVG,
  SkSVG,
  useImage,
  useSVG,
} from '@shopify/react-native-skia';
import React from 'react';
import type { SkiaImagePropsType } from './SkiaImageType';

const SkiaImage = ({
  width,
  height,
  imageWidth,
  imageHeight,
  x,
  y,
  normalSource,
  fit,
  svgSource,
  opacity,
  horizontalMargin,
  verticalMargin,
}: SkiaImagePropsType): JSX.Element | null => {
  const image: SkImage | null = useImage(
    normalSource ?? (svgSource ? undefined : require('./ic_react.png'))
  );
  const svg: SkSVG | null = useSVG(
    svgSource ?? (normalSource ? undefined : require('./ic_react_native.svg'))
  );

  if (image === null && svg === null) {
    return null;
  }
  const newHeight: number = height + 2 * verticalMargin;
  const newWidth: number = width + 2 * horizontalMargin;
  const dx: number = x ?? (newWidth / 2 - imageWidth / 2);
  const dy: number = y ?? (newHeight / 2 - imageHeight / 2);

  return (
    <Group opacity={opacity}>
      {image && (
        <Image
          width={imageWidth}
          height={imageHeight}
          x={dx}
          y={dy}
          fit={fit}
          image={image}
          opacity={opacity}
        />
      )}
      {svg && (
        <ImageSVG
          width={imageWidth}
          height={imageHeight}
          x={dx}
          y={dy}
          svg={svg}
        />
      )}
    </Group>
  );
};

export default SkiaImage;
