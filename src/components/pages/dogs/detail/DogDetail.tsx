"use client";

import { useGetDogDetail } from "@/api/dogs/queries/useGetDogDetail";
import MemberInfo from "./member/MemberInfo";
import SubscribeInfo from "./subscribe/SubscribeInfo";
import ListLayout from "@/components/layout/listLayout/ListLayout";

interface DogDetailProps {
  dogId: number;
}

export default function DogDetail({ dogId }: DogDetailProps) {
  const { data } = useGetDogDetail(dogId);

  return (
    <ListLayout>
      <MemberInfo memberId={data.dogDto.memberId} />
      <SubscribeInfo subscribeId={data.dogDto.subscribeId} />
    </ListLayout>
  );
}
