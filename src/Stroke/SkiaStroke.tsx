import { Box, DashPathEffect } from '@shopify/react-native-skia';
import React from 'react';
import { SkiaBackground } from '../Background';
import type { SkiaStrokePropsType } from './SkiaStrokeType';

const SkiaStroke = ({
  width,
  height,
  strokeWidth,
  dashWidth,
  dashGap,
  color,
  gradient,
  gradientName,
  isDashed,
  box,
}: SkiaStrokePropsType): JSX.Element => {
  return (
    <Box box={box} color={'transparent'}>
      <SkiaBackground
        width={width}
        height={height}
        style={'stroke'}
        strokeWidth={strokeWidth}
        color={color}
        gradient={gradient}
        gradientName={gradientName}
      >
        {isDashed && (
          <DashPathEffect intervals={[dashWidth ?? 0, dashGap ?? 0]} />
        )}
      </SkiaBackground>
    </Box>
  );
};

export default SkiaStroke;
