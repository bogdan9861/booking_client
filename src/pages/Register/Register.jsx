import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss";
import service from "../../api/service";

const Register = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { register } = service();
  const navigate = useNavigate();

  const onSubmit = () => {
    register({ name, login, password })
      .then((res) => {
        localStorage.setItem("booking-token", res.data.token);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="login">
      <Card className="login__card">
        <h1 className="login__title">Создайте аккаунт</h1>
        <p className="login__text">
          Продолжая, вы соглашаетесь с нашим Пользовательским соглашением и
          подтверждаете, что понимаете Политику конфиденциальности
        </p>
        <Input
          className="login__input"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="login__input"
          placeholder="Логин"
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          className="login__input"
          placeholder="Пароль"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login__btn-wrapper">
          <Button className="login__btn" type="primary" onClick={onSubmit}>
            Создать
          </Button>

          <Link className="login__link-text" to="/login">
            Войти в аккаунт
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
