import { Item } from '@/shared/types/cartType';

export type OrderRes = {
  data: OrderData[];
};

export type OrderData = {
  id: string;
  created_at: string;
  updated_at: string;
  total_quantity: number;
  status: string;
  total_price: number;
  orderItems: OrderItem[];
};

export type OrderItem = {
  id: string;
  created_at: string;
  quantity: number;
  price: number;
  item: Item;
  is_reviewed: boolean;
};

export enum OrderStatus {
  pending = 'Đang vận chuyển',
  complete = 'Đã thanh toán',
  cancel = 'Đã hủy',
}
