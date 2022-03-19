import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'

import { TicTacToeActionsEnum } from '@entityTypes/socket'
import initTicTacToeSocket from './ticTacToe/ticTacToeSocket'

const initSocket: (httpServer: HttpServer) => HttpServer = (httpServer: HttpServer) => {
    const io: Server = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })

    io.on('connection', (socket: Socket) => {
        // console.log(socket.request.connection.remoteAddress)

        socket.on(TicTacToeActionsEnum.PLAYER_JOIN_ROOM_FROM_CLIENT, (message: { roomId: string; gameKey: string }) => {
            const { roomId, gameKey }: { roomId: string; gameKey: string } = message

            switch (gameKey) {
                case 'tic-tac-toe':
                    initTicTacToeSocket(io, socket, roomId)
                    break
                default:
                    break
            }
        })
    })

    return httpServer
}

export default initSocket
