import React from 'react'
import { View, Text } from 'react-native'
import { MotiView } from 'moti'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function NoResults() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
        from={{
          opacity: 0,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: 'timing',
          duration: 600,
        }}
        style={{
          alignItems: 'center',
          backgroundColor: '#E8F5E9', // verde muy claro
          padding: 24,
          borderRadius: 20,
        }}
      >
        <MaterialCommunityIcons
          name="magnify-close"
          size={64}
          color="#81C784" // verde apagado
        />
        <Text style={{ marginTop: 12, color: '#4CAF50', fontSize: 18 }}>
          No se encontraron resultados
        </Text>
      </MotiView>
    </View>
  )
}
