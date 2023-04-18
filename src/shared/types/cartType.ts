export interface ResCart {
  data: Data;
  message: string;
}

export interface Data {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  cart_items: CartItem[];
}

export interface CartItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  quantity: number;
  cartId: string;
  item: Item;
}

export interface Item {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  description: string;
  quantity: number;
  price: number;
  cost: number;
  images: string[];
  stock: number;
  details: string;
  sku: string;
}

export interface ReqAddCart {
  items: ReqCartItem[];
}

export interface ReqCartItem {
  itemId: string;
  quantity: number;
}
