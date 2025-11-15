/**
 * GlassCard Component - React Native
 * Ultra-Premium Glassmorphism 2025
 */

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'basic' | 'neon' | 'adaptive-light' | 'adaptive-dark';
  style?: any;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'basic',
  style,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'neon':
        return ['rgba(168, 85, 247, 0.1)', 'rgba(251, 146, 60, 0.05)'];
      case 'adaptive-light':
        return ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.1)'];
      case 'adaptive-dark':
        return ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.2)'];
      default:
        return ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)'];
    }
  };

  const getBorderColor = () => {
    return variant === 'neon'
      ? 'rgba(168, 85, 247, 0.5)'
      : 'rgba(255, 255, 255, 0.1)';
  };

  return (
    <View style={[styles.container, style]}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="dark" style={styles.blur}>
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { borderColor: getBorderColor() }]}
          >
            {children}
          </LinearGradient>
        </BlurView>
      ) : (
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientAndroid, { borderColor: getBorderColor() }]}
        >
          {children}
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
    borderRadius: 24,
  },
  gradient: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 8,
  },
  gradientAndroid: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 15, 15, 0.8)',
    elevation: 8,
  },
});

/**
 * Usage Example:
 *
 * <GlassCard variant="neon">
 *   <Text style={{ color: 'white', fontSize: 20 }}>
 *     RoastArena 🔥
 *   </Text>
 * </GlassCard>
 */
