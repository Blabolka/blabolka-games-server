import { TicTacToePlayer } from '@entityTypes/ticTacToePlayer'

export type AllTypesOfPlayers = TicTacToePlayer

export type RestartRoomUsers = {
    roomId: string
    players: AllTypesOfPlayers[]
}
