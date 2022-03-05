import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useEffect, useState } from "react";
import { Modal, Form, Select, notification } from "antd";
import SvgClose from "../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";
import UploadImage from "../upload";
import SelectQuestions from "./selectQuestion";
import { clientApi } from "../../api/client";
import QuestionItems from './questionItems';

const { Option } = Select;

const CreateQuestion = ({ options, questions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [optionItems, setOptionItems] = useState([]);
  const [optionId, setOptionId] = useState("");
  const [questionsData, setQuestionsData] = useState(questions);
  const [form] = Form.useForm();

  useEffect(()=>{
    setQuestionsData(questions)
  }, [questions])

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    form.resetFields();
    setRightAnswer(0);
    setSelectedQuestions([]);
    setImg("");
    setOptionId("");
  }, [isModalVisible]);

  const saveData = async (e) => {

    if (!optionId) {
      notification.error({
        message: "OptionId is required",
      });
      return
    }

    const data = {
      title: e.title,
      image: img,
      answers: selectedQuestions,
      //pars number
      rightAnswer: +rightAnswer,
      optionId,
    };

    const questionsUrl = `${clientApi}question/create`;

    const questions = await fetch(questionsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    console.log(questions, "questions");

    setIsModalVisible(false);
    setQuestionsData([...questionsData, questions])
  };

  useEffect(() => {
    const optionItems = options.map((value, index) => {
      return (
        <Option key={value._id + index} value={value._id}>
          {value.title}
        </Option>
      );
    });
    setOptionItems(optionItems);
  }, [options]);

  const onChange = (value) => {
    setOptionId(value);
  };

  return (
    <div className={styles.container}>
      <h2>Create Question</h2>
      <div className={styles.containerItems}>
        <CreateItem onClick={onClick} />
        <QuestionItems
          questionData={questionsData}
          setQuestionData={setQuestionsData}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
      <Modal
        footer={null}
        title={<h2 className={styles.title}>Create question</h2>}
        className={styles.modal}
        visible={isModalVisible}
        closeIcon={
          <span className={styles.close}>
            <SvgClose height="24px" width="24px" />
          </span>
        }
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <div className={styles.contentModal}>
          <Form
            form={form}
            onFinish={(e) => {
              saveData(e);
            }}
          >
            <h3>Question</h3>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "This filed is required",
                },
              ]}
            >
              <TextArea
                className={styles.textArea}
                rows={4}
                placeholder="Question"
                maxLength={200}
              />
            </Form.Item>
            <h3>Question</h3>
            <SelectQuestions
              selectedQuestions={selectedQuestions}
              setSelectedQuestions={setSelectedQuestions}
              rightAnswer={rightAnswer}
              setRightAnswer={setRightAnswer}
            />
            <h3>Choose Question</h3>
            <Form.Item name="chooseQuestion">
              <Select
                className={styles.questionItem}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionItems}
              </Select>
            </Form.Item>
            <h3>Question photo</h3>
            <UploadImage
              onLoad={(e) => {
                setImg(e);
              }}
            />
            <div className={styles.buttonsContainer}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                Cancel
              </button>

              <button className={styles.saveButton} type="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

CreateQuestion.propTypes = {
  options: PropTypes.array,
  questions: PropTypes.array,
};

CreateQuestion.defaultProps = {
  options: [],
  questions: [],
};

export default CreateQuestion;
