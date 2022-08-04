import {
  Circle,
  Group,
  interpolate,
  useComputedValue,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { SkiaBaseIndicator } from '../Base';
import type { CirclePropsType, RenderComponentArgType } from '../Base';
import { defaultProps } from './SkiaRotationHoleIndicatorType';
import type {
  RenderIndicatorPropsType,
  SkiaRotationHoleIndicatorPropsType,
} from './SkiaRotationHoleIndicatorType';

const RenderIndicator = ({
  index,
  progress,
  width,
  height,
  borderRadius,
  opacity,
  color,
  circleColor,
  trackWidth,
  direction,
}: RenderIndicatorPropsType): JSX.Element => {
  const isFilled = useMemo<boolean>(() => index === 1, [index]);

  const { cx, cy, r, trackW } = useMemo<CirclePropsType>(() => {
    const aRadius: number = borderRadius - 5;

    const centerX: number = width / 2;
    const centerY: number = height / 2;
    const trackWh: number = trackWidth ?? aRadius / 5;
    return {
      cx: centerX,
      cy: centerY,
      r: isFilled ? trackWh / 2 - 1 : aRadius,
      trackW: isFilled ? 0 : trackWh,
    };
  }, [borderRadius, height, trackWidth, width, isFilled]);

  const outputRange = useMemo(() => {
    if (direction === 'clockwise') {
      return [0, 2 * Math.PI];
    } else {
      return [2 * Math.PI, 0];
    }
  }, [direction]);

  const transformCx = useComputedValue<number>(() => {
    return (
      (borderRadius - 5) *
        Math.cos(
          2 * Math.PI * interpolate(progress.current, [0, 1], outputRange)
        ) +
      cx
    );
  }, [progress]);

  const transformCy = useComputedValue<number>(() => {
    return (
      (borderRadius - 5) *
        Math.sin(
          2 * Math.PI * interpolate(progress.current, [0, 1], outputRange)
        ) +
      cy
    );
  }, [progress]);

  const opacityLocal = useComputedValue<number>(() => {
    if ((opacity?.current ?? -1) !== -1) {
      return opacity!.current;
    }
    return 1;
  }, [opacity]);

  return (
    <Group origin={{ x: cx, y: cy }}>
      <Circle
        cx={isFilled ? transformCx : cx}
        cy={isFilled ? transformCy : cy}
        r={r}
        color={isFilled ? circleColor : color}
        opacity={opacityLocal}
        strokeWidth={trackW}
        style={isFilled ? 'fill' : 'stroke'}
      />
    </Group>
  );
};

const SkiaRotationHoleIndicator = ({
  width,
  height,
  borderRadius,
  opacity,
  animating,
  progressDuration,
  color,
  circleColor,
  trackWidth,
  direction,
  ...Other
}: SkiaRotationHoleIndicatorPropsType): JSX.Element => {
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
            circleColor,
            trackWidth,
            direction,
          }}
          key={`RotationHole-${args.index}`}
        />
      )}
      {...Other}
      count={2}
      animating={animating}
      progressDuration={progressDuration}
    />
  );
};

SkiaRotationHoleIndicator.defaultProps = defaultProps;

export default SkiaRotationHoleIndicator;
