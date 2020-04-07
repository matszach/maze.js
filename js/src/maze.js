class MazeNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.top = false;
        this.bottom = false;
        this.right = false;
        this.left = false;
    }
}

const DIR = {
    TOP: 0, BOTTOM: 1, RIGHT: 2, LEFT: 3
};


class Maze {

    constructor(xSize, ySize) {
        this.nodes = new Gmt.Table2D(xSize, ySize);
        let x = parseInt(xSize/2);
        let y = parseInt(ySize/2);
        this.putNodeIfInRange(x, y, new MazeNode(x, y));
    }

    putNodeIfInRange(x, y, node) {
        if(this.nodes.isInRange(x, y)) {
            this.nodes.put(x, y, node);
            return true;
        }
        return false;
    }

    nodeExists(x, y) {
        return this.nodes.isInRange(x, y) && !this.nodes.get(x, y);
    }

    getRandomOpenNode() {
        let possibleNodes = [];
        this.nodes.iter((x, y, v) => {
           if(!!v) {
               if( (!v.top && this.nodeExists(x, y - 1)) ||
                   (!v.bottom && this.nodeExists(x, y + 1)) ||
                   (!v.left && this.nodeExists(x - 1, y)) ||
                   (!v.right && this.nodeExists(x + 1, y))) {
                    possibleNodes.push(v);
                }
            }
        });
        return Gmt.choice(possibleNodes);
    }

    addNeighbour(node) {
        if(!node) {
            return false;
        }
        let possibleDirections = [];
        if(!node.top) {
            possibleDirections.push(DIR.TOP);
        }
        if(!node.bottom) {
            possibleDirections.push(DIR.BOTTOM);
        }
        if(!node.right) {
            possibleDirections.push(DIR.RIGHT);
        }
        if(!node.left) {
            possibleDirections.push(DIR.LEFT);
        }
        let n;
        switch(Gmt.choice(possibleDirections)) {
            case DIR.TOP: 
                node.top = true;
                n = new MazeNode(node.x, node.y - 1);
                n.bottom = true;
                this.putNodeIfInRange(node.x, node.y - 1, n);
                break;
            case DIR.BOTTOM: 
                node.bottom = true;
                n = new MazeNode(node.x, node.y + 1);
                n.top = true;
                this.putNodeIfInRange(node.x, node.y + 1, n);
                break;
            case DIR.RIGHT: 
                node.right = true;
                n = new MazeNode(node.x + 1, node.y);
                n.left = true;
                this.putNodeIfInRange(node.x + 1, node.y, n);
                break;
            case DIR.LEFT: 
                node.left = true;
                n = new MazeNode(node.x - 1, node.y);
                n.right = true;
                this.putNodeIfInRange(node.x - 1, node.y, n);
                break;
            default:
                break;
        }
        return true;
    }

    add() {
        let n = this.getRandomOpenNode();
        this.addNeighbour(n);
    }


}