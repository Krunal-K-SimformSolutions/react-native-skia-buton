import { Box, BoxShadow } from '@shopify/react-native-skia';
import React from 'react';
import { SkiaBackground } from '../Background';
import type { SkiaShadowPropsType } from './SkiaShadowType';

const SkiaShadow = ({
  width,
  height,
  color,
  gradient,
  gradientName,
  isPressed,
  darkShadow,
  lightShadow,
  box,
}: SkiaShadowPropsType): JSX.Element => {
  return (
    <Box box={box}>
      {darkShadow && (
        <BoxShadow
          dx={darkShadow?.dx}
          dy={darkShadow?.dy}
          blur={darkShadow?.blur}
          color={darkShadow?.color}
          inner={isPressed}
        />
      )}
      {lightShadow && (
        <BoxShadow
          dx={lightShadow?.dx}
          dy={lightShadow?.dy}
          blur={lightShadow?.blur}
          color={lightShadow?.color}
          inner={isPressed}
        />
      )}
      <SkiaBackground
        width={width}
        height={height}
        color={color}
        gradient={gradient}
        gradientName={gradientName}
      />
    </Box>
  );
};

export default SkiaShadow;
