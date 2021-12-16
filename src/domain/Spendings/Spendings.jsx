import { useState } from "react";
import TransactionList from "../TransactionList/TransactionList";
import SpendingsList from "./SpendingsList";
import Summary from "./Summary";
import { Text, Divider } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { useCategories } from "../../hooks";

function Spendings() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const { categories, loading } = useCategories();
  return (
    !loading && (
      <>
        <CategoryBreadcrumb
          categories={categories}
          currentCategoryId={currentCategory}
          setCurrentCategoryId={setCurrentCategory}
        />
        <Text fontSize="2xl">Summary</Text>
        <Divider mb="2" mt="2" />
        <Summary currentCategory={currentCategory} />
        <Text fontSize="2xl">Spendings</Text>
        <Divider mb="2" mt="2" />
        <SpendingsList
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <Text fontSize="2xl">Transactions</Text>
        <Divider mb="2" mt="2" />
        <TransactionList categoryId={currentCategory} />
      </>
    )
  );
}

export default Spendings;
