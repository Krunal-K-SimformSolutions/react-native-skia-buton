import React, { useCallback, useState } from 'react';

import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { SkiaButton } from 'react-native-skia-button';

const width: number = Dimensions.get('window').width;

export default function App() {
  const [isLoading, setLoading] = useState<boolean[]>(new Array(9).fill(false));

  const handlePress = useCallback((index: number) => () => {
    setLoading((prev) => {
      const prevArray = [...prev];
      prevArray[index] = true;
      return prevArray;
    });
    setTimeout(() => {
      setLoading((prev) => {
        const prevArray = [...prev];
        prevArray[index] = false;
        return prevArray;
      });
    }, 5000);
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      <SkiaButton
        loading={isLoading[0]}
        onPress={handlePress(0)}
        background={{ color: '#424242' }}
        verticalMargin={5}
        horizontalMargin={20}
        borderRadius={10}
        width={width-40}
        text={{ size: 24, label: 'Simple Button', color: '#FFFFFF' }}
        progress={{ color: ['#F44336', '#2196F3', '#009688'] }}
      />
      <SkiaButton
        loading={isLoading[1]}
        onPress={handlePress(1)}
        background={{ color: '#add8e6' }}
        shadow={{
          lightShadow: { dx: -5, dy: -5, blur: 5, color: '#c7f8ff' },
          darkShadow: { dx: 5, dy: 5, blur: 5, color: '#93b8c4' },
        }}
        verticalMargin={10}
        horizontalMargin={20}
        borderRadius={5}
        width={width-40}
        text={{ size: 16, label: 'Neumorphism Button', color: '#000000' }}
        progress={{ color: '#F44336' }}
      />
      <SkiaButton
        loading={isLoading[2]}
        onPress={handlePress(2)}
        background={{ color: '#424242' }}
        verticalMargin={5}
        horizontalMargin={20}
        width={width-40}
        stroke={{ color: '#F44336', width: 3 }}
        text={{ size: 16, label: 'Button With Stroke', color: '#FFFFFF' }}
        progress={{ color: ['#F44336', '#2196F3', '#009688'] }}
      />
      <SkiaButton
        loading={isLoading[3]}
        onPress={handlePress(3)}
        verticalMargin={5}
        horizontalMargin={20}
        borderRadius={45/2}
        width={width-40}
        background={{ gradientName: 'Phoenix Start', gradient: { type: 'linear' } }}
        stroke={{ width: 3, gradientName: 'Fabled Sunset', gradient: { type: 'linear' } }}
        text={{ size: 16, label: 'Button With Gradient', color: '#000000' }}
        progress={{ color: '#F44336' }}
      />
      <SkiaButton
        loading={isLoading[4]}
        onPress={handlePress(4)}
        width={100}
        height={100}
        borderRadius={50}
        horizontalMargin={0}
        verticalMargin={0}
        background={{ gradient: { type: 'radial', colors: ["blue", "yellow"], radius: 50, center: [50, 50] } }}
        text={{ size: 16, label: 'Button', color: '#FFFFFF' }}
        progress={{ color: ['#F44336', '#2196F3', '#009688'] }}
      />
      <SkiaButton
        loading={isLoading[5]}
        onPress={handlePress(5)}
        width={100}
        height={100}
        borderRadius={0}
        horizontalMargin={0}
        verticalMargin={5}
        background={{ gradient: { type: 'conical', colors: ["blue", "yellow"], start: [50, 50], startRadius: 50, end: [50, 16], endRadius: 8 } }}
        image={{ normalSource: require('./ic_png.png'), width: 32, height: 32 }}
        progress={{ color: '#F44336' }}
      />
      <SkiaButton
        loading={isLoading[6]}
        onPress={handlePress(6)}
        width={100}
        height={100}
        borderRadius={5}
        horizontalMargin={0}
        verticalMargin={5}
        background={{ gradient: { type: 'sweep', colors: ["cyan", "magenta", "yellow", "cyan"], center: [50, 50] }}}
        text={{ size: 16, label: 'Button', color: '#000000' }}
        progress={{ color: ['#F44336', '#2196F3', '#009688'] }}
      />
      <SkiaButton
        loading={isLoading[7]}
        onPress={handlePress(7)}
        background={{ color: '#424242' }}
        verticalMargin={5}
        horizontalMargin={20}
        borderRadius={10}
        width={width-40}
        text={{ size: 16, label: 'Button With Stroke', color: '#FFFFFF' }}
        progress={{ color: '#F44336' }}
        stroke={{ color: '#F44336', width: 1, dashWidth: 1, dashGap: 1 }}
      />
      <SkiaButton
        loading={isLoading[8]}
        onPress={handlePress(8)}
        background={{ color: '#424242' }}
        verticalMargin={5}
        horizontalMargin={20}
        borderRadius={10}
        width={width-40}
        height={50}
        text={{ size: 16, label: 'Button With Image', color: '#FFFFFF' }}
        image={{ normalSource: require('./ic_png.png'), width: 32, height: 32 }}
        imageDirection={"left"}
        progress={{ color: '#F44336' }}
        stroke={{ color: '#F44336', width: 3, dashWidth: 6, dashGap: 3 }}
      />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: '#add8e6',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
