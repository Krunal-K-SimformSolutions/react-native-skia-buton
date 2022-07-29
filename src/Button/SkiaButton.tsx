import React, { useEffect, useState } from 'react';
import {
  Canvas,
  useValue,
  useTouchHandler,
  runTiming,
  interpolate,
  useValueEffect,
  Group,
  SkRRect,
} from '@shopify/react-native-skia';
import { defaultProps, SkiaButtonPropsType } from './SkiaButtonType';
import { StyleSheet } from 'react-native';
import styles from './SkiaButtonStyle';
import { SkiaCircleProgress } from '../CircleProgress';
import { animRRectValue, isNotEmpty } from './SkiaButtonUtil';
import { SkiaStroke } from '../Stroke';
import { SkiaTextWithImage } from '../TextWithImage';
import { SkiaShadow } from '../Shadow';

const SkiaButton = ({
  width,
  height,
  borderRadius,
  horizontalMargin,
  verticalMargin,
  loading,
  duration,
  onPress,
  background,
  shadow,
  text,
  progress,
  stroke,
  image,
  imageDirection,
}: SkiaButtonPropsType) => {
  const isDashed: boolean =
    isNotEmpty(stroke?.dashWidth) && isNotEmpty(stroke?.dashGap);

  const [isPressed, setPressed] = useState<boolean>(false);
  const anim = useValue<number>(0);
  const animRevert = useValue<number>(1);
  const animFillRect = useValue<SkRRect>(
    animRRectValue(
      0,
      width,
      height,
      borderRadius,
      horizontalMargin,
      verticalMargin,
      stroke?.width ?? 0,
      isDashed
    )
  );
  const animStrokeRect = useValue<SkRRect>(
    animRRectValue(
      0,
      width,
      height,
      borderRadius,
      horizontalMargin,
      verticalMargin,
      stroke?.width ?? 0,
      false
    )
  );

  const touchHandler = useTouchHandler({
    onStart: () => {
      setPressed(true);
    },
    onEnd: () => {
      setPressed(false);
      onPress();
    },
  });

  useValueEffect(anim, (progs) => {
    animFillRect.current = animRRectValue(
      progs,
      width,
      height,
      borderRadius,
      horizontalMargin,
      verticalMargin,
      stroke?.width ?? 0,
      isDashed
    );
    animStrokeRect.current = animRRectValue(
      progs,
      width,
      height,
      borderRadius,
      horizontalMargin,
      verticalMargin,
      stroke?.width ?? 0,
      false
    );
    animRevert.current = interpolate(progs, [0, 1], [1, 0]);
  });

  useEffect(() => {
    if (loading) {
      runTiming(anim, 1, { duration });
    } else {
      runTiming(anim, 0, { duration });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Canvas
      style={StyleSheet.flatten([
        styles.container,
        {
          width: width + 2 * horizontalMargin,
          height: height + 2 * verticalMargin,
        },
      ])}
      onTouch={touchHandler}
    >
      <Group>
        <SkiaShadow
          width={width}
          height={height}
          box={animFillRect}
          color={background?.color}
          gradient={background?.gradient}
          gradientName={background?.gradientName}
          isPressed={isPressed}
          darkShadow={shadow?.darkShadow}
          lightShadow={shadow?.lightShadow}
        />
        {stroke && (
          <SkiaStroke
            width={width}
            height={height}
            box={animStrokeRect}
            strokeWidth={stroke.width}
            dashWidth={stroke.dashWidth}
            dashGap={stroke.dashGap}
            color={stroke.color}
            gradient={stroke.gradient}
            gradientName={stroke.gradientName}
            isDashed={isDashed}
          />
        )}
      </Group>
      {(text || image) && (
        <SkiaTextWithImage
          text={text}
          width={width}
          height={height}
          opacity={animRevert}
          horizontalMargin={horizontalMargin}
          verticalMargin={verticalMargin}
          image={image}
          imageDirection={imageDirection}
        />
      )}
      {progress && (
        <SkiaCircleProgress
          width={width}
          height={height}
          color={progress.color}
          opacity={anim}
          loading={loading}
          horizontalMargin={horizontalMargin}
          verticalMargin={verticalMargin}
        />
      )}
    </Canvas>
  );
};

SkiaButton.defaultProps = defaultProps;

export default SkiaButton;
