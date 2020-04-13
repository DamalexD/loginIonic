export class Users {
    constructor(_id = '', firstName = '', secondName = '',  userName= '', email= '', password= ''){
        this._id = _id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
    _id: string;
    firstName: string;
    secondName: string;
    userName: string;
    email: string;
    password: string;
}
