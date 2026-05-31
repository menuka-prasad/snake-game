import { Coordinate } from '@/types/types';
import React, { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native';

const fruitEmojis = ["🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍒", "🍍", "🥝"];


function getRandomFruitEmoji() {
    const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    return fruitEmojis[randomIndex];
}


const Food = ({ x, y }: Coordinate) => {
    const fruit = useMemo(() => getRandomFruitEmoji(), [x, y]);
  return (
    <Text style={[{ top: y * 10, left: x* 10}, styles.food]}>{fruit}</Text>
  )
  
}

export default Food

const styles = StyleSheet.create({
    food: {
        width: 30,
        height: 30,
        position: "absolute",
        borderRadius: 7,
        fontSize: 20,
    }
})