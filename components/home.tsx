import CommonLayout from '../common/commonLayout'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
interface options {
    options: Array<Object>
}

const Home = ({ options }: options) => {
    const [optionsItem, setOptionsItem] = useState([]);

    useEffect(() => {
        const items: any = options.map((val: any, index: number) => {

            return <div key={val._id + index}>{val?.title}</div>
        })

        setOptionsItem(items);

    }, [options])

    return (
        <CommonLayout>
            {optionsItem}
        </CommonLayout>
    )
}

Home.protoTypes = {
    options: PropTypes.array.isRequired
}

export default Home;