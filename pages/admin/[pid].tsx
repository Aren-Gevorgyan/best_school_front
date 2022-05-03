import { clientApi } from "../../api/client";
import Adminka from "../../components/adminka";
import Router from "next/router";

export default Adminka;

export async function getServerSideProps(context: { params: { pid: Object } }) {
  if (context.params.pid !== "55730010") return Router.push(`/404`);

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
