export interface IAccountDetails {
    customerName: string;
    age: number;
    location: string;
    state: string;
    country: string;
    email: string;
    accountType: string;
    initialDeposit: number;
  }
  
  export abstract class Account {
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
  
  export class SavingsAccount extends Account {
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
  
  export class CurrentAccount extends Account {
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
  