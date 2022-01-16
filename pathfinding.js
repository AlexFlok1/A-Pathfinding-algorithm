class VertexNode {
    f = 0
    g = 0
    h = 0
    x = null
    y = null
    neighbors = []
    prev = null

    constructor( x, y ){
        this.x = x
        this.y = y
    }

    addNeighbor = ( neighbor ) => {
       this.neighbors.push( neighbor )
    }
}

removeFromArr = ( arr, item ) => {
    arr.splice( arr.filter( ( el, indx ) => {
        if( el.x === item.x && el.y === item.y ){
            return indx
        }
    }  )[0], 1 )
}

class EasyPath {

    start = null
    end = null
    gridSize = null
    openSet = []
    closedSet = []

    constructor( start, end, gridSize ){

        this.start = start
        this.end = end
        this.gridSize = gridSize
    }

    calculate = () => {

        let grid =  this.buildNodes( this.gridSize[0], this.gridSize[1] )
        
        this.openSet = [ grid[ this.start[0] ][ this.start[1] ] ]
        let endVertex = grid[ this.end[0] ][ this.end[1] ]
        let winner = 0
        let current = grid[ this.start[0] ][ this.start[1] ]

        //lets find the best path
        while ( this.openSet.length > 0 ){
            
            for( let i =0; i < this.openSet.length; i++ ){
                if( current.f > this.openSet[i].f ){
                    winner = i
                }
            }

            current = this.openSet[winner]

            if( current === endVertex ){

                let path = []
                let temp = current
                path.push( [ current.x, current.y ] )

                while( temp.prev ){
                    path.push( [ temp.prev.x, temp.prev.y ] )
                    temp = temp.prev
                }
                return path
            }

            removeFromArr( this.openSet, current )
            this.closedSet.push( current )

            let neighbors = current.neighbors
            for( let i = 0; i < neighbors.length; i++ ){
                if( !this.closedSet.includes( neighbors[i] ) ){
                    let tempG = current.g + 1
                    if( !this.openSet.includes( neighbors[i] ) ){
                        neighbors[i].g = tempG
                        this.openSet.push( neighbors[i] )
                    }
                    else{
                        if( tempG < neighbors[i].g ){
                            neighbors[i].g = tempG
                        }
                    }

                    neighbors[i].h = Math.abs( neighbors[i].x - endVertex.x ) + Math.abs( neighbors[i].y - endVertex.y )
                    neighbors[i].f = neighbors[i].g + neighbors[i].h
                    neighbors[i].prev = current
                }
            }


        }
        return 'no solution'
    }

    buildNodes = ( sizeX, sizeY ) => {

        let arr = new Array(sizeX).fill( new Array( sizeY ).fill(0) )

        for( let i = 0; i < sizeX; i++ ){
            let buf = []
            for( let j = 0; j < sizeY; j++ ){
                let newNode = new VertexNode( i, j )
                buf.push( newNode )
            }
            arr[i] = buf
        }
        for( let i = 0; i < sizeX; i++ ){
            for( let j = 0; j < sizeY; j++ ){
                if( i > 0 ){
                    arr[i][j].addNeighbor( arr[i - 1][j] )
                }
                if( i < sizeX - 1 ){
                    arr[i][j].addNeighbor( arr[i + 1][j] )
                }
                if( j > 0 ){
                    arr[i][j].addNeighbor( arr[i][j-1] )
                }
                if( j < sizeY - 1 ){
                    arr[i][j].addNeighbor( arr[i][j+1] )
                }
            }
        }
        return arr
    }

}

let test = new EasyPath( [ 3, 3 ], [ 2, 1 ], [ 5, 5 ] ).calculate()
console.log(test)