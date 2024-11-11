import {BlurView} from 'expo-blur';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function Test() {
  const animatedIntensity = useSharedValue<number | undefined>(0);

  useEffect(() => {
    animatedIntensity.value = withRepeat(withTiming(100, {duration: 2000}), 100, true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(animatedIntensity.value)
    }, 100)

    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: 'https://source.unsplash.com/300x300'}}/>
        <Text style={styles.blurredText}>This text is blurred</Text>

        <AnimatedBlurView
          style={styles.blurView}
          tint={'dark'}
          intensity={animatedIntensity}
        >

          <Text style={styles.nonBlurredText}>text</Text>

        </AnimatedBlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  blurredText: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'rgb(120,20,20)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 5,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    paddingTop: 20,
  },
  nonBlurredText: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgb(120,20,20)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  slider: {
    position: 'absolute',
    bottom: 10,
  },
});