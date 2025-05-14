import React, { useEffect, useState } from "react";
import { YMaps, Map as Ymap, Placemark } from "@pbe/react-yandex-maps";
import YandexMap from "./YandexMap/YandexMap";

const Map = ({ places }) => {
  return (
    <YMaps query={{ apikey: "bfd71e32-b563-4048-bec8-396f76ea40f8" }}>
      <YandexMap places={places} />
    </YMaps>
  );
};

export default Map;
