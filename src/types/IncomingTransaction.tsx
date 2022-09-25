interface IncomingTransaction {
  id: number;
  accountId: string;
  accountingDate: string;
  interestDate: string;
  amount: number;
  text: string;
}

export default IncomingTransaction;
