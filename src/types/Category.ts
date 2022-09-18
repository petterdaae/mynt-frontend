interface Category extends DraftCategory {
  id: number;
}

interface DraftCategory {
  name: string;
  parentId: number | null;
  color: string;
  ignore: boolean | null;
}

export type { Category, DraftCategory };
