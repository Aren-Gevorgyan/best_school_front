import CreateOption from "../common/createOption";
import CreateOptionItems from "../common/createOptionItems";
import CreateQuestions from "../common/createQuestion";
import PropTypes from "prop-types";
import CommonLayout from "../common/commonLayout";
interface props {
  options: Array<Object>;
  questions: Array<Object>;
  optionItems: Array<Object>;
}

const Adminka = ({ options, optionItems, questions }: props) => {
  return (
    <CommonLayout>
      <CreateOption options={options} />
      <CreateOptionItems itemsData={optionItems} options={options} />
      <CreateQuestions options={options} questions={questions} />
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
