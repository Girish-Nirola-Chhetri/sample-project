export interface User {
    id: number;
    name: string;
    email: string;
}

export function getUserDisplayName(user: User) {
    return `${user.name} <${user.email}>`;
}