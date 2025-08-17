// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({
//   path: path.resolve(__dirname, '../profiles/.env.qa'),
// });

export class Constant {
  static readonly TIMEOUT = {
    ACTION_TIMEOUT: 20 * 1000,
    NAVIGATION_TIMEOUT: 30 * 1000,
    EXPECT_TIMEOUT: 30 * 1000,
    TEST_TIMEOUT: 30 * 1000,
  };
}

//hàm arrow function
const BASE = process.env.BASE_URL;
if (!BASE) {
  throw new Error('❌ BASE_URL is not defined or invalid in .env');
}
const url = (path: string) => new URL(path, BASE).toString();

export const HOMEPAGE = url('/');
export const REGISTER_PAGE = url('/register');
export const LOGIN_PAGE = url('/login');
export const SHOPPING_CART_PAGE = url('/cart');
export const WISHLIST_PAGE = url('/wishlist');
