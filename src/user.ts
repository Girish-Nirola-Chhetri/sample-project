export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export function printUser(user: User) {
    console.log(user);
}