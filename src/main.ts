// class for Bank Account
class BankAccount {

    // declare and initialize variables that will not be input by the user
    private static accountNumberCounter: number = 1;
    private accountNumber: string = '';
    protected balance: number;
  
    // constructor
    constructor(
      private customerName: string,
      private age: number,
      private location: string,
      private state: string,
      private country: string,
      private email: string,
      private initialDeposit: number,
      private accountType: string
    ) {
        this.balance = initialDeposit;
        this.generateAccountNumber();
    }
  
    // generate a random account number
    private generateAccountNumber() {
      const prefix = this.accountType === "Savings" ? "Sav" : "Curr";
      this.accountNumber = `${prefix}-${BankAccount.accountNumberCounter++}`;
      console.log(`Your account number is - ${this.accountNumber}`)
    }
  
    // get the account Number
    getAccountNumber() {
      return this.accountNumber;
    }
  
    // get the customer Name
    getCustomerName() {
      return this.customerName;
    }
  
    // get the email
    getEmail() {
      return this.email;
    }
  
    // get the acccount type
    getAccountType() {
      return this.accountType;
    }
  
    // get the balance
    getBalance() {
      return this.balance;
    }
    
    // deposit the following amount
    deposit(amount: number) {
      this.balance += amount;
    }
    
    // withdraw the following amount
    withdraw(amount: number) {
      if (this.balance < amount) {
        console.log("You cannot withdraw the amount due to insufficient balance.");
        return;
      }
      // reduce the balance
      console.log("Withdraw successful!")
      this.balance -= amount;
      console.log(`Present balance - ${this.balance}`)
    }
}

// Savings Account sub class
class SavingsAccount extends BankAccount {
  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string,
    initialDeposit: number
  ) {
    super(customerName, age, location, state, country, email, initialDeposit, "Savings");
  }
}
  
// Current Account sub class
class CurrentAccount extends BankAccount {
  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string,
    initialDeposit: number
  ) {
    super(customerName, age, location, state, country, email, initialDeposit, "Current");
  }

  // function to withdraw the amount
  withdraw(amount: number) {
    if (this.balance < amount) {
      console.log("Balance is less. You need to use overdraft.");
      return;
    }
    // withdrawl was successful
    console.log('Successful withdrawl!')
    this.balance -= amount;
    console.log(`Present balance - ${this.balance}`)
  }
}
  
// create the bank class to handle various instances of Bank Account class
class Bank {

  // an array to store all account details
  private accounts: BankAccount[] = [];

  // function to create an account
  createAccount(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string,
    accountType: string,
    initialDeposit: number
  ) {
    if (age > 68) {
      console.log("You are not eligible for account opening.");
      return;
    }

    let account: BankAccount;

    if (accountType === "Savings" && initialDeposit < 500) {
      console.log("Minimum balance in savings account should be 500.");
      return;
    } else if (accountType === "Current" && initialDeposit < 800) {
      console.log("Minimum balance in current account should be 800.");
      return;
    }

    if (accountType === "Savings") {
      account = new SavingsAccount(customerName, age, location, state, country, email, initialDeposit);
    } else if (accountType === "Current") {
      account = new CurrentAccount(customerName, age, location, state, country, email, initialDeposit);
    } else {
      console.log("Invalid account type.");
      return;
    }

    this.accounts.push(account);
  }

  // function to show the balance of an account
  showBalance(customerName: string) {
    const account = this.accounts.find((acc) => acc.getCustomerName() === customerName);
    if (account) {
      console.log(`Balance for ${customerName}'s ${account.getAccountType()} account: ${account.getBalance()}`);
    } else {
      console.log("Account not found.");
    }
  }

  // function to display account details
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

  // return account object
  accountObject(accountNumber: string) {
    const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
    if (account) {
      return account
    } else {
      return 
    }
  }
}
  
const bank = new Bank();

// Menu for user interaction
function showOptions() {
  console.log('***********************************************')
  console.log("1. Create New Account");
  console.log("2. Show Balance");
  console.log("3. Display Account Details");
  console.log("4. Withdraw");
  console.log("5. Exit");
}

