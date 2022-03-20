import { clientApi } from "../api/client";
import Adminka from "../components/adminka";

export default Adminka;

export async function getServerSideProps(context: Object) {
  const optionUrl = `${clientApi}option`;
  const questionUrl = `${clientApi}questions`;
  const optionItemsUrl = `${clientApi}option-items`;

  const options = await fetch(optionUrl, { method: "get" }).then((res) =>
    res.json()
  );

  const optionItems = await fetch(optionItemsUrl, { method: "get" }).then(
    (res) => res.json()
  );

  const questions = await fetch(questionUrl, { method: "get" }).then((res) =>
    res.json()
  );

  return {
    props: {
      options,
      optionItems,
      questions,
    }, // will be passed to the page component as props
  };
}
