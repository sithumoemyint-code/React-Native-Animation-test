import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const App = () => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const doubleTapRef = useRef()

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: Math.max(scale.value, 0) }
    ]
  }))

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) scale.value = withDelay(500, withSpring(0))
    })
  }, [])

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) opacity.value = withDelay(500, withTiming(1));
    })
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <TapGestureHandler
          waitFor={doubleTapRef}
          onActivated={onSingleTap}
        >
          <TapGestureHandler 
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}
          >
            <Animated.View>
              <ImageBackground 
                source={require('./assets/image.jpeg')}
                style={styles.image}
              >
                <AnimatedImage 
                  source={require('./assets/heart.png')}
                  style={[
                    styles.shadowContainer,
                    rStyle
                  ]}
                  resizeMode={'center'}
                />
              </ImageBackground>
              <Animated.Text style={[styles.turtles, rTextStyle]}>
                🐢🐢🐢🐢
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

export default App

const { width: SIZE } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  shadowContainer: {
    // elevation: 10,
    width: SIZE,
    height: SIZE
  },
  turtles: { fontSize: 40, textAlign: 'center', marginTop: 30 },
})