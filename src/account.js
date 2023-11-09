"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAccount = exports.SavingsAccount = exports.Account = void 0;
var Account = /** @class */ (function () {
    function Account(details) {
        this.details = details;
        this.accountNumber = '';
        this.balance = details.initialDeposit;
        this.generateAccountNumber();
    }
    Account.prototype.generateAccountNumber = function () {
        var prefix = this.details.accountType === "Savings" ? "Sav" : "Curr";
        var min = 10000;
        var max = 99999;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        this.accountNumber = "".concat(prefix, "-").concat(random);
        console.log("Account created!!");
        console.log("Your account number is - ".concat(this.accountNumber));
    };
    Account.prototype.getAccountNumber = function () {
        return this.accountNumber;
    };
    Account.prototype.getCustomerName = function () {
        return this.details.customerName;
    };
    Account.prototype.getEmail = function () {
        return this.details.email;
    };
    Account.prototype.getAccountType = function () {
        return this.details.accountType;
    };
    Account.prototype.getBalance = function () {
        return this.balance;
    };
    Account.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    return Account;
}());
exports.Account = Account;
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount(details) {
        return _super.call(this, details) || this;
    }
    SavingsAccount.prototype.withdraw = function (amount) {
        if (this.balance < amount || this.balance - amount < 500) {
            console.log("You cannot withdraw the amount due to insufficient balance.");
            return;
        }
        console.log("Withdraw successful!");
        this.balance -= amount;
        console.log("Present balance - ".concat(this.balance));
    };
    return SavingsAccount;
}(Account));
exports.SavingsAccount = SavingsAccount;
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount(details) {
        return _super.call(this, details) || this;
    }
    CurrentAccount.prototype.withdraw = function (amount) {
        if (this.balance < amount || this.balance - amount < 800) {
            console.log("Balance is less. You need to use overdraft.");
            return;
        }
        console.log('Successful withdrawal!');
        this.balance -= amount;
        console.log("Present balance - ".concat(this.balance));
    };
    return CurrentAccount;
}(Account));
exports.CurrentAccount = CurrentAccount;
