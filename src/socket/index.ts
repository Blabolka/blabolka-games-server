import { Server, Socket } from 'socket.io'

import { TicTacToeActionsEnum } from '@entityTypes/socket'
import { RoomTypesEnum } from '@entityTypes/room'
import initTicTacToeSocket from './ticTacToe/ticTacToeSocket'

const initSocket: (io: Server) => void = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        // console.log(socket.request.connection.remoteAddress)

        socket.on(TicTacToeActionsEnum.PLAYER_JOIN_ROOM_FROM_CLIENT, (message: { roomId: string; gameKey: string }) => {
            const { roomId, gameKey }: { roomId: string; gameKey: string } = message

            switch (gameKey) {
                case RoomTypesEnum.TIC_TAC_TOE:
                    initTicTacToeSocket(io, socket, roomId)
                    break
                default:
                    break
            }
        })
    })
}

export default initSocket
