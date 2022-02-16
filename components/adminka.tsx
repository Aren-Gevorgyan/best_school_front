import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreateOption from '../common/createOption'
import CreateQuestions from '../common/createQuestion'
import LayoutAdminka from '../common/layoutAdminka';
import PropTypes from 'prop-types';
import CommonLayout from '../common/commonLayout';
interface props {
    options: Array<Object>
    questions: Array<Object>
}

const Adminka = ({ options, questions }: props) => {

    return (
        <CommonLayout>
            <CreateOption options={options} />
            <CreateQuestions questions={questions} />
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