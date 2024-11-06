export default function() {
    const table = []
    let row = []

    for (let i = 1; i < 10; i++) {
        row.push({
            id: i,
            icon: null,
            checked: false,
            background: 'text-bg-dark'
        })

        if (row.length === 3) {
            table.push(row)
            row = []
        }
    }

    return table
}