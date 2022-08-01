import React, { useEffect, useMemo, useState } from 'react';
import {
  Canvas,
  useValue,
  useTouchHandler,
  runTiming,
  useValueEffect,
  Group,
  SkRRect,
} from '@shopify/react-native-skia';
import { defaultProps, SkiaButtonPropsType } from './SkiaButtonType';
import { StyleSheet } from 'react-native';
import styles from './SkiaButtonStyle';
import { SkiaCircleProgress } from '../CircleProgress';
import {
  animRRectValue,
  getSkiaButtonProps,
  GetSkiaButtonPropsReturnType,
} from './SkiaButtonUtil';
import { SkiaStroke } from '../Stroke';
import { SkiaTextWithImage } from '../TextWithImage';
import { SkiaShadow } from '../Shadow';

const SkiaButton = (props: SkiaButtonPropsType) => {
  const {
    width,
    height,
    borderRadius,
    horizontalMargin,
    verticalMargin,
    background,
    shadow,
    text,
    stroke,
    image,
    imageDirection,
    isDashed,
    isRevetSize,
  } = useMemo<GetSkiaButtonPropsReturnType>(
    () => getSkiaButtonProps(props),
    [props]
  );

  const [isPressed, setPressed] = useState<boolean>(false);
  const animSize = useValue<number>(0);
  const animShow = useValue<number>(0);
  const animHide = useValue<number>(1);
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
      props.onPress(props.currentState);
    },
  });

  useValueEffect(animSize, (progs) => {
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
  });

  useEffect(() => {
    if (props.currentState === 'loading') {
      runTiming(animSize, 1, { duration: props.duration });
      runTiming(animShow, 1, { duration: props.duration });
      runTiming(animHide, 0, { duration: props.duration });
    } else {
      if (isRevetSize) {
        runTiming(animSize, 0, { duration: props.duration });
      }
      runTiming(animShow, 0, { duration: props.duration });
      runTiming(animHide, 1, { duration: props.duration });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentState, isRevetSize]);

  const isTouchable: boolean =
    props.currentState !== 'disable' && props.currentState !== 'loading';

  return (
    <Canvas
      style={StyleSheet.flatten([
        styles.container,
        {
          width: width + 2 * horizontalMargin,
          height: height + 2 * verticalMargin,
        },
      ])}
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
          horizontalMargin={horizontalMargin}
          verticalMargin={verticalMargin}
          image={image}
          imageDirection={imageDirection}
        />
      )}
      {props.progress && (
        <SkiaCircleProgress
          width={width}
          height={height}
          color={props.progress.color}
          opacity={animShow}
          loading={props.currentState === 'loading'}
          horizontalMargin={horizontalMargin}
          verticalMargin={verticalMargin}
        />
      )}
    </Canvas>
  );
};

SkiaButton.defaultProps = defaultProps;

export default SkiaButton;
