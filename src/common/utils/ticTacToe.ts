import { CellValuesEnum } from '@entityTypes/ticTacToe'
import { TicTacToePlayer, TicTacToePlayerRoles } from '@entityTypes/ticTacToePlayer'
import { randomIntBetween } from '@utils/math'

const PLAYER_HAS_VALUE_X: TicTacToePlayer = { id: '1', value: CellValuesEnum.X, isTurnToStartGame: true }
const PLAYER_HAS_VALUE_Y: TicTacToePlayer = { id: '2', value: CellValuesEnum.O, isTurnToStartGame: false }

export const getRandomPlayerRoles: () => TicTacToePlayerRoles = () => {
    const isFirstPlayerStartGame: boolean = randomIntBetween(1, 2) === 1

    return isFirstPlayerStartGame
        ? { firstPlayer: PLAYER_HAS_VALUE_X, secondPlayer: PLAYER_HAS_VALUE_Y }
        : { firstPlayer: PLAYER_HAS_VALUE_Y, secondPlayer: PLAYER_HAS_VALUE_X }
}
