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
        url: HOMEPAGE + "Books",
    },
    {
        itemName: "Computers",
        url: HOMEPAGE + "Computers",
    },
    {
        itemName: "Electronics",
        url: HOMEPAGE + "Electronics",
    },
    {
        itemName: "Apparel & Shoes",
        url: HOMEPAGE + "Apparel & Shoes",
    },
    {
        itemName: "Digital downloads",
        url: HOMEPAGE + "Digital downloads",
    },
    {
        itemName: "Jewelry",
        url: HOMEPAGE + "Jewelry",
    },
    {
        itemName: "Gift Cards",
        url: HOMEPAGE + "Gift Cards",
    }
]