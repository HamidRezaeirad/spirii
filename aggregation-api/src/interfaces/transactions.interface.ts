interface Item {
  id: string;
  userId: string;
  createdAt: string;
  type: string;
  amount: number;
}

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Transactions {
  items: Item[];
  meta: Meta;
}
