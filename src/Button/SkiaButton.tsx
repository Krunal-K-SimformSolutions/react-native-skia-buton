import React, { useEffect, useState } from 'react';
import {
  Canvas,
  useValue,
  useTouchHandler,
  Fill,
  runTiming,
  rrect,
  Box,
  BoxShadow,
  rect,
  interpolate,
  useValueEffect,
  Paint,
  Group,
  LinearGradient,
  vec,
  DashPathEffect,
} from '@shopify/react-native-skia';
import { defaultProps, SkiaButtonPropsType } from './SkiaButtonType';
import { StyleSheet } from 'react-native';
import styles from './SkiaButtonStyle';
import { SkiaText } from '../Text';
import { SkiaCircleProgress } from '../CircleProgress';

const animRRectValue = (
  animCurrentProgress: number,
  width: number,
  height: number,
  radius: number
) => {
  const animHeight = height + 20;
  return rrect(
    rect(
      interpolate(
        animCurrentProgress,
        [0, 1],
        [20, width / 2 - animHeight / 2]
      ),
      interpolate(animCurrentProgress, [0, 1], [20, 10]),
      interpolate(animCurrentProgress, [0, 1], [width - 40, animHeight]),
      interpolate(animCurrentProgress, [0, 1], [height, animHeight])
    ),
    interpolate(animCurrentProgress, [0, 1], [radius, animHeight / 2]),
    interpolate(animCurrentProgress, [0, 1], [radius, animHeight / 2])
  );
};
const SkiaButton = ({
  width,
  height,
  borderRadius,
  loading,
  onPress,
  background: { color },
  shadow: { lightShadow, darkShadow },
  text,
  progress,
}: SkiaButtonPropsType) => {
  const [isPressed, setPressed] = useState(false);
  const anim = useValue(0);
  const animRRect = useValue(animRRectValue(0, width, height, borderRadius));
  const animRevert = useValue(1);

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
    animRRect.current = animRRectValue(progress, width, height, borderRadius);
    animRevert.current = interpolate(progress, [0, 1], [1, 0]);
  });

  useEffect(() => {
    if (loading) {
      runTiming(anim, 1, { duration: 1000 });
    } else {
      runTiming(anim, 0, { duration: 1000 });
    }
  }, [loading]);

  return (
    <Canvas
      style={StyleSheet.flatten([
        styles.container,
        { width, height: height + 40 },
      ])}
      onTouch={touchHandler}
    >
      <Group>
        <Box box={animRRect}>
          <BoxShadow
            dx={darkShadow.dx}
            dy={darkShadow.dy}
            blur={darkShadow.blur}
            color={darkShadow.color}
            inner={isPressed}
          />
          <BoxShadow
            dx={lightShadow.dx}
            dy={lightShadow.dy}
            blur={lightShadow.blur}
            color={lightShadow.color}
            inner={isPressed}
          />
        </Box>
        <Box box={animRRect}>
          <Paint style={'fill'}>
            <LinearGradient
              start={vec(20, 20)}
              end={vec(width - 40, height)}
              positions={[0, 1]}
              colors={['#0061ff', '#60efff']}
            />
          </Paint>
          <Paint style={'stroke'} strokeWidth={5}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width / 2, height / 2)}
              colors={['#0061ff', '#60efff']}
            />
            <DashPathEffect intervals={[10, 5]} />
          </Paint>
        </Box>
      </Group>
      <SkiaText
        width={width}
        height={height}
        scale={isPressed ? 0.8 : 1}
        text={text.label}
        size={text.fontSize}
        opacity={animRevert}
        color={text.color}
      />
      <SkiaCircleProgress
        width={width}
        height={height}
        color={progress.color}
        opacity={anim}
      />
    </Canvas>
  );
};

SkiaButton.defaultProps = defaultProps;

export default SkiaButton;
