import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { Modal, notification, Upload } from "antd";
import Image from "next/image";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { firebaseRequest } from "../../utils/firebase";


const UploadImage = ({ onLoad }) => {
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState(img || []);

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

    console.log(data, 'data', 1111111111111111)

    return isJpgOrPng && isLt2M;
  };

  const handleCancel = () => setShowModal(false);

  const handlePreview = (file) => {
    // console.log(file, "handlePreview")
    if (!file.url && !file.preview) {
      getBase64(file.originFileObj, (result) => {
        file.preview = result;
      });
    }

    // setImg(file.url || file.preview);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
      {!!img && (
        <Image src={img} layout="fixed" width={50} height={50} alt="ssds" />
      )}
    </div>
  );

  console.log(img, "img");

  return (
    <>
      <Upload
        accept="image/jpg, image/png, image/jpeg "
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

UploadImage.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default UploadImage;
