import Card from "@/components/common/card/Card";
import { OrderInfoDto } from "@/types/sales";

interface OrderInfoProps {
  orderInfoDto: OrderInfoDto;
}

export default function OrderInfo({ orderInfoDto }: OrderInfoProps) {
  return (
    <Card shadow="light">
      <></>
    </Card>
  );
}
