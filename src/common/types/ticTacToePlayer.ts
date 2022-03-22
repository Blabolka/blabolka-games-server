import { TicTacToeCellValuesEnum } from '@entityTypes/ticTacToe'

export type TicTacToePlayer = {
    id: string
    value: TicTacToeCellValuesEnum
    isTurnToStartGame: boolean
}

export type TicTacToePlayerRoles = {
    firstPlayer: TicTacToePlayer
    secondPlayer: TicTacToePlayer
}
