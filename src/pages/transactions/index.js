import TransactionList from "./transaction_list";
import TransactionListMobile from "./transaction_list_mobile";
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
    <>
      <Wrapper>
        <TransactionList />
      </Wrapper>
      <WrapperMobile>
        <TransactionListMobile />
      </WrapperMobile>
    </>
  );
}

export default Home;
