export class Login {
    constructor(userName = '', password = ''){
        this.userName = userName;
        this.password = password;
    }
    userName: string;
    password: string;
}
