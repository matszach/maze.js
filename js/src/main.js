$(window).ready(() => {

    let cvs = new Gmt.CanvasWrapper('canvas-home');
    let maze = new Maze(151, 71);
    const S = 5;

    let ncol = Gmt.rgba(150, 0, 0, 0.5);

    let toVertex = (x, y) => new Gmt.Vertex(S * 3 + x * S * 2, 10 + y * S * 2);

    new Gmt.Loop(1000, loop => {
        cvs.clear();
        maze.add();
        maze.nodes.iter((x, y, v) => {
            if(!!v) {
                let vrt = toVertex(x, y);
                cvs.fillCircle(vrt.toCircle(S/2), ncol);
                if(v.top) {
                    cvs.strokePolyLine(new Gmt.PolyLine().push(vrt).push(toVertex(x, y - 1)), ncol, S/2);
                }
                if(v.bottom) {
                    cvs.strokePolyLine(new Gmt.PolyLine().push(vrt).push(toVertex(x, y + 1)), ncol, S/2);
                }
                if(v.left) {
                    cvs.strokePolyLine(new Gmt.PolyLine().push(vrt).push(toVertex(x - 1, y)), ncol, S/2);
                }
                if(v.right) {
                    cvs.strokePolyLine(new Gmt.PolyLine().push(vrt).push(toVertex(x + 1, y)), ncol, S/2);
                }
            }
        });

    }).start();

});