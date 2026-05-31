import { Colors } from '@/styles/colors';
import { Coordinate } from '@/types/types'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native';

interface SnakeProps {
    snake: Coordinate[];
}

const Snake = ({snake}: SnakeProps) => {
  return (
    // fragment is same as empty tags
    <Fragment>
        {snake.map((segment: Coordinate, index: number) => {
            const segmentStyle = {
                // we can change this value of 10. it basically accounts for step that snake moves
                left: segment.x * 10,
                top: segment.y * 10
            }

            return <View key={index} style={[styles.snake, segmentStyle]} />
        })}
    </Fragment>
  )
}

export default Snake


const styles = StyleSheet.create({
    snake: {
        width: 14,
        height: 14,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: Colors.primary
    }
})