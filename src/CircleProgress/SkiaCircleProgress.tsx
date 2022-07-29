import {
  Color,
  Easing,
  Group,
  Paint,
  Path,
  runTiming,
  Skia,
  SkiaAnimation,
  SkPath,
  Transforms2d,
  useValue,
  useValueEffect,
} from '@shopify/react-native-skia';
import React, { useCallback, useEffect, useRef } from 'react';
import type { SkiaCircleProgressPropsType } from './SkiaCircleProgressType';

const SkiaCircleProgress = ({
  width,
  height,
  color,
  opacity,
  loading,
  horizontalMargin,
  verticalMargin,
}: SkiaCircleProgressPropsType): JSX.Element => {
  const newHeight: number = height + 2 * verticalMargin;
  const newWidth: number = width + 2 * horizontalMargin;
  const animSize: number = Math.min(newWidth, newHeight);
  const reduceSize: number = 10;
  const circleHeight: number = animSize - 2 * reduceSize;
  const path: SkPath = Skia.Path.Make();
  path.addArc(
    {
      x: newWidth / 2 - circleHeight / 2,
      y: newHeight / 2 - circleHeight / 2,
      width: circleHeight,
      height: circleHeight,
    },
    0,
    360
  );

  const rotation = useValue<number>(0);
  const colorIndex = useValue<number>(-1);
  const transform = useValue<Transforms2d>([{ rotate: 0 }]);
  const colorRing = useValue<Color | undefined>(undefined);

  const subscribeRotate = useRef<SkiaAnimation>();
  const subscribeColor = useRef<SkiaAnimation>();

  const handleColor = useCallback((iteration: number = 0) => {
    subscribeColor.current = runTiming(
      colorIndex,
      iteration,
      {
        duration: 5000,
        easing: Easing.linear,
      },
      () => {
        handleColor(iteration + 1);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpin = useCallback(() => {
    subscribeRotate.current = runTiming(
      rotation,
      1,
      {
        duration: 90000,
        easing: Easing.linear,
      },
      () => {
        rotation.current = 0;
        handleSpin();
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      handleSpin();
      if (Array.isArray(color)) {
        handleColor();
      }
    }

    return () => {
      subscribeRotate?.current?.cancel();
      subscribeColor?.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useValueEffect(rotation, (v: number) => {
    transform.current = [{ rotate: v * 360 }];
  });

  useValueEffect(colorIndex, (v: number) => {
    const length = Array.isArray(color) ? color.length - 1 : 0;
    const index = Math.ceil(v % length);
    const value = Array.isArray(color) ? color[index] : color;
    colorRing.current = value;
  });

  return (
    <Group transform={transform} origin={{ x: newWidth / 2, y: newHeight / 2 }}>
      <Path path={path} color={'transparent'} start={0} end={0.8}>
        <Paint
          style={'stroke'}
          strokeWidth={5}
          strokeCap={'round'}
          color={colorRing}
          opacity={opacity}
        />
      </Path>
    </Group>
  );
};

export default SkiaCircleProgress;
