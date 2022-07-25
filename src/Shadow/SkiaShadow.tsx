import { Box, BoxShadow } from '@shopify/react-native-skia';
import React from 'react';
import type { SkiaShadowPropsType } from './SkiaShadowType';

const SkiaShadow = ({
  animRRect,
  isPressed,
  darkShadow,
  lightShadow,
}: SkiaShadowPropsType): JSX.Element => {
  return (
    <Box box={animRRect}>
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
    </Box>
  );
};

export default SkiaShadow;
