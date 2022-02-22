import { clientApi } from "../api/client";
import Adminka from "../components/adminka"

export default Adminka;

export async function getServerSideProps(context: Object) {

    const optionUrl = `${clientApi}option`;
    const questionUrl = `${clientApi}question`;


    const options = await fetch(optionUrl, { method: "get" }).then(res => res.json());

    const questions = await fetch(questionUrl, { method: "get" }).then(res => res.json());

    console.log(options, "options");

    return {
        props: {
            options,
            questions
        }, // will be passed to the page component as props
    }
}