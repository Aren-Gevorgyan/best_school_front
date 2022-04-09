import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useEffect, useState } from "react";
import { Modal, Form, Select, notification } from "antd";
import SvgClose from "../../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";
import UploadImage from "../upload";
import SelectQuestions from "./selectAnswers";
import { clientApi } from "../../../api/client";
import QuestionItems from "./questionItems";

const { Option } = Select;

const CreateQuestion = ({ optionsItems, questions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [optionItems, setOptionItems] = useState([]);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editQuestionIndex, setEditQuestionIndex] = useState(0);
  const [questionsData, setQuestionsData] = useState(questions);
  const [form] = Form.useForm();

  useEffect(() => {
    setQuestionsData(questions);
  }, [questions]);

  useEffect(() => {
    const currentData = questionsData[editQuestionIndex];

    form.setFieldsValue({
      title: currentData?.title,
      chooseQuestion: currentData?.optionId,
    });
    setImg(currentData?.image);
    setRightAnswer(currentData?.rightAnswer);
    setSelectedAnswers(!!currentData?.answers ? currentData?.answers : []);
  }, [editQuestion]);

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (!editQuestion) {
      form.resetFields();
      setRightAnswer(0);
      setSelectedAnswers([]);
      setImg("");
    }
  }, [isModalVisible]);

  const saveData = async (e) => {
    if (!e.chooseQuestion) {
      notification.error({
        message: "OptionId is required",
      });
      return;
    }

    const data = {
      title: e.title,
      image: img,
      answers: selectedAnswers,
      //pars number
      rightAnswer: +rightAnswer,
      optionId: e.chooseQuestion,
    };

    const questionsUrl = `${clientApi}questions/create`;

    const questions = await fetch(questionsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    setIsModalVisible(false);
    setQuestionsData([...questionsData, questions]);
  };

  useEffect(() => {
    const optionItems = optionsItems.map((value, index) => {
      return (
        <Option key={value._id + index} value={value._id}>
          {value.title}
        </Option>
      );
    });
    setOptionItems(optionItems);
  }, [optionsItems]);

  const questionItemEdit = async (e, id) => {
    const optionItemUrl = `${clientApi}questions/${id}`;

    const data = {
      title: e.title,
      optionId: e.chooseOption,
      answers: selectedAnswers,
      //pars number
      rightAnswer: +rightAnswer,
      image: img,
    };

    const questionItem = await fetch(optionItemUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    const newQuestionItem = questionsData.map((val, i) => {
      return val._id === questionItem._id ? questionItem : val;
    });

    setIsModalVisible(false);
    setEditQuestion(false);
    setQuestionsData(newQuestionItem);
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
          setEditQuestion={setEditQuestion}
          setEditQuestionIndex={setEditQuestionIndex}
        />
      </div>
      <Modal
        footer={null}
        title={
          <h2 className={styles.title}>
            {editQuestion ? "Edit" : "Create"} question
          </h2>
        }
        className={styles.modal}
        visible={isModalVisible}
        closeIcon={
          <span className={styles.close}>
            <SvgClose height="24px" width="24px" />
          </span>
        }
        onCancel={() => {
          setIsModalVisible(false);
          setEditQuestion(false);
        }}
      >
        <div className={styles.contentModal}>
          <Form
            form={form}
            onFinish={(e) => {
              if (editQuestion) {
                questionItemEdit(e, questionsData[editQuestionIndex]._id);
              } else {
                saveData(e);
              }
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
                maxLength={400}
              />
            </Form.Item>
            <h3>Answers</h3>
            <SelectQuestions
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
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
              image={img}
              setImg={setImg}
              onLoad={(e) => {
                setImg(e);
              }}
            />
            <div className={styles.buttonsContainer}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsModalVisible(false);
                  setEditQuestion(false);
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
  optionsItems: PropTypes.array,
  questions: PropTypes.array,
};

CreateQuestion.defaultProps = {
  optionsItems: [],
  questions: [],
};

export default CreateQuestion;
