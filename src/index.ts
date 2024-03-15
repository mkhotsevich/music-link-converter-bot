import { CONFIG } from "./config";
import {Database} from "./database";

const database = new Database();

(async () => {
    await database.initialize()
    await database.setItem('ggg', 123)
    const value = await database.getItem('ggg')
    console.log(value)
    await database.removeItem('gggd')
})()




