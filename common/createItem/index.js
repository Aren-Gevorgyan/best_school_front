import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import SvgPlus from "../svgIcons/Plus";

const CreateItem = ({ onClick }) => {
  return (
    <div className={styles.item}>
      <span onClick={onClick}>
        <SvgPlus width={20} height={20} />
      </span>
    </div>
  );
};

CreateItem.propTypes = {
  onClick: PropTypes.func,
};

CreateItem.defaultProps = {
  onClick: () => {},
};

export default CreateItem;
