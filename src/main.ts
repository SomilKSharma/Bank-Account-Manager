interface AccountDetails {
  customerName: string;
  age: number;
  location: string;
  state: string;
  country: string;
  email: string;
  accountType: string;
  initialDeposit: number;
}

abstract class Account {
  protected accountNumber: string = '';
  protected balance: number;

  constructor(protected details: AccountDetails) {
      this.balance = details.initialDeposit;
      this.generateAccountNumber();
  }

  private generateAccountNumber() {
      const prefix = this.details.accountType === "Savings" ? "Sav" : "Curr";
      const min = 10000; 
      const max = 99999; 
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      this.accountNumber = `${prefix}-${random}`;
      console.log(`Account created!!`)
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

  deposit(amount: number) {
      this.balance += amount;
  }

  abstract withdraw(amount: number): void;
}


class SavingsAccount extends Account {
  constructor(details: AccountDetails) {
      super(details);
  }

  withdraw(amount: number) {
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
  constructor(details: AccountDetails) {
      super(details);
  }

  withdraw(amount: number) {
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
  private accounts: Account[] = [];

  createAccount(details: AccountDetails) {
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

  showBalance(customerName: string) {
      const account = this.accounts.find((acc) => acc.getCustomerName() === customerName);
      if (account) {
          console.log(`Balance for ${customerName}'s ${account.getAccountType()} account: ${account.getBalance()}`);
      } else {
          console.log("Account not found.");
      }
  }

  displayAccountDetails(accountNumber: string) {
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

  accountObject(accountNumber: string) {
      const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
      if (account) {
          return account;
      } else {
          return;
      }
  }
}

const bank = new Bank();

function showOptions() {
  console.log('***********************************************')
  console.log("1. Create New Account");
  console.log("2. Show Balance");
  console.log("3. Display Account Details");
  console.log("4. Withdraw");
  console.log("5. Deposit");
  console.log("6. Exit");
}

function main() {
  
  while (true) {
      
      showOptions();
      
      let choice: number | null = null; 
      while (choice === null) {
          const choiceInput = prompt("Enter your choice:");
          if (choiceInput !== null) {
              const parsedChoice = parseInt(choiceInput);
              
              if (!isNaN(parsedChoice)) {
                  
                  choice = parsedChoice;
              } else {
                  console.log("Invalid choice. Please enter a valid number.");
              }
          } else {
              console.log("Invalid input. Please try again.");
          }
      }

      
      switch (choice) {
          
          case 1:
              
              const accountType = promptForAccountType("Enter account Type: Savings/Current");
              const minimumDeposit = accountType === 'savings' ? 500 : 800; // Define minimum deposit based on account type
              const details: AccountDetails = {
                  customerName: promptForString("Enter customer name:"),
                  age: promptForNumber("Enter age:"),
                  location: promptForString("Enter location:"),
                  state: promptForString("Enter state:"),
                  country: promptForString("Enter country:"),
                  email: promptForEmail("Enter email:"),
                  accountType: accountType,
                  initialDeposit: promptForNonNegativeNumber(`Enter initial deposit amount (minimum ${minimumDeposit}):`, minimumDeposit),
              };

              bank.createAccount(details);
              
              break;

          
          case 2:
              const customerName = promptForString("Enter customer name:");
              bank.showBalance(customerName);
              break;

          
          case 3:
              const accountNumber = promptForAccountNumber("Enter Account Number:");
              bank.displayAccountDetails(accountNumber);
              break;

          
          case 4:
              const accountNumberForWithdrawal = promptForAccountNumber("Enter account number:");
              const withdrawalAmount = promptForNonNegativeNumber("Enter withdrawal amount:");
              const accountForWithdrawal = bank.accountObject(accountNumberForWithdrawal);

              if (accountForWithdrawal) {
                  accountForWithdrawal.withdraw(withdrawalAmount);
              } else {
                  console.log("Account not found.");
              }
            break;
          
            case 5:
              const accountNumberForDeposit = promptForAccountNumber("Enter account number:");
              const depositAmount = promptForNonNegativeNumber("Enter deposit amount:");
              const accountForDeposit = bank.accountObject(accountNumberForDeposit);
          
              if (accountForDeposit) {
                  accountForDeposit.deposit(depositAmount);
                  console.log(`Previous Balance: ${accountForDeposit.getBalance()}`)
                  console.log(`Deposit of ${depositAmount} successful!`);
                  console.log(`Updated balance: ${accountForDeposit.getBalance()}`);
              } else {
                  console.log("Account not found.");
              }
              break;
          

          case 6:
              console.log("Exiting...");
              return;

          default:
              console.log("Invalid choice. Please try again.");
      }
  }
}

function promptForAccountNumber(promptMessage: string): string {
  let input: string | null = null;
  while (input === null) {
    const inputValue = prompt(promptMessage);

    if (inputValue !== null) {
        input = inputValue;
    } else {
        console.log("Invalid input. Please enter only letters and spaces.");
    }
}
return input;
}

function promptForString(promptMessage: string): string {
  let input: string | null = null;
  const inputRegex = /^[a-zA-Z\s]*$/; 

  while (input === null) {
      const inputValue = prompt(promptMessage);

      if (inputValue !== null && inputRegex.test(inputValue)) {
          input = inputValue;
      } else {
          console.log("Invalid input. Please enter only letters and spaces.");
      }
  }
  return input;
}

function promptForNumber(promptMessage: string): number {
  let input: number | null = null;
  while (input === null) {
      const inputValue = prompt(promptMessage);
      if (inputValue !== null) {
          const parsedValue = parseInt(inputValue);
          if (!isNaN(parsedValue)) {
            input = parsedValue;
          } else {
              console.log("Invalid input. Please enter a valid number.");
          }
      } else {
          console.log("Invalid input. Please try again.");
      }
  }
  return input;
}

function promptForNonNegativeNumber(promptMessage: string, minimumDeposit: number = 0): number {
  let input: number | null = null;
  while (input === null) {
      const inputValue = prompt(promptMessage);
      if (inputValue !== null) {
          const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue) && parsedValue >= minimumDeposit) {
          if (parsedValue >= minimumDeposit) {
            input = parsedValue;  
          } else {
            console.log(`Minimum balance should be ${minimumDeposit}.`);
            }
          } else {
              console.log(`Invalid input. Please enter a valid non-negative number (minimum ${minimumDeposit}).`);
          }
      } else {
          console.log("Invalid input. Please try again.");
      }
  }
  return input;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function promptForEmail(promptMessage: string): string {
  let input: string | null = null;
  while (input === null) {
      const inputValue = prompt(promptMessage);
      if (inputValue !== null) {
          if (isValidEmail(inputValue)) {
              input = inputValue;
          } else {
              console.log("Invalid email format. Please try again.");
          }
      } else {
          console.log("Invalid input. Please try again.");
      }
  }
  return input;
}

function promptForAccountType(promptMessage: string): string {
  let input: string | null = null;
  while (input === null) {
      const inputValue = prompt(promptMessage);
      if (inputValue !== null) {
          input = inputValue.toLowerCase();
          if (input !== "savings" && input !== "current") {
              console.log("Invalid account Type. Please enter 'Savings' or 'Current'.");
              input = null;
          }
      } else {
          console.log("Invalid input. Please try again.");
      }
  }
  return input;
}

main();
