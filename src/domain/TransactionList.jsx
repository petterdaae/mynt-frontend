import Transaction from "./Transaction";

function TransactionList() {
  return (
    <Transaction
      transaction={{
        text: "*4308 02.12 NOK 49.00 NARVESEN 768 BERGEN STORS Kurs: 1.0000",
        account: "Kort",
        date: "1. desember",
        category_color: "lightblue",
        amount: "12 000",
      }}
    />
  );
}

export default TransactionList;
