import { View, Text, StyleSheet } from 'react-native'
import React, { Fragment, JSX } from 'react'
import { Coordinate } from '../types/GestureEventType';
import { Colors } from '../styles/colors';

interface SnakeProps {
 snake: Coordinate[];
}
export default function Snake({ snake }: SnakeProps): JSX.Element {
 return (
  <Fragment>
   {snake.map((segment: Coordinate, index: number) => {
    const segmentStyle = {
     left: segment.x * 10,
     top: segment.y * 10
    }
    return <View key={index} style={[styles.container, segmentStyle,]} />
   })}
  </Fragment>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: Colors.primary,
  width: 15,
  height: 15,
  borderRadius: 10,
  margin: 4,
  position: 'absolute'
 }
})