import React, { useEffect, useState } from "react";

import "./Profile.scss";
import service from "../../api/service";
import Place from "../../components/Place/Place";
import BackButton from "../../components/BackButton/BackButton";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [places, setPlaces] = useState([]);

  const { getMyPlaces, current } = service();
  const navigate = useNavigate();

  useEffect(() => {
    current().then((res) => {
      if (res.data.data.role === "ADMIN") {
        navigate("/profile/admin");
      }
    });
  }, []);

  useEffect(() => {
    getMyPlaces()
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onLeave = () => {
    localStorage.removeItem("booking-token");
    navigate("/login");
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <BackButton />
        <button className="profile__exit" onClick={onLeave}>
          <img
            src="https://img.icons8.com/?size=100&id=Wgd88M98QIxt&format=png&color=DB0404"
            alt=""
          />
        </button>
      </div>
      <div className="profile__wrapper">
        {places.length ? (
          <>
            <span className="profile__title">
              Ваши забронированные помещения
            </span>
            <div className="profile__inner">
              {places.map((place) => (
                <Place footerShown={false} place={place} />
              ))}
            </div>
          </>
        ) : (
          <Empty description={"Нет забронированных помещений"} />
        )}
      </div>
    </div>
  );
};

export default Profile;
