import ExTable from "@/components/common/ex/ExTable";
import ExLabeledCheckBox from "@/components/common/ex/ExLabeledCheckBox";
import ExLabeledRadioButton from "@/components/common/ex/ExLabeledRadioButton";
import ExPagination from "@/components/common/ex/ExPagination";
import ExDatePicker from "@/components/common/ex/ExDatePicker";
import Card from "@/components/common/card/Card";
import ExInput from "@/components/common/ex/ExInput";
import ExSelectBox from "@/components/common/ex/ExSelectBox";
import ExTextArea from "@/components/common/ex/ExTextArea";

export default function Home() {
  return (
    <section>
      <Card shadow='none' gap={32} padding={20} align='start'>
        <ExTextArea />
        <ExSelectBox />
        <ExInput />
        <ExDatePicker />
        <ExLabeledRadioButton />
        <ExLabeledCheckBox />
        <ExTable />
        <ExPagination />
      </Card>
    </section>
  );
}
