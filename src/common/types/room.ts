import { TicTacToeGridSizesEnum } from '@entityTypes/ticTacToe'

export type RoomModelType = {
    _id?: string
    roomId: string
} & RoomBase

export type RoomBase = {
    roomType: TicTacToeGridSizesEnum
    roomInfo: TicTacToeRoomParams
    isPrivate: boolean
    password?: string
}

export type TicTacToeRoomParams = {
    gridSize: TicTacToeGridSizesEnum
    valuesInRowToWin: number
}

export enum RoomTypesEnum {
    TIC_TAC_TOE = 'tic-tac-toe',
}
