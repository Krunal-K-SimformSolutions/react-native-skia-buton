import {
  Circle,
  Group,
  interpolate,
  useComputedValue,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { SkiaBaseIndicator } from '../Base';
import type { CirclePropsType, RenderComponentArgType } from '../Base';
import { defaultProps } from './SkiaRotationCircleIndicatorType';
import type {
  RenderIndicatorPropsType,
  SkiaRotationCircleIndicatorPropsType,
} from './SkiaRotationCircleIndicatorType';

const RenderIndicator = ({
  index,
  progress,
  width,
  height,
  borderRadius,
  opacity,
  color,
  circleColor,
  direction,
}: RenderIndicatorPropsType): JSX.Element => {
  const isFilled = useMemo<boolean>(() => index === 1, [index]);

  const { cx, cy, r } = useMemo<CirclePropsType>(() => {
    const aRadius: number = borderRadius - 5;

    const centerX: number = width / 2;
    const centerY: number = height / 2;
    return {
      cx: centerX,
      cy: centerY,
      r: isFilled ? aRadius / 5 : aRadius,
    };
  }, [borderRadius, height, width, isFilled]);

  const outputRange = useMemo(() => {
    if (direction === 'clockwise') {
      return [0, 2 * Math.PI];
    } else {
      return [2 * Math.PI, 0];
    }
  }, [direction]);

  const transformCx = useComputedValue<number>(() => {
    return (
      (borderRadius - 5 - r) *
        Math.cos(
          2 * Math.PI * interpolate(progress.current, [0, 1], outputRange)
        ) +
      cx
    );
  }, [progress]);

  const transformCy = useComputedValue<number>(() => {
    return (
      (borderRadius - 5 - r) *
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
      />
    </Group>
  );
};

const SkiaRotationCircleIndicator = ({
  width,
  height,
  borderRadius,
  opacity,
  animating,
  progressDuration,
  color,
  circleColor,
  direction,
  ...Other
}: SkiaRotationCircleIndicatorPropsType): JSX.Element => {
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
            direction,
          }}
          key={`RotationCircle-${args.index}`}
        />
      )}
      {...Other}
      count={2}
      animating={animating}
      progressDuration={progressDuration}
    />
  );
};

SkiaRotationCircleIndicator.defaultProps = defaultProps;

export default SkiaRotationCircleIndicator;
