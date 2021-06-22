import { PARSING_ERROR } from "./util";
const fs = require('fs');
const path = require('path')

export function readDragons() {
    try {
        const filePath = `${path.join(__dirname, '..', '..', '..', 'dragons.json')}`;
        const dragonsArray = JSON.parse(fs.readFileSync(filePath)).map(i => [i[Object.keys(i)[0]], Object.keys(i)[0]]);
        const dragons: Map<string, string> = new Map(dragonsArray);
        return dragons;
    } catch (error) {
        throw PARSING_ERROR;
    }
}