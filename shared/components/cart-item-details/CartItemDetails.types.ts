export interface CartItemProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  details: string;
  disabled?: boolean;
}
