import { Group, useValue } from '@shopify/react-native-skia';
import React, { useCallback } from 'react';
import { defaultProps, SkiaIndicatorPropsType } from './SkiaIndicatorType';

const SkiaIndicator = ({
  amimationEasing,
  animationDuration,
  hideAnimationDuration,

  animating,
  interaction,
  hidesWhenStopped,

  renderComponent,
  count,
}: SkiaIndicatorPropsType): JSX.Element => {
    const progress = useValue(0);
    const animHide = useValue(animating ? 1 : 0);

   const handleStartAnimation = useCallback(() => {

   }, []);
   
  return <Group />;
};

SkiaIndicator.defaultProps = defaultProps;

export default SkiaIndicator;
