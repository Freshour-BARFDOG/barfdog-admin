import DogDetail from "@/components/pages/dogs/detail/DogDetail";

interface PageProps {
  params: {
    dogId: string;
  };
}

export default function DogDetailPage({ params }: PageProps) {
  const dogId = Number(params.dogId);
  return <DogDetail dogId={dogId} />;
}
