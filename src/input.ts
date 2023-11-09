import * as readline from 'readline';

export function promptForAccountNumber(rl: readline.Interface, promptMessage: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(promptMessage, (input: string) => {
            if (input) {
                resolve(input);
            } else {
                console.log("Invalid input.");
                promptForAccountNumber(rl, promptMessage).then(resolve);
            }
        });
    });
}

export function promptForString(rl: readline.Interface, promptMessage: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(promptMessage, (input: string) => {
            if (input && /^[a-zA-Z\s]*$/.test(input)) {
                resolve(input.toLowerCase());
            } else {
                console.log("Invalid input. Please enter only letters and spaces.");
                promptForString(rl, promptMessage).then(resolve);
            }
        });
    });
}

export function promptForNumber(rl: readline.Interface, promptMessage: string): Promise<number> {
    return new Promise<number>((resolve) => {
        rl.question(promptMessage, (input: string) => {
            const parsedValue = parseInt(input);
            if (!isNaN(parsedValue)) {
                resolve(parsedValue);
            } else {
                console.log("Invalid input. Please enter a valid number.");
                promptForNumber(rl, promptMessage).then(resolve);
            }
        });
    });
}

export function promptForNonNegativeNumber(rl: readline.Interface, promptMessage: string, minimumDeposit: number = 0): Promise<number> {
    return new Promise<number>((resolve) => {
        rl.question(promptMessage, (input: string) => {
            const parsedValue = parseFloat(input);
            if (!isNaN(parsedValue) && parsedValue >= minimumDeposit) {
                resolve(parsedValue);
            } else {
                if (parsedValue < minimumDeposit) {
                    console.log(`Minimum balance should be ${minimumDeposit}.`);
                } else {
                    console.log(`Invalid input. Please enter a valid non-negative number (minimum ${minimumDeposit}).`);
                }
                promptForNonNegativeNumber(rl, promptMessage, minimumDeposit).then(resolve);
            }
        });
    });
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}

export function promptForEmail(rl: readline.Interface, promptMessage: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(promptMessage, (input: string) => {
            if (isValidEmail(input)) {
                resolve(input.toLowerCase());
            } else {
                console.log("Invalid email format. Please try again.");
                promptForEmail(rl, promptMessage).then(resolve);
            }
        });
    });
}

export function promptForAccountType(rl: readline.Interface, promptMessage: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(promptMessage, (input: string) => {
            const lowerCaseInput = input.toLowerCase();
            if (lowerCaseInput === "savings" || lowerCaseInput === "current") {
                resolve(lowerCaseInput);
            } else {
                console.log("Invalid account type. Please enter 'savings' or 'current'.");
                promptForAccountType(rl, promptMessage).then(resolve);
            }
        });
    });
}
