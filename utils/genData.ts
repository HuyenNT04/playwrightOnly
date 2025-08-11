//generate Random data
//Static: Không cần khởi tạo class đó lên, chỉ cần gọi trực tiếp class tới tên hàm Generate.
export class Generate {
    static generateRandomString(jobTitles: string[]): string {
        const randomIndex = Math.floor(Math.random() * jobTitles.length);
        return jobTitles[randomIndex];
    }

    static generatePayGradeName(): string {
        return 'Pay Grace Name ' + Math.floor(Math.random() * 999);
    }

    static generateRandomName(length: number): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomName = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomName += characters[randomIndex];
        }
        return randomName;
    }

    static generateRandomNumber(length: number): string {
        const digits = '0123456789'; // Only contains number is 0-9
        let randomNumber = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            randomNumber += digits[randomIndex];
        }
        return randomNumber;
    }
}
