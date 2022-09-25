import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useAccounts } from "../../hooks";
import AccountIcon from "../CategoryIcon/AccountIcon";
import { formatCurrency } from "../utils";

const Card = styled.div`
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  flex: 0 0 350px;
`;

function Accounts() {
  const { accounts, loading } = useAccounts();
  console.log(accounts);

  return loading ? (
    <>Loading</>
  ) : (
    <HStack overflowX="scroll" m="2" p="2">
      {accounts.map((account) => (
        <Card key={account.id}>
          <VStack m="4" justify="space-evenly" align="left">
            <HStack justify="space-between" mb="6">
              <HStack pr="64px">
                <AccountIcon size="sm" />
                <Text fontSize="16px" fontWeight="bold">
                  {account.name.replace("\n", "")}
                </Text>
              </HStack>
              <Text fontSize="14px">{account.accountNumber}</Text>
            </HStack>
            <HStack justify="space-between">
              <Flex align="left" flexDir="column">
                <Text fontWeight="bold" fontSize="12px">
                  NOK
                </Text>
                <Text fontSize="26px" fontWeight="bold" mt="-10px">
                  {formatCurrency(account.available)}
                </Text>
              </Flex>
              <Flex align="left" flexDir="column">
                <Text fontSize="12px">NOK</Text>
                <Text fontSize="16px" mt="-5px">
                  {formatCurrency(account.balance)}
                </Text>
              </Flex>
            </HStack>
          </VStack>
        </Card>
      ))}
    </HStack>
  );
}

export default Accounts;
