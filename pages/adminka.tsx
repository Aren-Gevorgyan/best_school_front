import Adminka from "../components/adminka"

export default Adminka;

export async function getServerSideProps(context: Object) {
    return {
        props: {}, // will be passed to the page component as props
    }
}