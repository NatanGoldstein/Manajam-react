import { Animated, Dimensions } from 'react-native';
import { searchBarSize } from '../constants/SearchBar';

const { width, height } = Dimensions.get('window');

export const createSearchAnimation = () => {
    return {
        top: new Animated.Value(searchBarSize.top),
        left: new Animated.Value(searchBarSize.left),
        width: new Animated.Value(searchBarSize.width),
        height: new Animated.Value(searchBarSize.height),
        borderRadius: new Animated.Value(20),
    }
  };

export const openSearchAnimation = (animation, animationSpeed, onComplete) => {
  Animated.parallel([
    Animated.timing(animation.top, {
      toValue: 0,
      duration: animationSpeed,
      useNativeDriver: false,
    }),
    Animated.timing(animation.left, {
      toValue: 0,
      duration: animationSpeed,
      useNativeDriver: false,
    }),
    Animated.timing(animation.width, {
      toValue: width,
      duration: animationSpeed,
      useNativeDriver: false,
    }),
    Animated.timing(animation.height, {
      toValue: height,
      duration: animationSpeed,
      useNativeDriver: false,
    }),
    Animated.timing(animation.borderRadius, {
      toValue: 0,
      duration: animationSpeed,
      useNativeDriver: false,
    }),
  ]).start(() => {
    if (onComplete) onComplete();
  });
};

 export const closeSearchAnimation = (animation, animationSpeed) => {
    Animated.parallel([
        Animated.timing(animation.top, {
          toValue: searchBarSize.top,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.left, {
          toValue: searchBarSize.left,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.width, {
          toValue: searchBarSize.width,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.height, {
          toValue: searchBarSize.height,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.borderRadius, {
          toValue: 20,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
      ]).start();
};