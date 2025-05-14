import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Empty, Spin } from "antd";
import service from "../../api/service";

import Header from "../../components/Header/Header";
import Place from "../../components/Place/Place";
import Map from "../../components/Map/Map";

import "./Main.scss";

const Main = () => {
  const navigate = useNavigate();
  const { getAllPlaces, current } = service();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("booking-token")) {
      navigate("/login");
    }

    setLoading(true);

    getAllPlaces({ location: searchParams.get("location") })
      .then((res) => {
        setLoading(false);
        setPlaces(res.data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [searchParams.get("location")]);

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
    <>
      <Header user={user} />
      <div className="main">
        <Map places={places} />
        <div className="main__inner">
          {!loading ? (
            places.map((el) => (
              <Place
                user={user}
                places={places}
                setPlaces={setPlaces}
                place={el}
                footerShown={true}
              />
            ))
          ) : (
            <Spin />
          )}
          <div
            style={{
              width: "100vw",
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {places.length === 0 && !loading && (
              <Empty description="Данные отсутствуют" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
