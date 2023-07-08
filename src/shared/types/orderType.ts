import { Item } from '@/shared/types/cartType';

export type OrderRes = {
  data: OrderData[];
};

export type OrderData = {
  id: number;
  created_at: string;
  updated_at: string;
  total_quantity: number;
  status: string;
  total_price: number;
  orderItems: OrderItem[];
};

export type OrderItem = {
  id: number;
  created_at: string;
  quantity: number;
  price: number;
  item: Item;
};

export enum OrderStatus {
  pending = 'Đang vận chuyển',
  complete = 'Đã thanh toán',
  cancel = 'Đã hủy',
}
