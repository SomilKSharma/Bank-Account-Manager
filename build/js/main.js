"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const account_1 = require("./account");
const input_1 = require("./input");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const bank = new account_1.Bank();
function showOptions() {
    console.log('***********************************************');
    console.log("1. Create New Account");
    console.log("2. Show Balance");
    console.log("3. Display Account Details");
    console.log("4. Withdraw");
    console.log("5. Deposit");
    console.log("6. Exit");
}
function CreateAccountChoice() {
    return __awaiter(this, void 0, void 0, function* () {
        const accountType = yield (0, input_1.promptForAccountType)(rl, "Enter account Type: Savings/Current");
        const minimumDeposit = accountType === 'savings' ? 500 : 800;
        const details = {
            customerName: yield (0, input_1.promptForString)(rl, "Enter customer name:"),
            age: yield (0, input_1.promptForNumber)(rl, "Enter age:"),
            location: yield (0, input_1.promptForString)(rl, "Enter location:"),
            state: yield (0, input_1.promptForString)(rl, "Enter state:"),
            country: yield (0, input_1.promptForString)(rl, "Enter country:"),
            email: yield (0, input_1.promptForEmail)(rl, "Enter email:"),
            accountType: accountType,
            initialDeposit: yield (0, input_1.promptForNonNegativeNumber)(rl, `Enter initial deposit amount (minimum ${minimumDeposit}):`, minimumDeposit),
        };
        return details;
    });
}
function main() {
    showOptions();
    promptForChoice();
}
function processChoice(choice) {
    return __awaiter(this, void 0, void 0, function* () {
        if (choice === 1) {
            const details = yield CreateAccountChoice();
            bank.createAccount(details);
        }
        else if (choice === 2) {
            const customerName = yield (0, input_1.promptForAccountNumber)(rl, "Enter Account Number:");
            bank.showBalance(customerName);
        }
        else if (choice === 3) {
            const accountNumber = yield (0, input_1.promptForAccountNumber)(rl, "Enter Account Number:");
            bank.displayAccountDetails(accountNumber);
        }
        else if (choice === 4) {
            yield processWithdrawal();
        }
        else if (choice === 5) {
            yield processDeposit();
        }
        else if (choice === 6) {
            console.log("Exiting...");
            rl.close();
            return;
        }
        else {
            console.log("Invalid choice. Please try again.");
            showOptions();
            promptForChoice();
            return;
        }
        showOptions();
        promptForChoice();
    });
}
function processWithdrawal() {
    return __awaiter(this, void 0, void 0, function* () {
        const accountNumberForWithdrawal = yield (0, input_1.promptForAccountNumber)(rl, "Enter account number:");
        const withdrawalAmount = yield (0, input_1.promptForNonNegativeNumber)(rl, "Enter withdrawal amount:");
        const accountForWithdrawal = bank.accountObject(accountNumberForWithdrawal);
        if (accountForWithdrawal) {
            accountForWithdrawal.withdraw(withdrawalAmount);
        }
        else {
            console.log("Account not found.");
        }
    });
}
function processDeposit() {
    return __awaiter(this, void 0, void 0, function* () {
        const accountNumberForDeposit = yield (0, input_1.promptForAccountNumber)(rl, "Enter account number:");
        const depositAmount = yield (0, input_1.promptForNonNegativeNumber)(rl, "Enter deposit amount:");
        const accountForDeposit = yield bank.accountObject(accountNumberForDeposit);
        if (accountForDeposit) {
            console.log(`Previous Balance: ${accountForDeposit.getBalance()}`);
            accountForDeposit.deposit(depositAmount);
            console.log(`Deposit of ${depositAmount} successful!`);
            console.log(`Updated balance: ${accountForDeposit.getBalance()}`);
        }
        else {
            console.log("Account not found.");
        }
    });
}
function promptForChoice() {
    rl.question('Enter your choice: ', (choiceInput) => {
        const parsedChoice = parseInt(choiceInput);
        if (!isNaN(parsedChoice)) {
            processChoice(parsedChoice);
        }
        else {
            console.log("Invalid choice. Please enter a valid number.");
            promptForChoice();
        }
    });
}
main();
