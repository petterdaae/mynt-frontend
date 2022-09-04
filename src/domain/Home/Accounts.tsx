import { HStack, Text, Box, Badge, VStack, Divider } from "@chakra-ui/react";
import { useAccounts } from "../../hooks";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { formatCurrency } from "../utils";

function Accounts() {
  const { accounts, loading } = useAccounts();
  console.log(accounts);

  return loading ? (
    <>Loading</>
  ) : (
    <div>
      {accounts
        .filter((account) => !["Studielån", "Utgifter"].includes(account.name))
        .map((account) => (
          <div key={account.id}>
            <HStack justify="space-between" m="4px" p="4px">
              <HStack align="left">
                <CategoryIcon color={"lightgray"} size="md" />
                <VStack align="left" spacing="1px">
                  <Text fontSize="small">{account.accountNumber}</Text>
                  <Text fontWeight="bold">{account.name}</Text>
                  <Text fontSize="small">
                    {formatCurrency(account.balance)}
                  </Text>
                </VStack>
              </HStack>
              <Box>
                <Badge colorScheme={"blue"} fontSize="1.0em">
                  {formatCurrency(account.available)}
                </Badge>
              </Box>
            </HStack>
            <Divider />
          </div>
        ))}
    </div>
  );
}

export default Accounts;
