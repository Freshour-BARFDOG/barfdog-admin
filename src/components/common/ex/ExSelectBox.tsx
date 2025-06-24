'use client';
import { useState } from "react";
import SelectBox from "@/components/common/selectBox/SelectBox";
import Text from "@/components/common/text/Text";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";

const DOG_SIZES = [
	{ label: '소형견', value: 'small' },
	{ label: '중형견', value: 'medium' },
	{ label: '대형견', value: 'large' },
];

const DOG_SEARCH = [
	{ label: '반려견 이름', value: 'dogName' },
	{ label: '견주 이름', value: 'name' },
	{ label: '견주 이메일', value: 'email' },
]
const ExSelectBox = () => {
	const [selected, setSelected] = useState<string | number>('');

	const [keywordSearch, setKeywordSearch] = useState<string>('dogName');
	const [keyword, setKeyword] = useState<string>('');

	return (
		<div style={{ width: '100%' }}>
			<Text type='title3'>SelectBox 예시</Text>
			<SelectBox
				options={DOG_SIZES}
				value={selected}
				onChange={(v) => setSelected(v as string)}
				placeholder="크기를 선택하세요"
			/>
			<SearchFilterKeyword
				categoryOptions={DOG_SEARCH}
				selectedCategory={keywordSearch}
				keyword={keyword}
				onChangeCategory={(v) => setKeywordSearch(v)}
				onChangeKeyword={(v) => setKeyword(v)}
				placeholder="검색어를 입력하세요"
			/>
		</div>
	);
};

export default ExSelectBox;