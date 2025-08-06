import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface UseSearchCategoryKeywordProps<T, K extends keyof T = keyof T> {
  searchValues: T;
  setSearchValues: React.Dispatch<React.SetStateAction<T>>;
  initialCategoryOptions: K[];
  defaultCategory?: K;
}

// 검색 카테고리 및 키워드를 제어하는 공통 훅
// - 특정 검색 필드들 중 하나를 선택하여 키워드로 검색할 수 있게끔 제어
// - 예: 이메일 or 이름 중 하나 선택하여 검색할 때

export function useSearchCategoryKeyword<T, K extends keyof T = keyof T>({
  searchValues,
  setSearchValues,
  initialCategoryOptions,
  defaultCategory,
}: UseSearchCategoryKeywordProps<T, K>) {
  const searchParams = useSearchParams();


  // 쿼리 파라미터 중 initialCategoryOptions 안에 포함된 key가 있는지 검사하여
  // URL에서 선택된 카테고리를 추론 (ex. ?name=abc → 'name')
  const inferredCategory = initialCategoryOptions.find((key) =>
    searchParams?.has(String(key))
  );

  // 실제 초기 카테고리 결정 순서:
  // URL에서 유추된 값 → 기본값 → 옵션 배열의 첫 번째 값
  const resolvedInitialCategory: K =
    inferredCategory ?? defaultCategory ?? initialCategoryOptions[0];

  const [selectedCategory, setSelectedCategory] = useState<K>(resolvedInitialCategory);


  // 카테고리 변경 핸들러
  const onChangeCategory = (category: K) => {
    setSelectedCategory(category);

    // 기존 category 외의 다른 category의 값을 초기화
    setSearchValues((prev) => {
      const updated: Partial<T> = { ...prev };

      initialCategoryOptions.forEach((key) => {
        updated[key] = key === category ? prev[key] : ('' as any);
      });
      return updated as T;
    });
  };

  // 키워드 입력 핸들러
  const onChangeKeyword = (keyword: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [selectedCategory]: keyword,
    }));
  };

  return {
    selectedCategory,
    setSelectedCategory,
    keyword: searchValues[selectedCategory] as unknown as string,
    onChangeCategory,
    onChangeKeyword,
  };
}