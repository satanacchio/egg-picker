import { PARSING_ERROR } from "./util";
import { readFileSync } from 'fs';
import { join } from 'path'


export function readDragons() {
    try {
        const filePath: string = `${join(__dirname, '..', '..', '..', 'dragons.json')}`;
        const dragonsArray = JSON.parse(readFileSync(filePath).toString()).map(i => [i[Object.keys(i)[0]], Object.keys(i)[0]]);
        const dragons: Map<string, string> = new Map(dragonsArray);
        return dragons;
    } catch (error) {
        throw PARSING_ERROR;
    }
}