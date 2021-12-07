import TransactionList from "./transaction_list";
import TransactionListMobile from "./transaction_list_mobile";
import { TransactionsProvider, CategoriesProvider } from "../../hooks";
import { AccountsProvider } from "../../hooks/useAccounts";
import styled from "styled-components";
import { breakpoint } from "../../constants";

const Wrapper = styled.div`
  @media (max-width: ${breakpoint}px) {
    display: none;
  }
`;

const WrapperMobile = styled.div`
  @media (min-width: ${breakpoint}px) {
    display: none;
  }
`;

function Home() {
  return (
    <AccountsProvider>
      <TransactionsProvider>
        <CategoriesProvider>
          <Wrapper>
            <TransactionList />
          </Wrapper>
          <WrapperMobile>
            <TransactionListMobile />
          </WrapperMobile>
        </CategoriesProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default Home;
