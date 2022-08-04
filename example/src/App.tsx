import React, { useCallback, useState } from 'react';

import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import {
  SkiaButton,
  SkiaIndicator,
  SkiaButtonStateType,
} from 'react-native-skia-button';

const width: number = Dimensions.get('window').width;

function DifferentIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <SkiaIndicator
            type={'Ball'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            progressDuration={800}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Skype'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Pulse'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Breathing'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.flex}>
          <SkiaIndicator
            type={'Wave'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Wave'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            waveMode="outline"
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Wave'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            count={2}
            waveFactor={0.4}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Wave'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            count={1}
            waveFactor={0.4}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.flex}>
          <SkiaIndicator
            type={'UIActivity'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Material'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Pacman'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Bar'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            count={5}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.flex}>
          <SkiaIndicator
            type={'Dot'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            count={3}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Circle'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'RotationHole'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>

        <View style={styles.flex}>
          <SkiaIndicator
            type={'Dot'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
            reverse={true}
            count={3}
            progressDuration={600}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.flex}>
          <SkiaIndicator
            type={'RotationCircle'}
            color="white"
            width={60}
            height={60}
            borderRadius={30}
            animating={true}
          />
        </View>
      </View>
    </View>
  );
}

function DifferentButton() {
  const [loading, setLoading] = useState<SkiaButtonStateType[]>(
    new Array(10).fill('idle')
  );

  const handlePress = useCallback(
    (index: number) => (_state: string) => {
      setLoading((prev) => {
        const prevArray = [...prev];
        prevArray[index] = 'loading';
        return prevArray;
      });
      if (index === 9) {
        setTimeout(() => {
          setLoading((prev) => {
            const prevArray = [...prev];
            prevArray[index] = 'succeeded';
            return prevArray;
          });
        }, 3000);
        setTimeout(() => {
          setLoading((prev) => {
            const prevArray = [...prev];
            prevArray[index] = 'failed';
            return prevArray;
          });
        }, 7000);
      }
      setTimeout(() => {
        setLoading((prev) => {
          const prevArray = [...prev];
          prevArray[index] = 'idle';
          return prevArray;
        });
      }, 10000);
    },
    []
  );

  return (
    <View style={styles.container}>
      <SkiaButton
        currentState={loading[0]}
        onPress={handlePress(0)}
        background={{ color: '#424242' }}
        borderRadius={10}
        width={width - 40}
        text={{ size: 24, label: 'Simple Button', color: '#ffffff' }}
        progress={{
          color: '#F44336',
          type: 'Skype',
          count: 5,
          minScale: 0.2,
          maxScale: 1.0,
        }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[1]}
        onPress={handlePress(1)}
        background={{ color: '#014689' }}
        shadow={{
          lightShadow: { dx: -5, dy: -5, blur: 5, color: '#014F93' },
          darkShadow: { dx: 5, dy: 5, blur: 5, color: '#013C7F' },
        }}
        borderRadius={5}
        width={width - 40}
        text={{ size: 16, label: 'Neumorphism Button', color: '#ffffff' }}
        progress={{ color: '#F44336', type: 'Ball', count: 8 }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[2]}
        onPress={handlePress(2)}
        background={{ color: '#424242' }}
        width={width - 40}
        stroke={{ color: '#F44336', width: 3 }}
        text={{ size: 16, label: 'Button With Stroke', color: '#FFFFFF' }}
        progress={{ color: '#F44336', type: 'Bar', count: 3 }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[3]}
        onPress={handlePress(3)}
        borderRadius={45 / 2}
        width={width - 40}
        background={{
          gradientName: 'Phoenix Start',
          gradient: { type: 'linear' },
        }}
        stroke={{
          width: 3,
          gradientName: 'Fabled Sunset',
          gradient: { type: 'linear' },
        }}
        text={{ size: 16, label: 'Button With Gradient', color: '#000000' }}
        progress={{ color: '#F44336', type: 'Circle', trackWidth: 5 }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[4]}
        onPress={handlePress(4)}
        width={100}
        height={100}
        borderRadius={50}
        background={{
          gradient: {
            type: 'radial',
            colors: ['blue', 'yellow'],
            radius: 50,
            center: [50, 50],
          },
        }}
        text={{ size: 16, label: 'Button', color: '#FFFFFF' }}
        progress={{ color: '#F44336', type: 'Dot', count: 3, reverse: false }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[5]}
        onPress={handlePress(5)}
        width={100}
        height={100}
        borderRadius={0}
        background={{
          gradient: {
            type: 'conical',
            colors: ['yellow', 'blue'],
            start: [50, 50],
            startRadius: 50,
            end: [50, 16],
            endRadius: 8,
          },
        }}
        image={{
          normalSource: require('./ic_png.png'),
          width: 32,
          height: 32,
        }}
        progress={{
          color: '#F44336',
          type: 'Material',
          trackWidth: 5,
          direction: 'counter-clockwise',
        }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[6]}
        onPress={handlePress(6)}
        width={100}
        height={100}
        borderRadius={5}
        background={{
          gradient: {
            type: 'sweep',
            colors: ['cyan', 'magenta', 'yellow', 'cyan'],
            center: [50, 50],
          },
        }}
        text={{ size: 16, label: 'Button', color: '#000000' }}
        progress={{ color: '#F44336', type: 'Pacman' }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[7]}
        onPress={handlePress(7)}
        background={{ color: '#424242' }}
        borderRadius={10}
        width={width - 40}
        text={{ size: 16, label: 'Button With Stroke', color: '#FFFFFF' }}
        progress={{ color: '#F44336', type: 'Pulse' }}
        stroke={{ color: '#F44336', width: 1, dashWidth: 1, dashGap: 1 }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[8]}
        onPress={handlePress(8)}
        background={{ color: '#424242' }}
        borderRadius={10}
        width={width - 40}
        height={50}
        text={{ size: 16, label: 'Button With Image', color: '#FFFFFF' }}
        image={{
          normalSource: require('./ic_png.png'),
          width: 32,
          height: 32,
        }}
        imageDirection={'left'}
        progress={{
          color: '#F44336',
          type: 'UIActivity',
          count: 12,
          trackWidth: 4,
        }}
        stroke={{ color: '#F44336', width: 3, dashWidth: 6, dashGap: 3 }}
      />
      <View style={styles.box} />
      <SkiaButton
        currentState={loading[9]}
        onPress={handlePress(9)}
        progress={{
          color: '#F44336',
          type: 'Wave',
          waveMode: 'fill',
          count: 4,
          waveFactor: 0.54,
        }}
        state={{
          idle: {
            background: { color: '#424242' },
            borderRadius: 10,
            width: width - 40,
            height: 50,
            text: { size: 16, label: 'Button With State', color: '#FFFFFF' },
            image: {
              normalSource: require('./ic_png.png'),
              width: 32,
              height: 32,
            },
            imageDirection: 'left',
          },
          loading: {},
          succeeded: {
            isRevetSize: false,
            background: { color: '#00FF00' },
            image: {
              normalSource: require('./ic_png.png'),
              width: 32,
              height: 32,
            },
          },
          failed: {
            isRevetSize: false,
            background: {
              gradientName: 'Angel Care',
              gradient: { type: 'linear' },
            },
            image: {
              normalSource: require('./ic_png.png'),
              width: 32,
              height: 32,
            },
          },
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}
    >
      <DifferentIndicator />
      {/* <DifferentButton /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    height: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#014689',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 50,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
