export interface ResCategories {
  data: Category[];
  meta: Meta;
  message: string;
}

export interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  image: string;
  name: string;
  description: string;
  parentId: null;
  slug: string;
  status: string;
  children: null;
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
