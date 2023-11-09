"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForAccountType = exports.promptForEmail = exports.isValidEmail = exports.promptForNonNegativeNumber = exports.promptForNumber = exports.promptForString = exports.promptForAccountNumber = void 0;
function promptForAccountNumber(rl, promptMessage) {
    return new Promise(function (resolve) {
        rl.question(promptMessage, function (input) {
            if (input) {
                resolve(input);
            }
            else {
                console.log("Invalid input.");
                promptForAccountNumber(rl, promptMessage).then(resolve);
            }
        });
    });
}
exports.promptForAccountNumber = promptForAccountNumber;
function promptForString(rl, promptMessage) {
    return new Promise(function (resolve) {
        rl.question(promptMessage, function (input) {
            if (input && /^[a-zA-Z\s]*$/.test(input)) {
                resolve(input.toLowerCase());
            }
            else {
                console.log("Invalid input. Please enter only letters and spaces.");
                promptForString(rl, promptMessage).then(resolve);
            }
        });
    });
}
exports.promptForString = promptForString;
function promptForNumber(rl, promptMessage) {
    return new Promise(function (resolve) {
        rl.question(promptMessage, function (input) {
            var parsedValue = parseInt(input);
            if (!isNaN(parsedValue)) {
                resolve(parsedValue);
            }
            else {
                console.log("Invalid input. Please enter a valid number.");
                promptForNumber(rl, promptMessage).then(resolve);
            }
        });
    });
}
exports.promptForNumber = promptForNumber;
function promptForNonNegativeNumber(rl, promptMessage, minimumDeposit) {
    if (minimumDeposit === void 0) { minimumDeposit = 0; }
    return new Promise(function (resolve) {
        rl.question(promptMessage, function (input) {
            var parsedValue = parseFloat(input);
            if (!isNaN(parsedValue) && parsedValue >= minimumDeposit) {
                resolve(parsedValue);
            }
            else {
                if (parsedValue < minimumDeposit) {
                    console.log("Minimum balance should be ".concat(minimumDeposit, "."));
                }
                else {
                    console.log("Invalid input. Please enter a valid non-negative number (minimum ".concat(minimumDeposit, ")."));
                }
                promptForNonNegativeNumber(rl, promptMessage, minimumDeposit).then(resolve);
            }
        });
    });
}
exports.promptForNonNegativeNumber = promptForNonNegativeNumber;
function isValidEmail(email) {
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}
exports.isValidEmail = isValidEmail;
function promptForEmail(rl, promptMessage) {
    return new Promise(function (resolve) {
        rl.question(promptMessage, function (input) {
            if (isValidEmail(input)) {
                resolve(input.toLowerCase());
            }
            else {
                console.log("Invalid email format. Please try again.");
                promptForEmail(rl, promptMessage).then(resolve);
            }
        });
    });
}
exports.promptForEmail = promptForEmail;
function promptForAccountType(rl, promptMessage) {
    return new Promise(function (resolve) {
        rl.question(promptMessage, function (input) {
            var lowerCaseInput = input.toLowerCase();
            if (lowerCaseInput === "savings" || lowerCaseInput === "current") {
                resolve(lowerCaseInput);
            }
            else {
                console.log("Invalid account type. Please enter 'savings' or 'current'.");
                promptForAccountType(rl, promptMessage).then(resolve);
            }
        });
    });
}
exports.promptForAccountType = promptForAccountType;
