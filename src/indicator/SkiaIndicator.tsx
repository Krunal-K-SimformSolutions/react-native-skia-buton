import { Canvas } from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SkiaBallIndicator } from './Ball';
import { SkiaBarIndicator } from './Bar';
import { SkiaCircleIndicator } from './Circle';
import { SkiaDotIndicator } from './Dot';
import { SkiaMaterialIndicator } from './Material';
import { SkiaPacmanIndicator } from './Pacman';
import { SkiaPulseIndicator } from './Pulse';
import type { SkiaIndicatorPropsType } from './SkiaIndicatorType';
import { SkiaSkypeIndicator } from './Skype';
import { SkiaUIActivityIndicator } from './UIActivity';
import { SkiaWaveIndicator } from './Wave';
import { defaultProps } from './SkiaIndicatorType';
import { SkiaBreathingIndicator } from './Breathing';
import { SkiaRotationHoleIndicator } from './RotationHole';
import { SkiaRotationCircleIndicator } from './RotationCircle';

const SkiaIndicator = ({
  type,
  style,
  onTouch,
  isShadow,
  ...Other
}: SkiaIndicatorPropsType): JSX.Element => {
  const width: number = Other.width - 10;
  const height: number = Other.height - 10;
  const borderRadius: number = Other.borderRadius - (isShadow ? 8 : 5);

  return (
    <Canvas
      style={StyleSheet.flatten([
        {
          width,
          height,
          //overflow: 'hidden',
        },
        style,
      ])}
      onTouch={onTouch}
    >
      {type === 'Ball' && (
        <SkiaBallIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Bar' && (
        <SkiaBarIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Circle' && (
        <SkiaCircleIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Dot' && (
        <SkiaDotIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Material' && (
        <SkiaMaterialIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Pacman' && (
        <SkiaPacmanIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Pulse' && (
        <SkiaPulseIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Skype' && (
        <SkiaSkypeIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'UIActivity' && (
        <SkiaUIActivityIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Wave' && (
        <SkiaWaveIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'Breathing' && (
        <SkiaBreathingIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'RotationHole' && (
        <SkiaRotationHoleIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      {type === 'RotationCircle' && (
        <SkiaRotationCircleIndicator
          {...Other}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
    </Canvas>
  );
};

SkiaIndicator.defaultProps = defaultProps;

export default SkiaIndicator;
