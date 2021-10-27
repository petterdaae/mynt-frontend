import TransactionList from "./transaction_list";
import { TransactionsProvider, CategoriesProvider } from "../../hooks";
import { AccountsProvider } from "../../hooks/useAccounts";

function Home() {
  return (
    <AccountsProvider>
      <TransactionsProvider>
        <CategoriesProvider>
          <TransactionList />
        </CategoriesProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default Home;
