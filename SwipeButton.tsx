import React, { useRef } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

interface SwipeButtonProps {
  onSwipeComplete: () => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipeComplete }) => {
  const screenWidth = Dimensions.get('window').width;
  const trackWidth = screenWidth - 64; // 32px margin on each side
  const buttonSize = 56;
  const maxDragDistance = trackWidth - buttonSize - 16; // 8px padding on each side

  const translateX = useRef(new Animated.Value(0)).current;
  const dragPosition = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateX.setOffset(dragPosition.current);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(0, Math.min(maxDragDistance, gestureState.dx));
        translateX.setValue(newPosition);
      },
      onPanResponderRelease: (_, gestureState) => {
        translateX.flattenOffset();
        const finalPosition = Math.max(0, Math.min(maxDragDistance, dragPosition.current + gestureState.dx));
        const threshold = maxDragDistance * 0.6; // 60% threshold

        if (finalPosition >= threshold) {
          // Swipe completed - animate to end
          Animated.spring(translateX, {
            toValue: maxDragDistance,
            useNativeDriver: false,
          }).start(() => {
            onSwipeComplete();
            // Reset after completion
            setTimeout(() => {
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: false,
              }).start();
              dragPosition.current = 0;
            }, 500);
          });
          dragPosition.current = maxDragDistance;
        } else {
          // Spring back to start
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          dragPosition.current = 0;
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={[styles.track, { width: trackWidth }]}>
        <Text style={styles.text}>Swipe to connect</Text>
        <Text style={styles.arrows}>› › ›</Text>
        <Animated.View
          style={[
            styles.button,
            {
              transform: [{ translateX }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.buttonIcon}>→</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    height: 72,
    justifyContent: 'center',
  },
  track: {
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    position: 'relative',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginLeft: 70, // Space for button
  },
  arrows: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginRight: 16,
  },
  button: {
    position: 'absolute',
    left: 8,
    width: 56,
    height: 56,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SwipeButton;

