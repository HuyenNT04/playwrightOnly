import fs from "fs";
//Handle json file
export class JSONHandling {
    static getTestDataFromJson(filePath: string):Promise<void> {
    try {
        const data: any = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    } catch (error) {
        throw new Error(`Cannot read JSON file with ${filePath}`);
    }
}
}