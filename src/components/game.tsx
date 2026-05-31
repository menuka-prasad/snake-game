import { Colors } from '@/styles/colors'
import { Coordinate, Direction, GestureEventType } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Snake from './Snake'
import checkGameOver from '@/utils/checkGameOver'
import Food from './Food'
import checkEatFood from '@/utils/checkEatFood'
import randomFoodPosition from '@/utils/randomFoodPosition'
import Header from './Header'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]; // here we create array of positions because we need to track each part of snake
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const MOVE_INTERVAL = 50;  // in miliseconds
const SCORE_INCREAMENT = 10;
const GAME_BOUNDS = { xMin: 0, xMax: 39, yMin: 0, yMax: 89 } // for now hardcoded. later have to replace

const game = () => {

  const [direction, setDirection] = useState<Direction>(Direction.Right)
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);

  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake()
      }, MOVE_INTERVAL)
      return () => clearInterval(intervalId) // this will prevent memory leaks

    }
  }, [snake, isGameOver, isPaused])


  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent

    if (Math.abs(translationX) > Math.abs(translationY)) {
      // move horizontally
      if (translationX > 0) {
        // move right
        setDirection(Direction.Right)
      } else {
        // move left
        setDirection(Direction.Left)
      }

    } else {
      // move vertically
      if (translationY > 0) {
        // move bottom
        setDirection(Direction.Down)
      } else {
        // move top
        setDirection(Direction.Up)
      }
    }
  }


  // move snake function
  const moveSnake = () => {
    const snakeHead = snake[0]
    const newHead = { ...snakeHead }  // creates a copy of snakeHead

    // check for game over
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev)
      return
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    // eat food and grow snake
    if (checkEatFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
      setSnake([newHead, ...snake])
      setScore((prev) => prev + SCORE_INCREAMENT)
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]) /// this will just update snakeHead and keep others as it is. ...snake accounts for remaining parts of snake

    }





  }

  const pauseGame = () => {
    setIsPaused((prev) => !prev)
  }

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setIsPaused(false)
    setScore(0)
    setDirection(Direction.Right)
  }


  return (

    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text>
            {score}
          </Text>
          </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  )
}

export default game

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },

  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
});
