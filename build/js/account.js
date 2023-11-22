"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAccount = exports.SavingsAccount = exports.Account = void 0;
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
exports.Account = Account;
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
exports.SavingsAccount = SavingsAccount;
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
exports.CurrentAccount = CurrentAccount;
