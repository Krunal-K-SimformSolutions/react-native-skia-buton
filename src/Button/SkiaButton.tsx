import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Canvas,
  useValue,
  useTouchHandler,
  runTiming,
  useValueEffect,
  Group,
  SkRRect,
  SkiaAnimation,
} from '@shopify/react-native-skia';
import { defaultProps, SkiaButtonPropsType } from './SkiaButtonType';
import { StyleSheet, View } from 'react-native';
import styles from './SkiaButtonStyle';
import {
  animRRectValue,
  getSkiaButtonProps,
  GetSkiaButtonPropsReturnType,
} from './SkiaButtonUtil';
import { SkiaStroke } from '../Stroke';
import { SkiaTextWithImage } from '../TextWithImage';
import { SkiaShadow } from '../Shadow';
import { SkiaIndicator } from '../Indicator';

const SkiaButton = (props: SkiaButtonPropsType) => {
  const {
    width,
    height,
    borderRadius,
    animWidth,
    animHeight,
    animBorderRadius,
    background,
    shadow,
    text,
    stroke,
    image,
    imageDirection,
    isDashed,
    isShadow,
    isRevetSize,
  } = useMemo<GetSkiaButtonPropsReturnType>(
    () => getSkiaButtonProps(props),
    [props]
  );

  const [isPressed, setPressed] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const animSize = useValue<number>(0);
  const animShow = useValue<number>(0);
  const animHide = useValue<number>(1);
  const animFillRect = useValue<SkRRect>(
    animRRectValue({
      animCurrentProgress: 0,
      width,
      height,
      borderRadius,
      animWidth,
      animHeight,
      animBorderRadius,
      strokeWidth: stroke?.width ?? 0,
      isDashed,
      isShadow: isDashed ? false : isShadow,
    })
  );
  const animStrokeRect = useValue<SkRRect>(
    animRRectValue({
      animCurrentProgress: 0,
      width,
      height,
      borderRadius,
      animWidth,
      animHeight,
      animBorderRadius,
      strokeWidth: stroke?.width ?? 0,
      isDashed: false,
      isShadow: isDashed ? isShadow : false,
    })
  );
  const firstTime = useRef<boolean>(true);
  const subscribeSize = useRef<SkiaAnimation>();
  const subscribeShow = useRef<SkiaAnimation>();
  const subscribeHide = useRef<SkiaAnimation>();

  const touchHandler = useTouchHandler({
    onStart: () => {
      setPressed(true);
    },
    onEnd: () => {
      setPressed(false);
      props.onPress(props.currentState);
    },
  });

  useValueEffect(animSize, (progs) => {
    animFillRect.current = animRRectValue({
      animCurrentProgress: progs,
      width,
      height,
      borderRadius,
      animWidth,
      animHeight,
      animBorderRadius,
      strokeWidth: stroke?.width ?? 0,
      isDashed,
      isShadow: isDashed ? false : isShadow,
    });
    animStrokeRect.current = animRRectValue({
      animCurrentProgress: progs,
      width,
      height,
      borderRadius,
      animWidth,
      animHeight,
      animBorderRadius,
      strokeWidth: stroke?.width ?? 0,
      isDashed: false,
      isShadow: isDashed ? isShadow : false,
    });
  });

  useEffect(() => {
    const duration: number = props.anim?.duration ?? 1200;
    if (props.currentState === 'loading') {
      subscribeSize.current = runTiming(
        animSize,
        { from: 0, to: 1 },
        {
          duration,
        }
      );
      subscribeShow.current = runTiming(
        animShow,
        { from: 0, to: 1 },
        {
          duration: duration / 2,
        },
        () => {
          animShow.current = -1;
          setAnimating(true);
        }
      );
      subscribeHide.current = runTiming(
        animHide,
        { from: 1, to: 0 },
        {
          duration: duration / 2,
        }
      );
    } else if (firstTime.current) {
      firstTime.current = false;
    } else {
      if (animShow.current === -1) {
        animShow.current = 1;
        setAnimating(false);
      }
      if (isRevetSize) {
        subscribeSize.current = runTiming(
          animSize,
          { from: 1, to: 0 },
          {
            duration,
          }
        );
      }
      subscribeShow.current = runTiming(
        animShow,
        { from: 1, to: 0 },
        {
          duration: duration / 2,
        }
      );
      subscribeHide.current = runTiming(
        animHide,
        { from: 0, to: 1 },
        {
          duration: duration / 2,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentState, props.anim?.duration, isRevetSize]);

  useEffect(() => {
    return () => {
      subscribeSize?.current?.cancel();
      subscribeShow?.current?.cancel();
      subscribeHide?.current?.cancel();
    };
  }, []);

  const isTouchable: boolean =
    props.currentState !== 'disable' && props.currentState !== 'loading';

  return (
    <View style={StyleSheet.flatten([styles.container, { width, height }])}>
      <Canvas
        style={styles.canvasButton}
        onTouch={isTouchable ? touchHandler : undefined}
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
            opacity={animHide}
            image={image}
            imageDirection={imageDirection}
          />
        )}
      </Canvas>
      {props.progress && (
        <SkiaIndicator
          width={animWidth}
          height={animHeight}
          borderRadius={animBorderRadius}
          opacity={animShow}
          animating={animating}
          isShadow={isShadow}
          {...props.progress}
          style={StyleSheet.flatten([
            styles.canvasProgress,
            {
              top: height / 2 - animHeight / 2 + 5,
              left: width / 2 - animWidth / 2 + 5,
            },
          ])}
          onTouch={isTouchable ? touchHandler : undefined}
        />
      )}
    </View>
  );
};

SkiaButton.defaultProps = defaultProps;

export default SkiaButton;
