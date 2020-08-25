let img_block = new File().loadImages("object/block/image",10);
class Blocks{
    constructor(objectContainer){
        this.tile =[
            [9,9,9,9,9,9,9,9,9],
            // [8,8,8,8,8,8,8,8,8],
            [7,7,7,7,7,7,7,7,7],
            [6,6,6,6,6,6,6,6,6],
            // [5,5,5,5,5,5,5,5,5],
            [4,4,4,4,4,4,4,4,4],
            [3,3,3,3,3,3,3,3,3],
            [2,2,2,2,2,2,2,2,2],
            [1,1,1,1,1,1,1,1,1],
        ]
        for (let y = 0; y < this.tile.length; y++) {
            for (let x = 0; x < this.tile[y].length; x++) {
                let block = new Block(ID.black,Block.NEW[this.tile[y][x]],
                    x*img_block[0].width+17,y*img_block[0].height+40);
                objectContainer.add(block);
            }
        }
    }
}

class Block extends Frame {
    static NEW = [
        {image :[0]},
        {image :[1]},
        {image :[2]},
        {image :[3]},
        {image :[4]},
        {image :[5]},
        {image :[6]},
        {image :[7]},
        {image :[8]},
        {image :[9]}
    ]
    constructor(id,state,x,y){
        super(id,state,x,y,img_block);
    }

    onCollision(e){
        
    }
}
