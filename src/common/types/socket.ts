export enum TicTacToeActionsEnum {
    PLAYER_JOIN_ROOM_FROM_CLIENT = 'player-join-room-from-client',
    ROOM_IS_FULL_FROM_SERVER = 'room-is-full-from-server',
    GAME_WAS_STARTED_FROM_SERVER = 'game-was-started-from-server',
    WAIT_MORE_PLAYERS_FROM_SERVER = 'wait-more-players-from-server',
    PLAYER_MADE_MOVE_FROM_CLIENT = 'player-made-move-from-client',
    PLAYER_MADE_MOVE_FROM_SERVER = 'player-made-move-from-server',
    PLAYER_LEAVE_GAME_FROM_SERVER = 'player-leave-game-from-server',
    PLAYER_WANT_PLAY_AGAIN_FROM_CLIENT = 'player-want-play-again-from-client',
    PLAYER_WANT_PLAY_AGAIN_FROM_SERVER = 'player-want-play-again-from-server',
}
