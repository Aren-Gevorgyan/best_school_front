import PropTypes from "prop-types";
import Footer from "./footer";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div>
      <h2>
        Best<span>School</span>
      </h2>
      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.object,
};

export default Header;
