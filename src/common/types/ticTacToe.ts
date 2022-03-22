export enum TicTacToeCellValuesEnum {
    X = 'X',
    O = 'O',
}

type TicTacToeCellPosition = {
    rowIndex: number
    columnIndex: number
}

type TicTacToeCellProps = {
    isClicked: boolean
    value: TicTacToeCellValuesEnum | null
}

export type CellFullData = {
    cellPosition: TicTacToeCellPosition
    cellData: TicTacToeCellProps
}

export enum TicTacToeGridSizesEnum {
    THREE_BY_THREE = '3x3',
    FIVE_BY_FIVE = '5x5',
    SEVEN_BY_SEVEN = '7x7',
}
