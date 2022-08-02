import React, { useMemo } from 'react';
import {
  LinearGradient,
  Paint,
  RadialGradient,
  SweepGradient,
  TwoPointConicalGradient,
  vec,
} from '@shopify/react-native-skia';
import type {
  GradientDataType,
  SkiaBackgroundPropsType,
  GetStartAndEndReturnType,
} from './SkiaBackgroundType';
import { getGradientFromName, getStartAndEnd } from './SkiaBackgroundUtil';

const SkiaBackground = ({
  width,
  height,
  color,
  gradient,
  gradientName,
  children,
  ...others
}: SkiaBackgroundPropsType): JSX.Element => {
  const gradientByName = useMemo<GradientDataType | null>(
    () => getGradientFromName(gradientName),
    [gradientName]
  );
  const startAndEnd = useMemo<GetStartAndEndReturnType | null>(
    () =>
      gradientByName !== null
        ? getStartAndEnd(gradientByName.angle || 0, width, height)
        : null,
    [gradientByName, height, width]
  );

  const noColor = ['transparent'];

  return (
    <Paint style={'fill'} color={color} {...others}>
      {gradient?.type === 'linear' && (
        <LinearGradient
          start={vec(
            startAndEnd?.start[0] ?? gradient?.start?.[0],
            startAndEnd?.start[1] ?? gradient?.start?.[1]
          )}
          end={vec(
            startAndEnd?.end[0] ?? gradient?.end?.[0],
            startAndEnd?.end[1] ?? gradient?.end?.[1]
          )}
          positions={gradientByName?.positions ?? gradient?.positions}
          colors={gradientByName?.colors ?? gradient?.colors ?? noColor}
          mode={gradient?.mode}
        />
      )}
      {gradient?.type === 'radial' && (
        <RadialGradient
          c={vec(gradient?.center[0], gradient?.center[1])}
          r={gradient?.radius}
          positions={gradientByName?.positions ?? gradient?.positions}
          colors={gradientByName?.colors ?? gradient?.colors ?? noColor}
          mode={gradient?.mode}
        />
      )}
      {gradient?.type === 'conical' && (
        <TwoPointConicalGradient
          start={vec(
            startAndEnd?.start[0] ?? gradient?.start?.[0],
            startAndEnd?.start[1] ?? gradient?.start?.[1]
          )}
          startR={gradient?.startRadius}
          end={vec(
            startAndEnd?.end[0] ?? gradient?.end?.[0],
            startAndEnd?.end[1] ?? gradient?.end?.[1]
          )}
          endR={gradient?.endRadius}
          positions={gradientByName?.positions ?? gradient?.positions}
          colors={gradientByName?.colors ?? gradient?.colors ?? noColor}
          mode={gradient?.mode}
        />
      )}
      {gradient?.type === 'sweep' && (
        <SweepGradient
          c={vec(gradient?.center[0], gradient?.center[1])}
          start={gradient?.startAngle}
          end={gradient?.endAngle}
          positions={gradientByName?.positions ?? gradient?.positions}
          colors={gradientByName?.colors ?? gradient?.colors ?? noColor}
          mode={gradient?.mode}
        />
      )}

      {children && children}
    </Paint>
  );
};

export default SkiaBackground;
