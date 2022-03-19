import { RestartRoomUsers, AllTypesOfPlayers } from '@entityTypes/restartGame'

class RestartGameManager {
    private restartGameUsersByRoom: RestartRoomUsers[]

    constructor() {
        this.restartGameUsersByRoom = []
    }

    public getRoomById(roomId: string): RestartRoomUsers | undefined {
        return this.restartGameUsersByRoom.find((roomInfo: RestartRoomUsers) => roomInfo.roomId === roomId)
    }

    public addPlayerWantRestartToRoom(roomId: string, player: AllTypesOfPlayers): RestartRoomUsers {
        let room: RestartRoomUsers | undefined = this.getRoomById(roomId)

        if (!room) {
            room = this.createRoom(roomId)
        }

        RestartGameManager.addPlayerToRoom(room, player)
        return room
    }

    public removeRestartGameRoom(roomId: string): void {
        this.restartGameUsersByRoom = this.restartGameUsersByRoom.filter((roomInfo: RestartRoomUsers) => {
            return roomInfo.roomId !== roomId
        })
    }

    private createRoom(roomId: string): RestartRoomUsers {
        const room: RestartRoomUsers = {
            roomId: roomId,
            players: [],
        }

        this.restartGameUsersByRoom.push(room)

        return room
    }

    private static addPlayerToRoom(room: RestartRoomUsers, newPlayer: AllTypesOfPlayers) {
        const isUserExists: boolean = room.players.some((player: AllTypesOfPlayers) => player.id === newPlayer.id)

        if (!isUserExists) {
            room.players.push(newPlayer)
        }
    }
}

const RestartManager: RestartGameManager = new RestartGameManager()

export default RestartManager
