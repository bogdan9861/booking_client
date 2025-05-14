import { Card, Input } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

import "./AdminProfile.scss";
import BackButton from "../../components/BackButton/BackButton";

const AdminProfile = () => {
  return (
    <div className="wrapper">
      <div className="back">
        <BackButton />
      </div>
      <div className="adminProfile">
        <Card title="Добавить место">
          <Input placeholder="Название" />
          <Input placeholder="Описание" />
          <Input placeholder="Цена" type="number" />
          <Input placeholder="Адрес" />
          <Dragger />
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
