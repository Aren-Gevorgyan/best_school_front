import CreateOption from "../common/adminka/option_";
import CreateOptionItems from "../common/adminka/optionItems_";
import CreateQuestions from "../common/adminka/question_";
import PropTypes from "prop-types";
import CommonLayout from "../common/commonLayout";
import { useEffect, useState } from "react";
interface props {
  options: Array<Object>;
  questions: Array<Object>;
  optionItems: Array<Object>;
}

const Adminka = ({ options, optionItems, questions }: props) => {
  const [optionsItems, setOptionsItems] = useState(options);
  
  useEffect(() => {
    setOptionsItems(options);
  }, [options]);

  return (
    <CommonLayout>
      <CreateOption
        optionsItems={optionsItems}
        setOptionsItems={setOptionsItems}
      />
      <CreateOptionItems itemsData={optionItems} options={optionsItems} />
      <CreateQuestions options={optionsItems} questions={questions} />
    </CommonLayout>
  );
};

Adminka.propTypes = {
  options: PropTypes.array,
  questions: PropTypes.array,
};

Adminka.defaultProps = {
  options: [],
  questions: [],
};

export default Adminka;
