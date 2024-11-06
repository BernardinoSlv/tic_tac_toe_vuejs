export default function(table) {
    let row = undefined
    let column = undefined
    let diagonal = undefined

    if (row = checkRows(table))
        return {row}
    else if (column = checkColumns(table)) 
        return {column}
    else if (diagonal = checkDiagonals(table)) 
        return {diagonal}
}
/**
 * Checa linhas para ver se ganhou 
 * 
 * @param {*} table 
 * @returns 
 */
function checkRows(table) {
    let index = null;

    table.filter((row, indexRow) => {
        let sequence = {
            icon: null,
            count: 0
        };
        for (let field of row) {
            if (!field.checked) 
                break
            if (sequence.icon && sequence.icon !== field.icon)
                break;
            sequence.icon = field.icon
            sequence.count++
        }

        if (sequence.count === 3) {
            index = indexRow + 1
            return true
        }
    })
    return index
}

/**
 * Checa pela coluna
 * 
 * @param {*} table 
 * @returns 
 */
function checkColumns(table) {
    for (let column = 0; column < 3; column++) {
        const row1 = table[0][column]
        const row2 = table[1][column]
        const row3 = table[2][column]

        if (row1.icon && row1.icon === row2.icon && row1.icon === row3.icon) {
            return column + 1
        }
    }
}

/**
 * checa pela diagonal 
 * @param {*} table 
 */
function checkDiagonals(table) {
    const startDiagonalTop = table[0][0] // [x, -, -]
    const startDiagonalBottom = table[2][2] // [-, -, x]

    const diagonalMiddle = table[1][1] // [-, x, -]

    const endDiagonalTop = table[0][2] // [-, -, x]
    const endDiagonalBottom = table[2][0] // [x, -, -]

    if (
        startDiagonalTop.icon && 
        startDiagonalTop.icon === startDiagonalBottom.icon && 
        startDiagonalTop.icon === diagonalMiddle.icon
    ) 
        return "start"
    else if (
        endDiagonalTop.icon && 
        endDiagonalTop.icon === endDiagonalBottom.icon && 
        endDiagonalTop.icon === diagonalMiddle.icon
    ) 
        return "end"
}