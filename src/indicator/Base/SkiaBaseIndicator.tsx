import {
  Group,
  runTiming,
  SkiaAnimation,
  useValue,
} from '@shopify/react-native-skia';
import React, { useCallback, useEffect, useRef } from 'react';
import { defaultProps } from './SkiaBaseIndicatorType';
import type { SkiaBaseIndicatorPropsType } from './SkiaBaseIndicatorType';
import usePrevious from './usePrevious';

const SkiaBaseIndicator = ({
  animationEasing,
  animating,
  progressDuration,
  renderComponent,
  count,
}: SkiaBaseIndicatorPropsType): JSX.Element => {
  const progress = useValue<number>(0);
  const animStateRef = useRef<number>(0);
  const savedValueRef = useRef<number>(0);
  const prevAnimating = usePrevious<boolean>(animating);
  const subscribeStart = useRef<SkiaAnimation>();

  const handleStartAnimation = useCallback(() => {
    if (animStateRef.current !== 0) {
      return;
    }
    subscribeStart.current = runTiming(
      progress,
      {
        to: 1,
        loop: true,
        yoyo: false,
      },
      {
        duration: progressDuration ?? 1200,
        easing: animationEasing,
      }
    );
    animStateRef.current = 1;
  }, [animationEasing, progressDuration, progress]);

  const handleResumeAnimation = useCallback(() => {
    if (animStateRef.current !== 0) {
      return;
    }

    subscribeStart.current = runTiming(
      progress,
      1,
      {
        duration: (1 - savedValueRef.current) * (progressDuration ?? 1200),
      },
      () => {
        progress.current = 0;
        animStateRef.current = 0;
        handleStartAnimation();
      }
    );

    savedValueRef.current = 0;
    animStateRef.current = 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressDuration, progress]);

  const handleSaveAnimation = useCallback(
    (value: number) => {
      savedValueRef.current = value;
      animStateRef.current = 0;

      if (animating) {
        handleResumeAnimation();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animating]
  );

  const handleStopAnimation = useCallback(() => {
    if (animStateRef.current !== 1) {
      return;
    }
    let listener = progress.addListener((value) => {
      listener?.();
      subscribeStart?.current?.cancel();
      handleSaveAnimation(value);
    });
    animStateRef.current = -1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const renderChildComponent = useCallback(
    (_item: any, index: number): JSX.Element => {
      return renderComponent({
        index,
        count,
        progress,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, animating]
  );

  useEffect(() => {
    if (animating) {
      handleStartAnimation();
    }
    return () => {
      subscribeStart?.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (animating && !prevAnimating) {
      handleResumeAnimation();
    }
    if (!animating && prevAnimating) {
      handleStopAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating]);

  return (
    <Group>{Array.from(new Array(count), renderChildComponent, this)}</Group>
  );
};

SkiaBaseIndicator.defaultProps = defaultProps;

export default SkiaBaseIndicator;
