import { Server, Socket } from 'socket.io'
import { deleteRoomById } from '@db-api/room'
import RestartManager from '@services/RestartGameManager'

import { NUMBER_PARTICIPANTS_OF_FULL_TIC_TAC_TOE_ROOM } from '@constants/ticTacToe'
import { TicTacToeActionsEnum } from '@entityTypes/socket'
import { CellFullData } from '@entityTypes/ticTacToe'
import { TicTacToePlayer, TicTacToePlayerRoles } from '@entityTypes/ticTacToePlayer'
import { AllTypesOfPlayers, RestartRoomUsers } from '@entityTypes/restartGame'

import { getRandomPlayerRoles } from '@utils/ticTacToe'
import { isTicTacToeRoomFull, isTicTacToeRoomEmpty } from '@utils/socket'

const initTicTacToeSocket: (io: Server, socket: Socket, roomId: string) => void = (
    io: Server,
    socket: Socket,
    roomId: string,
) => {
    if (isTicTacToeRoomFull(io, roomId)) {
        socket.emit(TicTacToeActionsEnum.ROOM_IS_FULL_FROM_SERVER)
        return
    }

    socket.join(roomId)

    if (isTicTacToeRoomFull(io, roomId)) {
        const playerRoles: TicTacToePlayerRoles = getRandomPlayerRoles()

        // To last connected user
        socket.emit(TicTacToeActionsEnum.GAME_WAS_STARTED_FROM_SERVER, playerRoles.firstPlayer)
        // To another player
        socket.to(roomId).emit(TicTacToeActionsEnum.GAME_WAS_STARTED_FROM_SERVER, playerRoles.secondPlayer)
    } else {
        socket.emit(TicTacToeActionsEnum.WAIT_MORE_PLAYERS_FROM_SERVER)
    }

    socket.on(TicTacToeActionsEnum.PLAYER_MADE_MOVE_FROM_CLIENT, (message: CellFullData) => {
        socket.to(roomId).emit(TicTacToeActionsEnum.PLAYER_MADE_MOVE_FROM_SERVER, message)
    })

    socket.on(TicTacToeActionsEnum.PLAYER_WANT_PLAY_AGAIN_FROM_CLIENT, (restartPlayer: TicTacToePlayer) => {
        const room: RestartRoomUsers = RestartManager.addPlayerWantRestartToRoom(roomId, restartPlayer)

        if (room.players.length >= NUMBER_PARTICIPANTS_OF_FULL_TIC_TAC_TOE_ROOM) {
            const anotherPlayer: AllTypesOfPlayers | undefined = room.players.find((player: AllTypesOfPlayers) => {
                return player.id !== restartPlayer.id
            })

            if (anotherPlayer) {
                // switch first start move
                restartPlayer.isTurnToStartGame = !restartPlayer.isTurnToStartGame
                anotherPlayer.isTurnToStartGame = !anotherPlayer.isTurnToStartGame

                // To last restarted user
                socket.emit(TicTacToeActionsEnum.GAME_WAS_STARTED_FROM_SERVER, restartPlayer)
                // To another player
                socket.to(roomId).emit(TicTacToeActionsEnum.GAME_WAS_STARTED_FROM_SERVER, anotherPlayer)

                RestartManager.removeRestartGameRoom(roomId)
            }
        }
    })

    socket.on('disconnect', () => {
        io.to(roomId).emit(TicTacToeActionsEnum.PLAYER_LEAVE_GAME_FROM_SERVER)
        RestartManager.removeRestartGameRoom(roomId)

        if (isTicTacToeRoomEmpty(io, roomId)) {
            deleteRoomById(roomId)
        }
    })
}

export default initTicTacToeSocket
