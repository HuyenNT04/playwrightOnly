import { headerTopMenuTypes, headerTypeWhenNotLogin } from "../model/header-footer-blockType";
import { HOMEPAGE, LOGIN_PAGE, REGISTER_PAGE, SHOPPING_CART_PAGE, WISHLIST_PAGE } from "../utils/constant";

export const headerLinksWhenNotLogin: headerTypeWhenNotLogin[] = [
    {
        nameLink: "Register",
        url: REGISTER_PAGE
    },
    {
        nameLink: "Log in",
        url: LOGIN_PAGE
    },
    {
        nameLink: "Shopping cart",
        url: SHOPPING_CART_PAGE
    },
    {
        nameLink: "Wishlist",
        url: WISHLIST_PAGE
    }
]

export const headerTopMenu: headerTopMenuTypes[] = [
    {
        itemName: "Books",
        url: HOMEPAGE + "books",
    },
    {
        itemName: "Computers",
        url: HOMEPAGE + "computers",
    },
    {
        itemName: "Electronics",
        url: HOMEPAGE + "electronics",
    },
    {
        itemName: "Apparel & Shoes",
        url: HOMEPAGE + "apparel-shoes",
    },
    {
        itemName: "Digital downloads",
        url: HOMEPAGE + "digital-downloads",
    },
    {
        itemName: "Jewelry",
        url: HOMEPAGE + "jewelry",
    },
    {
        itemName: "Gift Cards",
        url: HOMEPAGE + "gift-cards",
    }
]
export const headerLocator = '';