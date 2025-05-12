import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import service from "../../api/service";

import "./Login.scss";

const Login = () => {
  const { login } = service();

  const navigation = useNavigate();

  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    login({ login: loginText, password })
      .then((res) => {
        localStorage.setItem("booking-token", res.data.token);
        navigation("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="login">
      <Card className="login__card">
        <h1 className="login__title">Войдите в аккаунт</h1>
        <p className="login__text">
          Продолжая, вы соглашаетесь с нашим Пользовательским соглашением и
          подтверждаете, что понимаете Политику конфиденциальности
        </p>
        <Input
          className="login__input"
          placeholder="Логин"
          onChange={(e) => setLoginText(e.target.value)}
        />
        <Input
          className="login__input"
          placeholder="Пароль"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login__btn-wrapper">
          <Button className="login__btn" type="primary" onClick={onLogin}>
            Войти
          </Button>

          <Link className="login__link-text" to="/register">
            Создать аккаунт
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
