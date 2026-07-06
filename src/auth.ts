import { User } from "./user";

export function authenticate(token: string): User | null {
    if (token === "secret-token") {
        return {
            id: 1,
            name: "Girish",
            email: "girish@example.com",
        };
    }

    return null;
}


export function login(email: string, passwrod: string ) {
    return "logged in"
}