export interface LoginInterface{
    email: string,
    password: string
}

export interface SignupInterface{
    email: string,
    firstName: string,
    lastName:string,
    dateOfBirth:string,
    password:string,
    conformPassword:string,
}

export interface User{
    id:number,
    email: string,
    firstName: string,
    lastName:string,
    dateOfBirth:string,
}