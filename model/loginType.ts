export interface loginType {
    nameCase?: string,
    email: string;
    password: string;
    generalErrorMessage?: string;
    subErrorMessage?: string;
    validatedErrorMessageForEmail?: string;
}
export enum userGroup{
    HR = 'Human Resources',
    Finance = 'Finance'
}