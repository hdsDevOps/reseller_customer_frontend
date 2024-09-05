declare module "main/user.thunk" {
    export const getUserAuthTokenFromLSThunk: any; // Adjust 'any' to a more specific type if needed
}

declare module "main/CustomError.class" {
    class CustomError extends Error {
        constructor(name: string, message: string);
    }

    export default CustomError;
}

