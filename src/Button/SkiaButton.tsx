import React, { useEffect, useState } from 'react';
import {
  Canvas,
  useValue,
  useTouchHandler,
  runTiming,
  Box,
  interpolate,
  useValueEffect,
  Group,
  SkRRect,
} from '@shopify/react-native-skia';
import { defaultProps, SkiaButtonPropsType } from './SkiaButtonType';
import { StyleSheet } from 'react-native';
import styles from './SkiaButtonStyle';
import { SkiaText } from '../Text';
import { SkiaCircleProgress } from '../CircleProgress';
import { SkiaBackground } from '../Background';
import { SkiaShadow } from '../Shadow';
import { animRRectValue, isNotEmpty } from './SkiaButtonUtil';
import { SkiaStroke } from '../Stroke';
import { SkiaImage } from '../Image';

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

  useValueEffect(anim, (progress) => {
    animFillRect.current = animRRectValue(
      progress,
      width,
      height,
      borderRadius,
      horizontalMargin,
      verticalMargin,
      stroke?.width ?? 0,
      isDashed
    );
    animStrokeRect.current = animRRectValue(
      progress,
      width,
      height,
      borderRadius,
      horizontalMargin,
      verticalMargin,
      stroke?.width ?? 0,
      false
    );
    animRevert.current = interpolate(progress, [0, 1], [1, 0]);
  });

  useEffect(() => {
    if (loading) {
      runTiming(anim, 1, { duration });
    } else {
      runTiming(anim, 0, { duration });
    }
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
        {shadow && (
          <SkiaShadow
            animRRect={animFillRect}
            isPressed={isPressed}
            darkShadow={shadow?.darkShadow}
            lightShadow={shadow?.lightShadow}
          />
        )}
        {background && (
          <Box box={animFillRect}>
            <SkiaBackground
              width={width}
              height={height}
              color={background.color}
              gradient={background.gradient}
              gradientName={background.gradientName}
            />
          </Box>
        )}
        {stroke && (
          <Box box={animStrokeRect} color={'transparent'}>
            <SkiaStroke
              width={width}
              height={height}
              strokeWidth={stroke.width}
              dashWidth={stroke.dashWidth}
              dashGap={stroke.dashGap}
              color={stroke.color}
              gradient={stroke.gradient}
              gradientName={stroke.gradientName}
              isDashed={isDashed}
            />
          </Box>
        )}
      </Group>
      {text && (
        <SkiaText
          width={width}
          height={height}
          scale={isPressed ? 0.8 : 1}
          font={text.font}
          label={text.label}
          size={text.size}
          opacity={animRevert}
          color={text.color}
          horizontalMargin={horizontalMargin}
          verticalMargin={verticalMargin}
        />
      )}
      {image && (
        <SkiaImage
          width={width}
          height={height}
          imageWidth={image.width ?? 0}
          imageHeight={image.height ?? 0}
          x={image.x}
          y={image.y}
          fit={image.fit ?? 'cover'}
          opacity={animRevert}
          normalSource={image.normalSource}
          svgSource={image.svgSource}
          horizontalMargin={horizontalMargin}
          verticalMargin={verticalMargin}
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
