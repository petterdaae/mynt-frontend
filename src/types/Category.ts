interface Category {
  id: number;
  name: string;
  parentId: number | null;
  color: string;
  ignore: boolean | null;
}

export default Category;
