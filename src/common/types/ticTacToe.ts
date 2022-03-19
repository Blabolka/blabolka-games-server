export enum CellValuesEnum {
    X = 'X',
    O = 'O',
}

type CellPosition = {
    rowIndex: number
    columnIndex: number
}

type CellProps = {
    isClicked: boolean
    value: CellValuesEnum | null
}

export type CellFullData = {
    cellPosition: CellPosition
    cellData: CellProps
}
