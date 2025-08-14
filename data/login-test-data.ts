import { loginType } from "../model/loginType";
 
export const validAccountCredentials: loginType = {
    email: "dhjdh@gmail.com",
    password: "123456"
}
 
export const invalidAccountCredentials: loginType[] = [
    {
        nameCase: "wrong password",
        email: "dhjdh@gmail.com",
        password: "fbdhnf",
        generalErrorMessage: "Login was unsuccessful. Please correct the errors and try again.",
        subErrorMessage: "The credentials provided are incorrect"
    },
    {
        nameCase: "wrong email format",
        email: "57839457",
        password: "6789",
        validatedErrorMessageForEmail: "Please enter a valid email address."
    },
    {
        nameCase: "invalid email",
        email: "hfdidsfh@gmail.com",
        password: "",
        generalErrorMessage: "Login was unsuccessful. Please correct the errors and try again.",
        subErrorMessage: "No customer account found"
    },
    {
        nameCase: "blank email",
        email: "",
        password: "fbdhnf",
        generalErrorMessage: "Login was unsuccessful. Please correct the errors and try again.",
        subErrorMessage: "No customer account found",
    },
    {
        nameCase: "blank password",
        email: "dhjdh@gmail.com",
        password: "",
        generalErrorMessage: "Login was unsuccessful. Please correct the errors and try again.",
        subErrorMessage: "The credentials provided are incorrect",
    }
]