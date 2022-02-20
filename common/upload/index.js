import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { Modal, notification, Upload } from "antd";
import Image from "next/image";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { storage } from "../../utils/firebase";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const firebaseRequest = (image) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${image}`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, image).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot);
  });
  // const mountainsRef = ref(storage, image);

  // Create a reference to 'images/mountains.jpg'
  // const mountainImagesRef = ref(storage, `images/${image}`);
  // console.log(mountainsRef, "mountainsRef")
  // console.log(mountainImagesRef, 'mountainImagesRef')
  // const upload = storage.ref(`images/${image}`).put(image);
  // upload.on(
  //   "state_changed",
  //   snapshot => {},
  //   error => {
  //     notification.error({
  //       message: error
  //     })
  //   },
  //   async () => {
  //       const result = await storage.ref('images').child(image).getDownloadURL();
  //       console.log(result, "result");
  //       return result;
  //   }
  // )
};

const UploadImage = ({ onLoad }) => {
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState(img || []);

  const handleChange = async (info) => {
    setFileList(info.fileList);
    console.log(info.file.name, "info");
    const data = await firebaseRequest(info.file.name);
    setImg(data);
    setLoading(false);
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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // setImg(reader.result)
      const data = await firebaseRequest(reader.result);
      console.log(data, "data");
      setFileList([reader.result]);
      // console.log(reader.result, 'result')
    };

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
