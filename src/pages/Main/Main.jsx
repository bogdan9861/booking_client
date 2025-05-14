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
  const { getAllPlaces } = service();
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <>
      <Header />
      <div className="main">
        <Map places={places} />
        <div className="main__inner">
          {!loading ? (
            places.map((el) => (
              <Place
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
              <Empty description="Все места забронированны" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
