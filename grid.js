class Grid{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.grid = Array(rows).map(() => Array(columns));

        const terrain = [1, 5, 10, Infinity]

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                let option = Math.floor(Math.random() * 4);
                this.grid[i][j] = terrain[option];
            }
        }
    }
};