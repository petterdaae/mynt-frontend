import { useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks";
import { formatDate, formatReadableDate } from "../../utils/date";
import styled from "styled-components";
import { CategoryIcon } from "../../components";

const Transaction = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Left = styled.div`
  flex: 1;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1000;
`;
const Right = styled.div`
  flex: 1;
`;

const AccountingDate = styled.div``;
const Text = styled.div`
  font-weight: bold;
`;
const CategoryName = styled.div``;

const Amount = styled.div``;

function TransactionListMobile() {
  const transactions = useTransactions();
  const categories = useCategories();
  const today = formatDate(new Date());
  // const [type, setType] = useState(typeOptions[0]);

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    fromDate = formatDate(fromDate);
    transactions.setFromAndToDate(fromDate, today);
  }, []);

  return (
    <div>
      {transactions.transactions.map((transaction) => (
        <Transaction key={transaction.id}>
          <Left>
            <CategoryIcon
              color={
                categories.categories.find(
                  (c) => c.id === transaction.category_id
                )?.color ?? "lightgrey"
              }
            />
          </Left>
          <Middle>
            <AccountingDate>
              {formatReadableDate(transaction.accounting_date)}
            </AccountingDate>
            <Text>{transaction.text}</Text>
            <CategoryName>
              {categories.categories.find(
                (c) => c.id === transaction.category_id
              )?.name ?? "Unknown"}
            </CategoryName>
          </Middle>
          <Right>
            <Amount>{transaction.amount}</Amount>
          </Right>
        </Transaction>
      ))}
    </div>
  );
}

export default TransactionListMobile;
