/**
 * HaloButton Component - React Native
 * Neon Halo Glow Button with Explosion Effect
 */

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface HaloButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  style?: any;
}

export const HaloButton: React.FC<HaloButtonProps> = ({
  onPress,
  children,
  disabled = false,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;

    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Vibration.vibrate(10);
    }

    // Scale down animation
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Scale back animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled) {
      // Heavy haptic for success
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        Vibration.vibrate([50, 50, 50]);
      }
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ scale: scaleAnim }] },
          disabled && styles.disabled,
        ]}
      >
        <LinearGradient
          colors={['#A855F7', '#FB923C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{children}</Text>
        </LinearGradient>

        {/* Halo Glow */}
        <LinearGradient
          colors={['rgba(168, 85, 247, 0.5)', 'rgba(251, 146, 60, 0.4)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.halo}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  animatedContainer: {
    borderRadius: 999,
    overflow: 'visible',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  halo: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 999,
    zIndex: -1,
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});

/**
 * Usage Example:
 *
 * <HaloButton onPress={() => console.log('Roasted!')}>
 *   ROAST! 🔥
 * </HaloButton>
 */
