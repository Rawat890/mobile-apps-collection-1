import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Coordinate, Direction } from '../types/GestureEventType'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  FOOD_INITIAL_POSITION,
  MOVE_INTERVAL,
  SNAKE_INITIAL_POSITION,
  GAME_BOUNDS,
} from '../utils/constants'
import Snake from './Snake'
import Food from './Food'
import { checkGameOver } from '../utils/checkGameOver'
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'

type GestureEventType = PanGestureHandlerGestureEvent;

const Game = () => {
  const directionRef = useRef<Direction>(Direction.RIGHT)
  const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT)
  const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION)
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
  const [isPaused, setIsPaused] = React.useState<boolean>(false)
  const [score, setScore] = React.useState<number>(0)

  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        if (!isPaused) moveSnake()
      }, MOVE_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [snake, isGameOver, isPaused])

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent
    console.log(event.nativeEvent);
  console.log("X:", translationX, "Y:", translationY);

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        directionRef.current = Direction.RIGHT
        setDirection(Direction.RIGHT)
      } else {
        directionRef.current = Direction.LEFT
        setDirection(Direction.LEFT)
      }
    } else {
      if (translationY > 0) {
        // Finger moved DOWN → snake goes DOWN
        directionRef.current = Direction.DOWN
        setDirection(Direction.DOWN)
      } else {
        // Finger moved UP → snake goes UP
        directionRef.current = Direction.UP
        setDirection(Direction.UP)
      }
    }
  }

  const moveSnake = () => {
    const snakeHead = snake[0]
    const newSnakeHead = { ...snakeHead }

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(true)
      return
    }

    switch (directionRef.current) {
      case Direction.UP:
        newSnakeHead.y -= 1
        break
      case Direction.DOWN:
        newSnakeHead.y += 1
        break
      case Direction.LEFT:
        newSnakeHead.x -= 1
        break
      case Direction.RIGHT:
        newSnakeHead.x += 1
        break
    }

    if (checkEatsFood(newSnakeHead, food, 2)) {
      // ✅ FIX: grow the full snake (keep all segments)
      setSnake([newSnakeHead, ...snake])
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
      setScore(prev => prev + 10)
    } else {
      // ✅ FIX: slice(0, snake.length - 1) not slice(0, 1)
      setSnake([newSnakeHead, ...snake.slice(0, snake.length - 1)])
    }
  }

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setScore(0)
    directionRef.current = Direction.RIGHT
    setDirection(Direction.RIGHT)
  }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SNAKE</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>SCORE</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
        </View>

        {/* Board */}
        <View style={styles.boardWrapper}>
          <View style={styles.board}>
            <Snake snake={snake} />
            <Food x={food.x} y={food.y} />
          </View>
        </View>

        {/* Game Over overlay */}
        {isGameOver && (
          <View style={styles.overlay}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <Text style={styles.finalScore}>Score: {score}</Text>
            <Text style={styles.restartBtn} onPress={reloadGame}>
              [ RESTART ]
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.hint}>SWIPE TO STEER</Text>
          <Text
            style={styles.pauseBtn}
            onPress={() => setIsPaused(p => !p)}
          >
            {isPaused ? '[ RESUME ]' : '[ PAUSE ]'}
          </Text>
        </View>

      </SafeAreaView>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    color: '#39ff14',
    fontSize: 22,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 6,
  },
  scoreBox: {
    alignItems: 'flex-end',
  },
  scoreLabel: {
    color: '#39ff1480',
    fontSize: 10,
    fontFamily: 'monospace',
    letterSpacing: 3,
  },
  scoreValue: {
    color: '#39ff14',
    fontSize: 26,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  boardWrapper: {
    flex: 1,
    padding: 12,
  },
  board: {
    flex: 1,
    backgroundColor: '#0d140d',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1a2e1a',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0a0f0add',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  gameOverText: {
    color: '#ff3c3c',
    fontSize: 36,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 8,
  },
  finalScore: {
    color: '#39ff14',
    fontSize: 18,
    fontFamily: 'monospace',
    marginBottom: 24,
  },
  restartBtn: {
    color: '#39ff14',
    fontSize: 16,
    fontFamily: 'monospace',
    borderColor: '#39ff1460',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  hint: {
    color: '#39ff1440',
    fontSize: 11,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  pauseBtn: {
    color: '#39ff14',
    fontSize: 11,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
})

export default Game