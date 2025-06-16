import React from 'react'
import { View } from 'react-native'
import { MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'

export default function WaveLoading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {[...Array(3).keys()].map((index) => (
        <MotiView
          key={index}
          from={{
            opacity: 1,
            scale: 0,
          }}
          animate={{
            opacity: 0,
            scale: 3,
          }}
          transition={{
            type: 'timing',
            duration: 2000,
            easing: Easing.out(Easing.ease),
            delay: index * 400,
            loop: true,
            repeatReverse: false,
          }}
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#66bb6a',
          }}
        />
      ))}

      <MotiView
        from={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          loop: true,
          type: 'spring',
          duration: 800,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#2e7d32',
          zIndex: 1,
        }}
      />
    </View>
  )
}
