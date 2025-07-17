import GeneralProductEdit from "@/components/pages/products/general/GeneralProductEdit";

interface PageProps {
  params: {
    itemId: string;
  };
}

export default function GeneralProductCreatePage({ params }: PageProps) {
  const itemId = Number(params.itemId);
  return <GeneralProductEdit itemId={itemId} />;
}
