import { TicTacToeGridSizesEnum } from '@entityTypes/ticTacToe'

// SERVER ONLY INTERFACES
export interface IRoomModel {
    _id?: string
    roomId: string
    roomType: RoomTypesEnum
    roomInfo: TicTacToeRoomParams
    isPrivate: boolean
    passwordHash?: string
}

export interface IPrivateRoom {
    roomType: RoomTypesEnum
    roomInfo: TicTacToeRoomParams
    isPrivate: boolean
    passwordHash?: string
}

// CLIENT INTERFACES
export interface IRoomBaseFromServer {
    roomId: string
    roomType: RoomTypesEnum
    roomInfo: TicTacToeRoomParams
    isPrivate: boolean
}

export interface IRoomBaseFromClient {
    roomType: RoomTypesEnum
    roomInfo: TicTacToeRoomParams
    isPrivate: boolean
    password?: string
}

// Helpers
type TicTacToeRoomParams = {
    gridSize: TicTacToeGridSizesEnum
    valuesInRowToFinish: number
}

export enum RoomTypesEnum {
    TIC_TAC_TOE = 'tic-tac-toe',
}
