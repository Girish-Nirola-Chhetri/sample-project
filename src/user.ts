export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export function printUser(user: User) {
    console.log(user);
}

export function add( a: number, b: number) {
    return a+b 
}