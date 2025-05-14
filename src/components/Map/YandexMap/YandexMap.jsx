import React, { useEffect, useRef, useState } from "react";

import { Placemark, useYMaps, Map as Ymap } from "@pbe/react-yandex-maps";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";

const YandexMap = ({ places }) => {
  const [coords, setCoords] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [userCoords, setUserCoords] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [searchParams, setSearchParams] = useSearchParams();

  const mapRef = useRef();
  const routeRef = useRef(null);

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Не удалось получить геолокацию",
    });
  };

  useEffect(() => {
    setAddresses(places.map((place) => place.location));
  }, [places]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        setUserCoords([res.coords.latitude, res.coords.longitude]);
      },
      (e) => {
        error();
      }
    );
  }, []);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const geocodedCoords = [];

      for (const address of addresses) {
        try {
          const res = await window.ymaps.geocode(address);

          const firstGeoObject = res.geoObjects.get(0);
          if (firstGeoObject) {
            const coord = firstGeoObject.geometry.getCoordinates();
            geocodedCoords.push(coord);
          }
        } catch (err) {
          console.error("Ошибка геокодирования:", err);
        }
      }

      setCoords(geocodedCoords);
    };

    if (window.ymaps) {
      window.ymaps.ready(geocodeAddresses);
    }
  }, [addresses]);

  useEffect(() => {
    if (mapRef.current && searchParams.get("endAddress")) {
      console.log(123);

      buildRoute(searchParams.get("endAddress"));
    }
  }, [searchParams.get("endAddress"), mapRef.current]);

  const buildRoute = async (address) => {
    if (!window.ymaps || !mapRef.current) return;

    await window.ymaps.ready();

    const mapInstance = mapRef.current;

    if (routeRef.current) {
      mapInstance.geoObjects.remove(routeRef.current);
      routeRef.current = null;
    }

    window.ymaps.geocode(address).then((res) => {
      const destination = res.geoObjects.get(0)?.geometry.getCoordinates();

      if (!destination) {
        console.error("Адрес не найден");
        return;
      }

      window.ymaps.route([userCoords, destination]).then(
        (route) => {
          route.getPaths().options.set({
            strokeColor: "#4c72ed",
            strokeWidth: 3,
          });

          const wayPoints = route.getWayPoints();

          wayPoints.each(function (wayPoint, i) {
            if (i === 0) {
              wayPoint.options.set({
                iconLayout: "default#image",
                iconImageHref: "",
                iconImageSize: [32, 32],
                iconImageOffset: [-16, -16],
              });
            } else if (i === 1) {
              wayPoint.options.set({
                iconLayout: "default#image",
                iconImageHref: "",
                iconImageSize: [46, 54],
                iconImageOffset: [-16, -16],
              });
            }
          });

          mapInstance.geoObjects.add(route);
          routeRef.current = route;

          const bounds = route.getBounds();
          mapInstance.setBounds(bounds, {
            zoomMargin: 20,
            duration: 500,
          });
        },
        (error) => {
          console.error("Ошибка при построении маршрута:", error);
        }
      );
    });
  };

  return (
    <>
      {contextHolder}
      <Ymap
        instanceRef={mapRef}
        defaultState={{ center: userCoords || [55.75, 37.57], zoom: 10 }}
        width="100%"
        height="500px"
      >
        {coords.map((coord, index) => (
          <Placemark
            key={index}
            geometry={coord}
            options={{
              iconImageHref: "https://i.ibb.co/XZW28D7b/Price-for-zones.png",
              iconLayout: "default#image",
              iconImageSize: [37, 42],
              iconImageOffset: [-16, -16],
            }}
          />
        ))}
        {userCoords && <Placemark geometry={userCoords} />}
      </Ymap>
    </>
  );
};

export default YandexMap;
