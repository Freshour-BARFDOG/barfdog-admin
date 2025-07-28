import Loader from "@/components/common/loader/Loader";
import DogDetail from "@/components/pages/dogs/detail/DogDetail";
import { PageProps } from "@/types/common";
import { Suspense } from "react";

type Params = { dogId: string };

export default async function DogDetailPage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const dogId = Number(resolvedParams.dogId);

  return (
    <Suspense fallback={<Loader fullscreen />}>
      <DogDetail dogId={dogId} />;
    </Suspense>
  )
}