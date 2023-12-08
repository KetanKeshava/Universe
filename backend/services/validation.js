import { UserInputError } from "../errors/userErrors.js";

const testRegex = (pattern, str) => {
    return pattern.test(str)
}

const  isValidName = (name) => {
    // return testRegex(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/, name)
    return testRegex(/^([A-Za-z]+(?: [A-Za-z]+)*)$/, name)
}

const isValidPassword = (password) => {
    return testRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, password)
}

const  isValidEmail = (email) => {
    return testRegex(/^[A-Za-z0-9._%+-]+@northeastern\.edu$/, email)
}

const isValidUserName = (username) => {
    return testRegex(/^[a-zA-Z0-9]{4,20}$/, username);

}

const validateEmailField = (email) => {
    if (email == null) {
        throw new UserInputError("Email required")
    }
    if (email.length > 60) {
        throw new UserInputError("Email is too long")
    }
    if (!isValidEmail(email)) {
        throw new UserInputError("Email validation failed")
    }
}

const validateNameField = (name) => {
    if (name == null) {
        throw new UserInputError("Name required")
    }
    if (name.length > 60) {
        throw new UserInputError("Name is too long")
    }
    if (!isValidName(name)) {
        throw new UserInputError("Name validation failed")
    }
}

const validatePasswordField = (password) => {
    if (password == null) {
        throw new UserInputError("Password required")
    }
    if (password.length > 60) {
        throw new UserInputError("Password is too long")
    }
    if (!isValidPassword(password)) {
        throw new UserInputError("Password validation failed")
    }
}

const validateUsernameField = (username) => {
    if (username == null) {
        throw new UserInputError("Username required")
    }
    if (username.length > 20) {
        throw new UserInputError("Username is too long")
    }
    if (!isValidUserName(username)) {
        throw new UserInputError("Username validation failed")
    }
}

export {
    validateEmailField,
    validateNameField,
    validatePasswordField,
    validateUsernameField,
}