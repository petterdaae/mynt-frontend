import { HStack, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useAccounts } from "../../hooks";
import AccountIcon from "../CategoryIcon/AccountIcon";
import { formatCurrency } from "../utils";

const Card = styled.div`
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  width: 100%;
`;

function Accounts() {
  const { accounts, loading } = useAccounts();
  console.log(accounts);

  return loading ? (
    <>Loading</>
  ) : (
    <VStack m="4">
      {accounts.map((account) => (
        <Card key={account.id}>
          <VStack p="4" align="left">
            <HStack justify="space-between">
              <HStack>
                <AccountIcon size="md" isCard={account.name === "Kort"} />
                <Text fontSize="16px" fontWeight="bold">
                  {account.name}
                </Text>
              </HStack>
              <Text fontSize="20px" fontWeight="bold">
                {formatCurrency(account.available)}
              </Text>
            </HStack>
          </VStack>
        </Card>
      ))}
    </VStack>
  );
}

export default Accounts;
