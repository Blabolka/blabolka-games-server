import { TicTacToeGridSizesEnum } from '@entityTypes/ticTacToe'

export interface IRoomModel extends IRoomBase {
    _id?: string
    roomId: string
}

export interface IRoomBase {
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
