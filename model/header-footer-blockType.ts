export interface headerTypeWhenNotLogin {
    nameLink: string,
    url: string
}
export interface headerTopMenuTypes {
    itemName: string,
    url: string
}
export enum testEnum{
    HR = 'Human Resources',
    Finance = 'Finance'
}
export type footerColumn = 'Information' | 'Customer service' | 'My account' | 'Follow us'
export interface footerLinksTypes {
    columnName: footerColumn,
    itemName: string,
    url: string
}