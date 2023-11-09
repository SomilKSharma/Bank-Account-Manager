"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var account_1 = require("./account");
var input_1 = require("./input");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Bank = /** @class */ (function () {
    function Bank() {
        this.accounts = [];
    }
    Bank.prototype.createAccount = function (details) {
        if (details.age > 68) {
            console.log("You are not eligible for account opening.");
            return;
        }
        var account;
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
    };
    Bank.prototype.showBalance = function (customerName) {
        var account = this.accounts.find(function (acc) { return acc.getCustomerName() === customerName; });
        if (account) {
            console.log("Balance for ".concat(customerName, "'s ").concat(account.getAccountType(), " account: ").concat(account.getBalance()));
        }
        else {
            console.log("Account not found.");
        }
    };
    Bank.prototype.displayAccountDetails = function (accountNumber) {
        var account = this.accounts.find(function (acc) { return acc.getAccountNumber() === accountNumber; });
        if (account) {
            console.log("Customer Name: ".concat(account.getCustomerName()));
            console.log("Email ID: ".concat(account.getEmail()));
            console.log("Type of Account: ".concat(account.getAccountType()));
            console.log("Total Balance: ".concat(account.getBalance()));
        }
        else {
            console.log("Account not found.");
        }
    };
    Bank.prototype.accountObject = function (accountNumber) {
        var account = this.accounts.find(function (acc) { return acc.getAccountNumber() === accountNumber; });
        return account;
    };
    return Bank;
}());
var bank = new Bank();
function showOptions() {
    console.log('***********************************************');
    console.log("1. Create New Account");
    console.log("2. Show Balance");
    console.log("3. Display Account Details");
    console.log("4. Withdraw");
    console.log("5. Deposit");
    console.log("6. Exit");
}
function main() {
    function processChoice(choice) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accountType, minimumDeposit, details, customerName, accountNumber, accountNumberForWithdrawal, withdrawalAmount, accountForWithdrawal, accountNumberForDeposit, depositAmount, accountForDeposit;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = choice;
                        switch (_a) {
                            case 1: return [3 /*break*/, 1];
                            case 2: return [3 /*break*/, 10];
                            case 3: return [3 /*break*/, 12];
                            case 4: return [3 /*break*/, 14];
                            case 5: return [3 /*break*/, 17];
                            case 6: return [3 /*break*/, 20];
                        }
                        return [3 /*break*/, 21];
                    case 1: return [4 /*yield*/, (0, input_1.promptForAccountType)(rl, "Enter account Type: Savings/Current")];
                    case 2:
                        accountType = _c.sent();
                        minimumDeposit = accountType === 'savings' ? 500 : 800;
                        _b = {};
                        return [4 /*yield*/, (0, input_1.promptForString)(rl, "Enter customer name:")];
                    case 3:
                        _b.customerName = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForNumber)(rl, "Enter age:")];
                    case 4:
                        _b.age = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForString)(rl, "Enter location:")];
                    case 5:
                        _b.location = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForString)(rl, "Enter state:")];
                    case 6:
                        _b.state = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForString)(rl, "Enter country:")];
                    case 7:
                        _b.country = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForEmail)(rl, "Enter email:")];
                    case 8:
                        _b.email = _c.sent(),
                            _b.accountType = accountType;
                        return [4 /*yield*/, (0, input_1.promptForNonNegativeNumber)(rl, "Enter initial deposit amount (minimum ".concat(minimumDeposit, "):"), minimumDeposit)];
                    case 9:
                        details = (_b.initialDeposit = _c.sent(),
                            _b);
                        bank.createAccount(details);
                        showOptions();
                        promptForChoice();
                        return [3 /*break*/, 22];
                    case 10: return [4 /*yield*/, (0, input_1.promptForString)(rl, "Enter customer name:")];
                    case 11:
                        customerName = _c.sent();
                        bank.showBalance(customerName);
                        showOptions();
                        promptForChoice();
                        return [3 /*break*/, 22];
                    case 12: return [4 /*yield*/, (0, input_1.promptForAccountNumber)(rl, "Enter Account Number:")];
                    case 13:
                        accountNumber = _c.sent();
                        bank.displayAccountDetails(accountNumber);
                        showOptions();
                        promptForChoice();
                        return [3 /*break*/, 22];
                    case 14: return [4 /*yield*/, (0, input_1.promptForAccountNumber)(rl, "Enter account number:")];
                    case 15:
                        accountNumberForWithdrawal = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForNonNegativeNumber)(rl, "Enter withdrawal amount:")];
                    case 16:
                        withdrawalAmount = _c.sent();
                        accountForWithdrawal = bank.accountObject(accountNumberForWithdrawal);
                        if (accountForWithdrawal) {
                            accountForWithdrawal.withdraw(withdrawalAmount);
                        }
                        else {
                            console.log("Account not found.");
                        }
                        showOptions();
                        promptForChoice();
                        return [3 /*break*/, 22];
                    case 17: return [4 /*yield*/, (0, input_1.promptForAccountNumber)(rl, "Enter account number:")];
                    case 18:
                        accountNumberForDeposit = _c.sent();
                        return [4 /*yield*/, (0, input_1.promptForNonNegativeNumber)(rl, "Enter deposit amount:")];
                    case 19:
                        depositAmount = _c.sent();
                        accountForDeposit = bank.accountObject(accountNumberForDeposit);
                        if (accountForDeposit) {
                            console.log("Previous Balance: ".concat(accountForDeposit.getBalance()));
                            accountForDeposit.deposit(depositAmount);
                            console.log("Deposit of ".concat(depositAmount, " successful!"));
                            console.log("Updated balance: ".concat(accountForDeposit.getBalance()));
                        }
                        else {
                            console.log("Account not found.");
                        }
                        showOptions();
                        promptForChoice();
                        return [3 /*break*/, 22];
                    case 20:
                        console.log("Exiting...");
                        rl.close();
                        return [2 /*return*/];
                    case 21:
                        console.log("Invalid choice. Please try again.");
                        showOptions();
                        promptForChoice();
                        return [3 /*break*/, 22];
                    case 22: return [2 /*return*/];
                }
            });
        });
    }
    function promptForChoice() {
        rl.question('Enter your choice: ', function (choiceInput) {
            var parsedChoice = parseInt(choiceInput);
            if (!isNaN(parsedChoice)) {
                processChoice(parsedChoice);
            }
            else {
                console.log("Invalid choice. Please enter a valid number.");
                promptForChoice();
            }
        });
    }
    showOptions();
    promptForChoice();
}
main();
