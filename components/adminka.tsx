import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreateOption from '../common/createOption'
import CreateQuestions from '../common/createQuestion'
import LayoutAdminka from '../common/layoutAdminka';
import PropTypes from 'prop-types';
import CommonLayout from '../common/commonLayout';
import Image from 'next/image';
interface props {
    options: Array<Object>
    questions: Array<Object>
}

const Adminka = ({ options, questions }: props) => {

    return (
        <CommonLayout>
            <CreateOption options={options} />
            <CreateQuestions options={options} questions={questions} />
            {/* <Image layout='fill' src={"images/photo_2021-11-26_10-59-04.jpg"} alt={'sss'}/> */}
        </CommonLayout>
    )
}

Adminka.propTypes = {
    options: PropTypes.array,
    questions: PropTypes.array
}

Adminka.defaultProps = {
    options: [],
    questions: []
}

export default Adminka;