import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Account } from "../../types";
import AccountIcon from "../Icons/AccountIcon";
import { formatCurrency } from "../utils";

const Card = styled.div`
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  width: 100%;
`;

interface Props {
  accounts: Account[];
  setFavorite: (id: string, favorite: boolean) => void;
  areFavorites: boolean;
}

function Accounts({ accounts, setFavorite, areFavorites }: Props) {
  return (
    <VStack m="4">
      {accounts
        .sort((account) => (account.name === "Kort" ? 0 : 1))
        .map((account) => (
          <Card key={account.id}>
            <VStack p="4" align="left">
              <HStack justify="space-between">
                <HStack>
                  <AccountIcon
                    size="md"
                    isCard={account.name === "Kort"}
                    onClick={() => setFavorite(account.id, !areFavorites)}
                  />
                  <Text fontSize="16px" fontWeight="bold">
                    {account.name}
                  </Text>
                </HStack>
                <Box>
                  <Badge
                    colorScheme={account.available >= 0 ? "blue" : "red"}
                    fontSize="1.0em"
                  >
                    {formatCurrency(account.available)}
                  </Badge>
                </Box>
              </HStack>
            </VStack>
          </Card>
        ))}
    </VStack>
  );
}

export default Accounts;
