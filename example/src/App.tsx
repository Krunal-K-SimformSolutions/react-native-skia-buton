import React, { useCallback, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import {SkiaButton} from 'react-native-skia-button';

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const handlePress = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);

  return (
    <View style={styles.container}>
      <SkiaButton loading={isLoading} onPress={handlePress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  }
});

