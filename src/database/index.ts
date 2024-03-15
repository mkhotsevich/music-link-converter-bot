import fs from 'fs/promises'
import { CONFIG } from "../config";

export class Database {
    private databaseFilePath = CONFIG.DATABASE_FILE_PATH

    constructor() {}

    public async initialize() {
        try {
            const isDatabaseExist = await this.isFileExist(this.databaseFilePath)

            if (!isDatabaseExist) {
                await this.createDatabaseFile()
            }
        } catch {
            console.error('error while database initializing')
        }
    }

    public async setItem(key: string, value: any) {
        try {
            const database = await this.getDatabase()
            const newDatabase = { ...database, [key]: value }
            await this.saveDatabase(newDatabase)
        } catch {
            console.error('error while set item')
        }
    }

    public async getItem(key: string) {
        try {
            const database = await this.getDatabase()
            return database?.[key]
        } catch {
            console.error('error while get item')
        }
    }

    public async removeItem(key: string) {
        try {
            const database = await this.getDatabase()
            const newDatabase = { ...database }
            delete newDatabase[key]
            await this.saveDatabase(newDatabase)
        } catch {
            console.error('error while remove item')
        }
    }

    private async isFileExist(filePath: string) {
        try {
            await fs.access(filePath)
            return true
        } catch {
            return false
        }
    }

    private async createDatabaseFile() {
        try {
            await fs.open(CONFIG.DATABASE_FILE_PATH, 'w')
        } catch {
            console.error('error while creating database file')
        }
    }

    private async getDatabase() {
        try {
            const buffer = await fs.readFile(this.databaseFilePath, { encoding: 'utf8' })

            if (!buffer) {
                return {}
            }

            return JSON.parse(buffer) as Record<string, any>
        } catch (e) {
            console.error('error while getting database')
        }
    }

    private async saveDatabase(database: Record<string, any>) {
        try {
            await fs.writeFile(this.databaseFilePath, JSON.stringify(database))
        } catch {
            console.error('error while save database')
        }
    }
}
