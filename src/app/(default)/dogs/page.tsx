import Loader from "@/components/common/loader/Loader";
import DogList from "@/components/pages/dogs/list/DogList";
import { Suspense } from "react";

export default function DogPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <DogList />
    </Suspense>
  )
}