function main() {

  // get options to work upon the input
  while (true) {
    // display the options
    showOptions();
    // verify the options
    let choice: number | null = null; // Initialize with null
    while (choice === null) {
      const choiceInput = prompt("Enter your choice:");
      if (choiceInput !== null) {
        const parsedChoice = parseInt(choiceInput);
        // check for number
        if (!isNaN(parsedChoice)) {
          // Now, 'parsedChoice' is a valid number
          choice = parsedChoice;
        } else {
          console.log("Invalid choice. Please enter a valid number.");
        }
      } else {
        console.log("Invalid input. Please try again.");
      }
    }
      
    // switch cases
    switch (choice) {
      // Create an account
      case 1:
          let customerName: string | null = null; // Initialize with null
          while (customerName === null) {
            const input = prompt("Enter customer name:");
            if (input !== null) {
              customerName = input;
            } else {
              console.log("Invalid customer name. Please try again.");
            }
          } 
          // Now 'customerName' is guaranteed to be a string, not null.
          
          let age: number | null = null; // Initialize with null
          while (age === null) {
          const ageInput = prompt("Enter age:");
          if (ageInput !== null) {
              const parsedAge = parseInt(ageInput);
              if (!isNaN(parsedAge)) {
              // Now, 'parsedAge' is a valid number
              age = parsedAge;
              } else {
              console.log("Invalid age. Please enter a valid number.");
              }
          } else {
              console.log("Invalid input. Please try again.");
            }
          }
          // Now 'age' is guaranteed to be a number, not null.

          let location: string | null = null; // Initialize with null
          while (location === null) {
          const input = prompt("Enter location:");
          if (input !== null) {
              location = input;
          } else {
              console.log("Invalid location. Please try again.");
          }
          }
          // Now 'location' is guaranteed to be a string, not null.

          let state: string | null = null; // Initialize with null
          while (state === null) {
          const input = prompt("Enter state:");
          if (input !== null) {
              state = input;
          } else {
              console.log("Invalid state. Please try again.");
          }
          }
          // Now 'state' is guaranteed to be a string, not null.
          
          let country: string | null = null; // Initialize with null
          while (country === null) {
          const input = prompt("Enter country:");
          if (input !== null) {
              country = input;
          } else {
              console.log("Invalid country. Please try again.");
          }
          }
          // Now 'country' is guaranteed to be a string, not null.
          
          function isValidEmail(email: string): boolean {
            // Regular expression for basic email validation
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(email);
          }
          let email: string | null = null; // Initialize with null
          while (email === null) {
          const input = prompt("Enter email:");
          if (input !== null) {
            if (isValidEmail(input)) {
              email = input;
            } else {
              console.log("Invalid email format. Please try again.");
            }
          } else {
              console.log("Invalid email. Please try again.");
          }
          }
          // Now 'email' is guaranteed to be a string, not null.
          
          let accountType: string | null = null; // Initialize with null
          while (accountType === null) {
          const input = prompt("Enter account Type: Savings/Current");
          if (input !== null) {
              accountType = input;
          } else {
              console.log("Invalid account Type. Please try again.");
          }
          }
          // Now 'accountType' is guaranteed to be a string, not null.
          
          let initialDeposit: number | null = null; // Initialize with null
          while (initialDeposit === null) {
            const initialDepositInput = prompt("Enter initial deposit amount:");
            if (initialDepositInput !== null) {
              const parsedInitialDeposit = parseFloat(initialDepositInput);
          
              if (!isNaN(parsedInitialDeposit) && parsedInitialDeposit >= 0) {
                // Now, 'parsedInitialDeposit' is a valid non-negative number
                initialDeposit = parsedInitialDeposit;
              } else {
                console.log("Invalid initial deposit. Please enter a valid non-negative number.");
              }
            } else {
              console.log("Invalid input. Please try again.");
            }
          }
          // Now 'initialDeposit' is guaranteed to be a valid non-negative number.
              
          bank.createAccount(customerName, age, location, state, country, email, accountType, initialDeposit);
          break;

      // show balance
      case 2:
        let customer: string | null = null; // Initialize with null
        while (customer === null) {
          const input = prompt("Enter customer name:");
          if (input !== null) {
            customer = input;
          } else {
            console.log("Invalid customer name. Please try again.");
          }
        }
        // Now 'customer' is guaranteed to be a string, not null.
        bank.showBalance(customer);
        break;
      
      // display account details
      case 3:
        let accNumber: string | null = null; // Initialize with null

        while (accNumber === null) {
          const input = prompt("Enter Account Number:");
          if (input !== null) {
            accNumber = input;
          } else {
            console.log("Invalid Account Number. Please try again.");
          }
        }
        
        // Now 'accNumber' is guaranteed to be a string, not null.
          
        bank.displayAccountDetails(accNumber);
        break;
      
      // Withdraw funds
      case 4:
        let accNum: string | null = null;
        while (accNum === null) {
          const input = prompt("Enter acccount number:");
          if (input !== null) {
            accNum = input;
          } else {
            console.log("Invalid account number. Please try again.");
          }
        }

        let withdrawalAmount: number | null = null;
        while (withdrawalAmount === null) {
          const input = prompt("Enter withdrawal amount:");
          if (input !== null) {
            const parsedAmount = parseFloat(input);
            if (!isNaN(parsedAmount) && parsedAmount >= 0) {
              withdrawalAmount = parsedAmount;
            } else {
              console.log("Invalid withdrawal amount. Please enter a valid non-negative number.");
            }
          } else {
            console.log("Invalid input. Please try again.");
          }
        }

        const account = bank.accountObject(accNum)

        if (account) {
          account.withdraw(withdrawalAmount);
        } else {
          console.log("Account not found.");
        }
        break;

      case 5:
        console.log("Exiting...");
        return;

      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();
   