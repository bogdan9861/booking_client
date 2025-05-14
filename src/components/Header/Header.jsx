import React, { useEffect, useState } from "react";
import { Input } from "antd";

import "./Header.scss";
import { Link, useParams, useSearchParams } from "react-router-dom";
import service from "../../api/service";

const Header = () => {
  const { current } = service();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    current()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <Input.Search
          className="header__search"
          placeholder="Поиск по адресу..."
          onSearch={(text) => setSearchParams(`?location=${text}`)}
        />
        <Link className="header__profile-link" to={"/profile"}>
          <img
            style={{ width: 30 }}
            className="header__profile"
            src="https://img.icons8.com/?size=100&id=vQXItsKYqoPT&format=png&color=000000"
            alt=""
          />
          <span>{user?.name}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
