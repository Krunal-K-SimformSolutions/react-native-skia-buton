import { Easing, Group, Paint, Path, runTiming, Skia, SkiaAnimation, useValue, useValueEffect } from "@shopify/react-native-skia";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { SkiaCircleProgressPropsType } from "./SkiaCircleProgressType";

const SkiaCircleProgress = ({ width, height, color, opacity }: SkiaCircleProgressPropsType) => {
  const path = Skia.Path.Make();
  path.addArc({ x: width/2 - height/2, y: 20, width: height, height: height }, 0, 360);
  
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);
  const startAngle = useValue<number>(0);
  const endAngle = useValue<number>(0);
  const rotation = useValue<number>(0);

  const subscribeStartAngle = useRef<SkiaAnimation>();
  const subscribeEndAngle = useRef<SkiaAnimation>();
  const subscribeRotate = useRef<SkiaAnimation>();

  const handleAnimation = useCallback((iteration: number = 1) => {
    endAngle.current = 0;
    startAngle.current = 0;
    subscribeStartAngle.current = runTiming(endAngle, 0.6, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    }, () => {
      subscribeEndAngle.current = runTiming(startAngle, 0.6, {
            duration: 2000,
            easing: Easing.inOut(Easing.quad),
          }, () => {
            if (Array.isArray(color)) {
              setColorIndex(iteration % color.length);
            }
            handleAnimation(iteration + 1);
          });
    });
  }, [color]);

  const handleSpin = useCallback(() => {
    subscribeRotate.current = runTiming(rotation, 1, {
      duration: 90000,
      easing: Easing.linear,
    }, () => {
      rotation.current = 0;
      handleSpin();
    })
  }, []);

  useEffect(() => {
    handleAnimation()
    handleSpin();

    return () => {
      subscribeStartAngle?.current?.cancel();
      subscribeEndAngle?.current?.cancel();
      subscribeRotate?.current?.cancel();
    };
  }, []);

  useValueEffect(rotation, (v) => {
    setRotate(v*360);
  })

  return (
    <Group transform={[{rotate}]} origin={{ x: width/2, y: height/2 + 20 }}>
      <Path path={path} color={'transparent'} start={startAngle} end={endAngle}>
        <Paint style={'stroke'} strokeWidth={5} strokeCap={'round'} color={Array.isArray(color) ? color[colorIndex] : color} opacity={opacity} />
      </Path>
    </Group>
  );
};

export default SkiaCircleProgress;