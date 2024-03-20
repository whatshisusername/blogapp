// this we creating to provide authentication service using appwrite meaning we using appwrite services to
// signup (createaccount),login,logout

import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

// a class providing appwrite authentication services
export class AuthService {
    // creating new client using appwrite function
    client = new Client();
    // account variable to handle accounts
    account;

    // as new client gets created then create account
    // this is our constructor
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    // function to createaccount ie signup all funtion inside it are from appwrite
    async createAccount({email, password, name}) {
        try {
            // creating useraccount
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method as user gets signup make it login
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    // function to login user
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }


// function to get who is the current user on the website
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
// function to logout user
    async logout() {

        try {
            // delete all sessions of user from all devices
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}


// it is the object of above class
const authService = new AuthService();

// exporting that object ,using that object u can use methods in class like createaccount,login,getcurrentuser,logout
// constructor gets called as soon as object created
export default authService