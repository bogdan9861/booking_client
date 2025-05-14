import React, { useState } from "react";
import { Button, Card, Input, message, Spin } from "antd";
import Dragger from "antd/es/upload/Dragger";
import service from "../../api/service";

import "./AdminProfile.scss";
import BackButton from "../../components/BackButton/BackButton";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { createPlace } = service();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Помещение успешно создано",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Произошла ошибка",
    });
  };

  const clearState = () => {
    setName("");
    setDescription("");
    setPrice("");
    setLocation("");
    setFile("");
    setFileList([]);
  };

  const onSubmit = () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("image", file);

    createPlace(formData)
      .then((res) => {
        success();
        clearState();
        setLoading(false);
      })
      .catch((e) => {
        error();
        setLoading(false);
      });
  };

  const onLeave = () => {
    localStorage.removeItem("booking-token");
    navigate("/login");
  };

  return (
    <div className="wrapper">
      {contextHolder}
      <div className="back__wrapper">
        <BackButton to={"/"} />
      </div>
      <button className="adminProfile__exit" onClick={onLeave}>
        <img
          src="https://img.icons8.com/?size=100&id=Wgd88M98QIxt&format=png&color=DB0404"
          alt=""
        />
      </button>
      <div className="adminProfile">
        <Card title="Добавить место">
          <Input
            className="adminProfile__input"
            placeholder="Название"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input.TextArea
            style={{ maxHeight: 200, minHeight: 60 }}
            aria-multiline={"true"}
            className="adminProfile__input"
            placeholder="Описание"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Input
            className="adminProfile__input"
            placeholder="Цена"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <Input
            className="adminProfile__input"
            placeholder="Адрес"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <span
            style={{ fontSize: 13, color: "rgba(0,0,0,0.7)", marginBottom: 5 }}
          >
            Выберите изображение
          </span>
          <Dragger
            onChange={(file) => {
              setFile(file.file.originFileObj);
              setFileList(file.fileList);
            }}
            fileList={fileList}
            accept=".jpg, .png, .webp, .jpeg"
          />
          <Button
            className="adminProfile__btn"
            type="primary"
            onClick={onSubmit}
            disabled={loading}
          >
            {!loading ? "Создать" : <Spin />}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
