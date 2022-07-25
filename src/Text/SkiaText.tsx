import React from 'react';
import {
  Text,
  useFont,
  Group,
  SkFont,
} from '@shopify/react-native-skia';
import type { SkiaTextPropsType } from './SkiaTextType';

const SkiaText = ({
  scale,
  width,
  height,
  font,
  size,
  label,
  color,
  opacity,
  horizontalMargin,
  verticalMargin,
}: SkiaTextPropsType): JSX.Element | null => {
  const fontFamily: SkFont | null = useFont(
    font ?? require('./SFProText-BoldItalic.otf'),
    size
  );
  if (fontFamily === null) {
    return null;
  }
  const textSize: number = fontFamily.getTextWidth(label);
  const newHeight: number = height + 2 * verticalMargin;
  const newWidth: number = width + 2 * horizontalMargin;
  const textX: number = newWidth / 2 - textSize / 2;
  const textY: number = newHeight / 2 + size / 3;
  
  return (
    <Group transform={[{ scale }]} origin={{ x: textX, y: textY }}>
      <Text
        x={textX}
        y={textY}
        text={label}
        font={fontFamily}
        size={size}
        color={color}
        opacity={opacity}
      />
    </Group>
  );
};

export default SkiaText;
