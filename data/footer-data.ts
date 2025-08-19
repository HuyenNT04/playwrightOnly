import { footerColumn, footerLinksTypes } from "../model/header-footer-blockType";
import { HOMEPAGE } from "../utils/constant";
import { optimizeLinks } from "../utils/helperFunctions";

const makeLinks = (columnName: footerColumn, items: string[]) =>
    items.map((itemName) => ({
        columnName,
        itemName,
        url: new URL(optimizeLinks(itemName), HOMEPAGE).toString()
    }));

export const footerLinks: footerLinksTypes[] = [
    ...makeLinks("Information", [
        'Sitemap',
        'Shipping & Returns',
        'Privacy Notice',
        'Conditions of Use',
        'About us',
        'Contact us'
    ]),
    ...makeLinks("Customer service", [
        'Search',
        'News',
        'Blog',
        'Recently viewed products',
        'Compare products list',
        'New products'
    ]),
    ...makeLinks("My account",[
        'My account',
        'Orders',
        'Addresses',
        'Shopping cart',
        'Wishlist',
    ])
]