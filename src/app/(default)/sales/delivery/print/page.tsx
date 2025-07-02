import { useRouter } from "next/router";

export default function GoodsflowPrint() {
  const router = useRouter();
  const data = router.query.data as string;

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
}

export async function getServerSideProps() {
  return { props: {} };
}
