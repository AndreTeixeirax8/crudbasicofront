export class Usuario {
    id?: number;
    name: string;
    userName:string;
    email:string;

    constructor(name: string, userName: string,id:number,email:string) {
        this.id=id;
        this.name = name;
        this.userName = userName;
        this.email = email

    }
}