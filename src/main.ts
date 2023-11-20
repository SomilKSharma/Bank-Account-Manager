import * as readline from 'readline';
import { IAccountDetails } from './IAccountDetails';
import { Bank } from './account';
import { promptForAccountNumber, promptForString, promptForNumber, promptForNonNegativeNumber, promptForEmail, promptForAccountType } from './input';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const bank = new Bank();

function showOptions(): void {
  console.log('***********************************************')
  console.log("1. Create New Account");
  console.log("2. Show Balance");
  console.log("3. Display Account Details");
  console.log("4. Withdraw");
  console.log("5. Deposit");
  console.log("6. Exit");
}

async function CreateAccountChoice() {
  const accountType = await promptForAccountType(rl, "Enter account Type: Savings/Current");
  const minimumDeposit = accountType === 'savings' ? 500 : 800;
  const details: IAccountDetails = {
    customerName: await promptForString(rl, "Enter customer name:"),
    age: await promptForNumber(rl, "Enter age:"),
    location: await promptForString(rl, "Enter location:"),
    state: await promptForString(rl, "Enter state:"),
    country: await promptForString(rl, "Enter country:"),
    email: await promptForEmail(rl, "Enter email:"),
    accountType: accountType,
    initialDeposit: await promptForNonNegativeNumber(rl, `Enter initial deposit amount (minimum ${minimumDeposit}):`, minimumDeposit),
  };
  return details
}

function main(): void {
  showOptions();
  promptForChoice();
}

async function processChoice(choice: number): Promise<void> {
  if (choice === 1) {
    const details = await CreateAccountChoice();
    bank.createAccount(details);
  } else if (choice === 2) {
    const customerName = await promptForAccountNumber(rl, "Enter Account Number:");
    bank.showBalance(customerName);
  } else if (choice === 3) {
    const accountNumber = await promptForAccountNumber(rl, "Enter Account Number:");
    bank.displayAccountDetails(accountNumber);
  } else if (choice === 4) {
    await processWithdrawal();
  } else if (choice === 5) {
    await processDeposit();
  } else if (choice === 6) {
    console.log("Exiting...");
    rl.close();
    return;
  } else {
    console.log("Invalid choice. Please try again.");
    showOptions();
    promptForChoice();
    return;
  }

  showOptions();
  promptForChoice();
}

async function processWithdrawal(): Promise<void> {
  const accountNumberForWithdrawal = await promptForAccountNumber(rl, "Enter account number:");
  const withdrawalAmount = await promptForNonNegativeNumber(rl, "Enter withdrawal amount:");
  const accountForWithdrawal = bank.accountObject(accountNumberForWithdrawal);

  if (accountForWithdrawal) {
    accountForWithdrawal.withdraw(withdrawalAmount);
  } else {
    console.log("Account not found.");
  }
}

async function processDeposit(): Promise<void> {
  const accountNumberForDeposit = await promptForAccountNumber(rl, "Enter account number:");
  const depositAmount = await promptForNonNegativeNumber(rl, "Enter deposit amount:");
  const accountForDeposit = await bank.accountObject(accountNumberForDeposit);

  if (accountForDeposit) {
    console.log(`Previous Balance: ${accountForDeposit.getBalance()}`);
    accountForDeposit.deposit(depositAmount);
    console.log(`Deposit of ${depositAmount} successful!`);
    console.log(`Updated balance: ${accountForDeposit.getBalance()}`);
  } else {
    console.log("Account not found.");
  }
}

function promptForChoice(): void {
  rl.question('Enter your choice: ', (choiceInput) => {
    const parsedChoice = parseInt(choiceInput);

    if (!isNaN(parsedChoice)) {
      processChoice(parsedChoice);
    } else {
      console.log("Invalid choice. Please enter a valid number.");
      promptForChoice();
    }
  });
}

main();
