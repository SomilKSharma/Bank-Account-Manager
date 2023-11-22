import { Account, SavingsAccount, CurrentAccount } from "./account";
import { IAccountDetails } from "./IAccountDetails";

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