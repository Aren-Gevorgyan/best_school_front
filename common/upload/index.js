import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import {notification, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { firebaseRequest } from "../../utils/firebase";

const UploadImage = ({ onLoad }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleChange = async (info) => {
    setFileList(info.fileList);
    setLoading(false);
  };

  const beforeUpload = async (file) => {
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

    const data = await firebaseRequest(file);

    const imgUrl = `https://firebasestorage.googleapis.com/v0/b/bestschool-16484.appspot.com/o/images%2F${data.metadata.name}?alt=media`;

    onLoad(imgUrl);

    return isJpgOrPng && isLt2M;
  };

  const handlePreview = () => {
    setShowModal(true)
  }

  const uploadButton = (
    <div className={styles.uploadContent}>
      <p> Support PDF, JPG, JPEG, PNG</p>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div >Upload photo</div>
    </div>
  );

  return (
    <div className={styles.uploadContainer}>
      <Upload
        accept="image/jpg, image/png, image/jpeg "
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList.length < 1 && uploadButton}
      </Upload>
    </div>
  );
};

UploadImage.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default UploadImage;
