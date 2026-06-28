import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Coordinate } from '../types/GestureEventType'

// Must match the cell size used in Snake.tsx
const CELL_SIZE = 15

interface FoodProps {
  x: number
  y: number
}

const Food = ({ x, y }: FoodProps) => {
  return (
    <View
      style={[
        styles.food,
        {
          left: x * CELL_SIZE,
          top: y * CELL_SIZE,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  food: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 4,
    backgroundColor: '#e17055',
    position: 'absolute',
  },
})

export default Food