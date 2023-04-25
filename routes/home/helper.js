require("dotenv").config();
const axios = require("axios");

const getAttomData = async (
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
) => {
  let attomData = null;
  const address = search && isNaN(search) ? search : null;
  const postalcode = search && isNaN(search) ? null : search;

  try {
    attomData = await axios.get(
      "https://api.gateway.attomdata.com/propertyapi/v1.0.0GET//sale/snapshot",
      {
        params: {
          page,
          pageSize,
          ...(!latitude && !longitude && postalcode && { postalcode }),
          ...(!latitude && !longitude && address && { address }),
          ...(latitude && { latitude }),
          ...(longitude && { longitude }),
          ...(priceMin && { minsaleamt: priceMin }),
          ...(priceMax && { maxsaleamt: priceMax }),
          ...(bedsMin && { minbeds: bedsMin }),
          ...(bedsMax && { maxbeds: bedsMax }),
          ...(homeType && { propertytype: homeType }),
          ...(lotMin && { minLotSize1: lotMin }),
          ...(lotMax && { maxLotSize1: lotMax }),
          ...(orderBy && { orderBy }),
        },
        headers: {
          apiKey: process.env.ATTOMS_API_KEY,
        },
      }
    );
  } catch (error) {
    if (
      error.response.status === 400 &&
      error.response.data?.status?.msg === "SuccessWithoutResult"
    ) {
      return error.response.data;
    }
    return res.status(200).send({ property: [] });
  }

  return attomData?.data;
};

module.exports = {
  getAttomData,
};
