import { IAccountDetails } from "./IAccountDetails";
  
   abstract class Account {
    protected accountNumber: string = '';
    protected balance: number;
  
    constructor(protected details: IAccountDetails) {
      this.balance = details.initialDeposit;
      this.generateAccountNumber();
    }
  
    private generateAccountNumber(): void {
      const prefix = this.details.accountType === "Savings" ? "Sav" : "Curr";
      const min = 10000;
      const max = 99999;
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      this.accountNumber = `${prefix}-${random}`;
      console.log(`Account created!!`);
      console.log(`Your account number is - ${this.accountNumber}`);
    }
  
    public getAccountNumber(): string {
      return this.accountNumber;
    }
  
    public getCustomerName(): string {
      return this.details.customerName;
    }
  
    public getEmail(): string {
      return this.details.email;
    }
  
    public getAccountType(): string {
      return this.details.accountType;
    }
  
    public getBalance(): number {
      return this.balance;
    }
  
    public deposit(amount: number): void {
      this.balance += amount;
    }
  
    public abstract withdraw(amount: number): void;
  }
  
   class SavingsAccount extends Account {
    constructor(details: IAccountDetails) {
      super(details);
    }
  
    public withdraw(amount: number): void {
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
    constructor(details: IAccountDetails) {
      super(details);
    }
  
    public withdraw(amount: number): void {
      if (this.balance < amount || this.balance - amount < 800) {
        console.log("Balance is less. You need to use overdraft.");
        return;
      }
      console.log('Successful withdrawal!');
      this.balance -= amount;
      console.log(`Present balance - ${this.balance}`);
    }
  }
  

 export class Bank {
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
  
    public showBalance(accountNumber: string): void {
      const account = this.accounts.find((acc) => acc.getAccountNumber() === accountNumber);
      if (account) {
        console.log(`Balance for ${accountNumber}'s ${account.getAccountType()} account: ${account.getBalance()}`);
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