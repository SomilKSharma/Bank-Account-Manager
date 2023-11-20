"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
class Account {
    constructor(details) {
        this.details = details;
        this.accountNumber = '';
        this.balance = details.initialDeposit;
        this.generateAccountNumber();
    }
    generateAccountNumber() {
        const prefix = this.details.accountType === "Savings" ? "Sav" : "Curr";
        const min = 10000;
        const max = 99999;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        this.accountNumber = `${prefix}-${random}`;
        console.log(`Account created!!`);
        console.log(`Your account number is - ${this.accountNumber}`);
    }
    getAccountNumber() {
        return this.accountNumber;
    }
    getCustomerName() {
        return this.details.customerName;
    }
    getEmail() {
        return this.details.email;
    }
    getAccountType() {
        return this.details.accountType;
    }
    getBalance() {
        return this.balance;
    }
    deposit(amount) {
        this.balance += amount;
    }
}
class SavingsAccount extends Account {
    constructor(details) {
        super(details);
    }
    withdraw(amount) {
        if (this.balance < amount || this.balance - amount < 500) {
            console.log("You cannot withdraw the amount due to insufficient balance.");
            return;
        }
        console.log("Withdraw successful!");
        this.balance -= amount;
        console.log(`Present balance - ${this.balance}`);
    }
}
class CurrentAccount extends Account {
    constructor(details) {
        super(details);
    }
    withdraw(amount) {
        if (this.balance < amount || this.balance - amount < 800) {
            console.log("Balance is less. You need to use overdraft.");
            return;
        }
        console.log('Successful withdrawal!');
        this.balance -= amount;
        console.log(`Present balance - ${this.balance}`);
    }
}
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
            account = new SavingsAccount(details);
        }
        else if (details.accountType === "current") {
            account = new CurrentAccount(details);
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
