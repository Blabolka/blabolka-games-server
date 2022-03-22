import { TicTacToeGridSizesEnum } from '@entityTypes/ticTacToe'

export type RoomModelType = {
    _id?: string
    roomId: string
} & RoomBase

export type RoomBase = {
    roomType: RoomTypesEnum
    roomInfo: TicTacToeRoomParams
    isPrivate: boolean
    password?: string
}

type TicTacToeRoomParams = {
    gridSize: TicTacToeGridSizesEnum
    valuesInRowToFinish: number
}

export enum RoomTypesEnum {
    TIC_TAC_TOE = 'tic-tac-toe',
}
