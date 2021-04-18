export interface NavigationCardInterface{
    icon: string,
    name: string,
    link: string
}

export interface PasswordInterface{
    id:number,
    hostName:string,
    email:string,
    password:string,
    updatedOn:string
    userId:number
}

export interface AddPasswordInterface {
    passwordId?:number,
    hostName: string,
    email: string,
    password: string,
    originalPassword: string,
}

export interface UpdatePasswordInterface {
    passwordId?:number,
    hostName: string,
    email: string,
    password: string,
    originalPassword: string,
}

export interface DecryptPasswordInterface {
    originalPassword:string,
    passwordId:number
}

export interface DeletePasswordInterface{
    passwordId:number,
    originalPassword:string,
    userId:number
}