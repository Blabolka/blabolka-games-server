import { Server } from 'socket.io'
import { NUMBER_PARTICIPANTS_OF_FULL_TIC_TAC_TOE_ROOM } from '@constants'

export const isTicTacToeRoomFull: (io: Server, roomId: string) => boolean = (io: Server, roomId: string) => {
    const participants: Set<string> | undefined = io.sockets.adapter.rooms.get(roomId)

    const numberOfParticipants: number = participants ? participants.size : 0

    return numberOfParticipants === NUMBER_PARTICIPANTS_OF_FULL_TIC_TAC_TOE_ROOM
}

export const isTicTacToeRoomEmpty: (io: Server, roomId: string) => boolean = (io: Server, roomId: string) => {
    const participants: Set<string> | undefined = io.sockets.adapter.rooms.get(roomId)

    const numberOfParticipants: number = participants ? participants.size : 0

    return numberOfParticipants === 0
}
