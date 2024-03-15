import * as path from "path";

const BASE_PATH = path.resolve(__dirname, '..')
const DATABASE_DIR_NAME = 'database'
const DATABASE_FILE_NAME = 'database.json'
const DATABASE_PATH = path.resolve(BASE_PATH, DATABASE_DIR_NAME)
const DATABASE_FILE_PATH = path.resolve(DATABASE_PATH, DATABASE_FILE_NAME)

export const CONFIG = {
    DATABASE_DIR_NAME,
    DATABASE_FILE_NAME,
    DATABASE_FILE_PATH,
    DATABASE_PATH,
    BASE_PATH
}
