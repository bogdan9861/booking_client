import { Button, Card, message, Popconfirm } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Counter from "../Counter/Counter";
import { setFile } from "../../utils/setFile";
import service from "../../api/service";
import { formatDate } from "../../utils/formatDate";

const Place = ({ place, places, setPlaces, footerShown }) => {
  const { bookPlace } = service();
  const [messageApi, contextHolder] = message.useMessage();

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(1);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Помещение усешно забронированно",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Произошла ошибка",
    });
  };

  const onBook = (id) => {
    if (!footerShown) return;

    bookPlace({ placeId: id, days: +value })
      .then((res) => {
        let newArr = places.filter((place) => place.id !== id);
        setPlaces(newArr);

        success();
      })
      .catch((e) => {
        error();
      });
  };

  const setRoute = () => {
    setSearchParams(`?endAddress=${place.location}`);
  };

  return (
    <Card className="main__card" onClick={setRoute}>
      {contextHolder}
      <img className="main__card-img" src={setFile(place.image)} alt="" />
      <span className="main__card-title">{place.name}</span>
      <p className="main__card-text">{place.description}</p>
      <div className="location-wrapper">
        <img
          className="main__card-location__img"
          src="https://img.icons8.com/?size=100&id=7880&format=png&color=3DAF26"
          alt=""
        />
        <span className="main__card-location">{place.location}</span>
      </div>
      <div className="main__card-inner">
        {footerShown ? (
          <span className="main__card-price">
            {value > 0 ? +place.price * +value : place.price} руб./д
          </span>
        ) : (
          <span className="main__card-price">
            {place.PlaceToUser[0].days > 0
              ? +place.price * +place.PlaceToUser[0].days
              : place.price}
            руб./д
          </span>
        )}

        {!footerShown && (
          <span className="main__card-date">
            До {formatDate(place.PlaceToUser[0]?.endDate)}
          </span>
        )}

        {footerShown ? (
          <>
            <Counter value={value} setValue={setValue} />
            <Popconfirm
              placement="topLeft"
              title={"Забронировать помещение?"}
              description={
                value > 0
                  ? `${+place.price * +value} руб./д`
                  : `${place.price} руб./д`
              }
              okText="Да"
              cancplaceText="Нет"
              onConfirm={() => onBook(place.id)}
            >
              <Button
                type="primary"
                style={{ width: 55 }}
                className="main__card-btn"
              >
                готово
              </Button>
            </Popconfirm>
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default Place;
