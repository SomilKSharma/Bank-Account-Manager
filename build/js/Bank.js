"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
const account_1 = require("./account");
class Bank {
    constructor() {
        this.accounts = [];
    }
    createAccount(details) {
        if (details.age > 68) {
            console.log("You are not eligible for account opening.");
            return;
        }
        let account;
        if (details.accountType === "savings") {
            account = new account_1.SavingsAccount(details);
        }
        else if (details.accountType === "current") {
            account = new account_1.CurrentAccount(details);
        }
        else {
            console.log("Invalid account type.");
            return;
        }
        this.accounts.push(account);
    }
    showBalance(accountNumber) {
        const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
        if (account) {
            console.log(`Balance for ${accountNumber}'s ${account.getAccountType()} account: ${account.getBalance()}`);
        }
        else {
            console.log("Account not found.");
        }
    }
    displayAccountDetails(accountNumber) {
        const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
        if (account) {
            console.log(`Customer Name: ${account.getCustomerName()}`);
            console.log(`Email ID: ${account.getEmail()}`);
            console.log(`Type of Account: ${account.getAccountType()}`);
            console.log(`Total Balance: ${account.getBalance()}`);
        }
        else {
            console.log("Account not found.");
        }
    }
    accountObject(accountNumber) {
        const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
        return account;
    }
}
exports.Bank = Bank;
