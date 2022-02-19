import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { Modal, notification } from "antd";
import Image from "next/image";
import SvgPlus from "../svgIcons/Plus";

const Upload = ({ onLoad }) => {
  const [img, setImg] = useState();
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState(img || []);

  const handleChange = ({ fileList: newFileList }) => {
    const file = newFileList[newFileList.length - 1];
    if (file) file.status = "done";
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";

    if (!isJpgOrPng) {
      notification.error({
        message: "photo",
      });
    }

    const isLt2M = file.size / 1024 / 1024 < 50;

    if (!isLt2M) {
      notification.error({ message: "error:Image must smaller than 50MB!" });
    }

    return isJpgOrPng && isLt2M;
  };

  const handleCancel = () => setShowModal(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setImg(file.url || file.preview);
  };

  const uploadButton = (
    <div>
      <SvgPlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={showModal} footer={null} onCancel={handleCancel}>
        <Image alt="example" style={{ width: "100%" }} src={img} />
      </Modal>
    </>
  );
};

Upload.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default Upload;
