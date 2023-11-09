import * as readline from 'readline';
import { Account, SavingsAccount, CurrentAccount, IAccountDetails } from './account';
import { promptForAccountNumber, promptForString, promptForNumber, promptForNonNegativeNumber, promptForEmail, promptForAccountType } from './input';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Bank {
  private accounts: Account[] = [];

  public createAccount(details: IAccountDetails): void {
    if (details.age > 68) {
      console.log("You are not eligible for account opening.");
      return;
    }

    let account: Account;

    if (details.accountType === "savings") {
      account = new SavingsAccount(details);
    } else if (details.accountType === "current") {
      account = new CurrentAccount(details);
    } else {
      console.log("Invalid account type.");
      return;
    }

    this.accounts.push(account);
  }

  public showBalance(customerName: string): void {
    const account = this.accounts.find((acc) => acc.getCustomerName() === customerName);
    if (account) {
      console.log(`Balance for ${customerName}'s ${account.getAccountType()} account: ${account.getBalance()}`);
    } else {
      console.log("Account not found.");
    }
  }

  public displayAccountDetails(accountNumber: string): void {
    const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
    if (account) {
      console.log(`Customer Name: ${account.getCustomerName()}`);
      console.log(`Email ID: ${account.getEmail()}`);
      console.log(`Type of Account: ${account.getAccountType()}`);
      console.log(`Total Balance: ${account.getBalance()}`);
    } else {
      console.log("Account not found.");
    }
  }

  public accountObject(accountNumber: string): Account | undefined {
    const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
    return account;
  }
}

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

function main(): void {
  async function processChoice(choice: number): Promise<void> {

    switch (choice) {
      case 1:
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

        bank.createAccount(details);
        showOptions();
        promptForChoice();
        break;

      case 2:
        const customerName = await promptForString(rl, "Enter customer name:");
        bank.showBalance(customerName);
        showOptions();
        promptForChoice();
        break;

      case 3:
        const accountNumber = await promptForAccountNumber(rl, "Enter Account Number:");
        bank.displayAccountDetails(accountNumber);
        showOptions();
        promptForChoice();
        break;

      case 4:
        const accountNumberForWithdrawal = await promptForAccountNumber(rl, "Enter account number:");
        const withdrawalAmount = await promptForNonNegativeNumber(rl, "Enter withdrawal amount:");
        const accountForWithdrawal = bank.accountObject(accountNumberForWithdrawal);

        if (accountForWithdrawal) {
          accountForWithdrawal.withdraw(withdrawalAmount);
        } else {
          console.log("Account not found.");
        }
        showOptions();
        promptForChoice();
        break;

      case 5:
        const accountNumberForDeposit = await promptForAccountNumber(rl, "Enter account number:");
        const depositAmount = await promptForNonNegativeNumber(rl, "Enter deposit amount:");
        const accountForDeposit = bank.accountObject(accountNumberForDeposit);

        if (accountForDeposit) {
          console.log(`Previous Balance: ${accountForDeposit.getBalance()}`);
          accountForDeposit.deposit(depositAmount);
          console.log(`Deposit of ${depositAmount} successful!`);
          console.log(`Updated balance: ${accountForDeposit.getBalance()}`);
        } else {
          console.log("Account not found.");
        }
        showOptions();
        promptForChoice();
        break;

      case 6:
        console.log("Exiting...");
        rl.close();
        return;

      default:
        console.log("Invalid choice. Please try again.");
        showOptions();
        promptForChoice();
        break;
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
  showOptions();
  promptForChoice();
}

main();
