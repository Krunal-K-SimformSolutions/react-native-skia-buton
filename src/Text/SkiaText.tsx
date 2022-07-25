import React from 'react';
import {
  Text,
  useFont,
  Group
} from "@shopify/react-native-skia";
import type { SkiaTextPropsType } from './SkiaTextType';
 
const SkiaText = ({ scale, width, height, font, size, text, color, opacity }: SkiaTextPropsType) => {
  const fontFamily = useFont(font ?? require("./SFProText-BoldItalic.otf"), size);
  if (fontFamily === null) {
    return null;
  }
  const textSize = fontFamily.measureText(text);
  const textX = (((width - 40 + size * 1.5) /2) - (textSize.width/2));
  const textY = (((height + 40 + size * 1.5) /2) - (textSize.height/2));

  return (
    <Group transform={[{ scale }]} origin={{ x: textX, y: textY }}>
      <Text x={textX} y={textY} text={text} font={fontFamily} size={size} color={color} opacity={opacity}/>
    </Group>
  );
};

export default SkiaText;