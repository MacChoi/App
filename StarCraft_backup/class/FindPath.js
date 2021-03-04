var TilePosition = {
    x: 0,
	y: 0
};

const toKey = (x, y) => `${x}x${y}`;

function findPath(start, target, groundLayer, wallsLayer){
    // no path if select invalid tile
    if (!groundLayer.getTileAt(target.x, target.y)) {
        return [];
    }
    // no path if select a wall
    if (wallsLayer.getTileAt(target.x, target.y)) {
        return [];
    }
    const queue = [];
    const parentForKey = {};
    const startKey = toKey(start.x, start.y);
    const targetKey = toKey(target.x, target.y);
    parentForKey[startKey] = {
        key: '',
        position: { x: -1, y: -1 }
    };
    queue.push(start);
    while (queue.length > 0) {
        const { x, y } = queue.shift();
        const currentKey = toKey(x, y);
        if (currentKey === targetKey) {
            break;
        }
        const neighbors = [
            { x, y: y - 1 },
            { x: x + 1, y },
            { x, y: y + 1 },
            { x: x - 1, y } // left
        ];
        for (let i = 0; i < neighbors.length; ++i) {
            const neighbor = neighbors[i];
            const tile = groundLayer.getTileAt(neighbor.x, neighbor.y);
            if (!tile) {
                continue;
            }
            if (wallsLayer.getTileAt(neighbor.x, neighbor.y)) {
                continue;
            }
            const key = toKey(neighbor.x, neighbor.y);
            if (key in parentForKey) {
                continue;
            }
            parentForKey[key] = {
                key: currentKey,
                position: { x, y }
            };
            queue.push(neighbor);
        }
    }
    const path = [];
    
    let currentKey = targetKey;
    let currentPos = parentForKey[targetKey].position;
    while (currentKey !== startKey) {
        const pos = groundLayer.tileToWorldXY(currentPos.x, currentPos.y);
        pos.x += groundLayer.tilemap.tileWidth * 0.5;
        pos.y += groundLayer.tilemap.tileHeight * 0.5;
        path.push(pos);
        const { key, position } = parentForKey[currentKey];
        currentKey = key;
        currentPos = position;
    }
    return path.reverse();
};