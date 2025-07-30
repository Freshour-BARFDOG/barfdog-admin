import { useMemo } from "react";
import { useGetAllianceList } from "@/api/products/queries/useGetAllianceList";

export const useAllianceOptions = () => {
  const { data: allianceData, isLoading, error } = useGetAllianceList();

  const allianceOptions = useMemo(() => {
    return (allianceData ?? []).map((alliance) => ({
      value: alliance.allianceId,
      label: alliance.allianceName,
    }));
  }, [allianceData]);

  return {
    allianceOptions,
    isLoading,
    error,
  };
};