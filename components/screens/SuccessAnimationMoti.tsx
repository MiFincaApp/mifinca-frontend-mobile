import React from 'react'
import { View } from 'react-native'
import { MotiView } from 'moti'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SuccessAnimation() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
        from={{
          scale: 0,
          opacity: 0,
          rotate: '-15deg',
        }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: '0deg',
        }}
        transition={{
          type: 'spring',
          damping: 12,
          mass: 1,
          stiffness: 180,
        }}
        style={{
          backgroundColor: '#C8E6C9', // fondo verde claro
          padding: 24,
          borderRadius: 100,
          shadowColor: '#2e7d32',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
        }}
      >
        <MaterialCommunityIcons
          name="checkbox-marked-circle"
          size={64}
          color="#4CAF50" // verde de confirmación
        />
      </MotiView>
    </View>
  )
}
