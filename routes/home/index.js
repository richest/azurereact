require("dotenv").config();
const express = require("express");
const axios = require("axios");

const usaData = require("../../public/json/usa-cities.json");
const { getAttomData } = require("./helper");

const app = express.Router();

app.get("/", async (req, res, next) => {
  let attomData = null;
  let {
    search,
    page,
    pageSize,
    latitude,
    longitude,
    priceMin,
    priceMax,
    bedsMin,
    bedsMax,
    homeType,
    lotMin,
    lotMax,
    orderBy,
    sort,
  } = req.query;
  page = page || 1;
  pageSize = pageSize || 20;
  latitude = latitude || null;
  longitude = longitude || null;
  priceMin = priceMin || null;
  priceMax = priceMax || null;
  bedsMin = bedsMin || null;
  bedsMax = bedsMax || null;
  homeType = homeType || null;
  lotMin = lotMin || null;
  lotMax = lotMax || null;
  sort = sort || "asc";
  orderBy = orderBy ? `${orderBy} ${sort}` : null;

  const cities = usaData.usaCities;

  if (!search) {
    return res
      .status(404)
      .send({ msg: "Please Enter Postal Code, City or Address!" });
  }

  if (isNaN(search) && cities.includes(search.toLowerCase())) {
    let googleData = null;
    try {
      googleData = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?",
        {
          params: {
            address: search,
            key: process.env.GOOGLE_MAPS_API_KEY,
            language: "en",
            region: "US",
          },
        }
      );
    } catch (error) {
      console.log(error.response);
      return res.status(200).send({ property: [] });
    }

    const location = googleData.data.results[0].geometry.location;
    latitude = location.lat;
    longitude = location.lng;
  }

  try {
    attomData = await getAttomData(
      search,
      page,
      pageSize,
      latitude,
      longitude,
      priceMin,
      priceMax,
      bedsMin,
      bedsMax,
      homeType,
      lotMin,
      lotMax,
      orderBy
    );
  } catch (error) {
    console.log(error.response);
    return res.status(200).send({ property: [] });
  }

  return res.status(200).json({ ...attomData });
});

module.exports = app;
