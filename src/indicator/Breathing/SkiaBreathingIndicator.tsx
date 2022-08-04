import {
  Circle,
  Group,
  interpolate,
  Transforms2d,
  useComputedValue,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { SkiaBaseIndicator } from '../Base';
import type { CirclePropsType, RenderComponentArgType } from '../Base';
import { defaultProps } from './SkiaBreathingIndicatorType';
import type {
  RenderIndicatorPropsType,
  SkiaBreathingIndicatorPropsType,
} from './SkiaBreathingIndicatorType';

const RenderIndicator = ({
  progress,
  width,
  height,
  borderRadius,
  opacity,
  color,
  trackWidth,
}: RenderIndicatorPropsType): JSX.Element => {
  const { cx, cy, r, trackW } = useMemo<CirclePropsType>(() => {
    const aRadius: number = borderRadius - 5;

    const centerX: number = width / 2;
    const centerY: number = height / 2;
    const trackWh: number = trackWidth ?? Math.floor(borderRadius / 5);
    return { cx: centerX, cy: centerY, r: aRadius, trackW: trackWh };
  }, [borderRadius, height, width, trackWidth]);

  const transform = useComputedValue<Transforms2d>(() => {
    return [
      {
        scale: interpolate(progress.current, [0, 0.5, 1], [0.1, 1.0, 0.1]),
      },
    ];
  }, [progress]);

  const opacityLocal = useComputedValue<number>(() => {
    if ((opacity?.current ?? -1) !== -1) {
      return opacity!.current;
    }
    return 1;
  }, [opacity]);

  return (
    <Group transform={transform} origin={{ x: cx, y: cy }}>
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        style={'stroke'}
        strokeWidth={trackW}
        color={color}
        opacity={opacityLocal}
      />
    </Group>
  );
};

const SkiaBreathingIndicator = ({
  width,
  height,
  borderRadius,
  opacity,
  animating,
  progressDuration,
  color,
  trackWidth,
  ...Other
}: SkiaBreathingIndicatorPropsType): JSX.Element => {
  return (
    <SkiaBaseIndicator
      renderComponent={(args: RenderComponentArgType) => (
        <RenderIndicator
          {...args}
          {...{
            width,
            height,
            borderRadius,
            opacity,
            animating,
            progressDuration,
            color,
            trackWidth,
          }}
          key={`Breathing-${args.index}`}
        />
      )}
      {...Other}
      count={1}
      animating={animating}
      progressDuration={progressDuration}
    />
  );
};

SkiaBreathingIndicator.defaultProps = defaultProps;

export default SkiaBreathingIndicator;
