import Question from "../../components/questions";
import { clientApi } from "../../api/client";
export default Question;

interface context {
  query: { pid: String };
}

export async function getServerSideProps(context: context) {
  const id = context?.query?.pid;
  const url = `${clientApi}questions/${id}`;

  const questions = await fetch(url, { method: "get" }).then((res) =>
    res.json()
  );

  return {
    props: {
      questions,
    }, // will be passed to the page component as props
  };
}
