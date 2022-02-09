interface Transaction {
  id: string;
  accountId: string;
  accountingDate: string;
  interestDate: string;
  customDate: string | null;
  amount: number;
  text: string;
}

export default Transaction;
