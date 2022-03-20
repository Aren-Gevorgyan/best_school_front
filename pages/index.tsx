import Home from "../components/home";
import { clientApi } from "../api/client";

export default Home;

export async function getServerSideProps(context: Object) {
  const url = `${clientApi}option`;

  const options = await fetch(url, { method: "get" }).then((res) => res.json());

  return {
    props: {
      options,
    }, // will be passed to the page component as props
  };
}
