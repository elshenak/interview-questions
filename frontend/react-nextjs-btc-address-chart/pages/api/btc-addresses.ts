import { NextApiRequest, NextApiResponse } from "next";
import { formatAPIDataResponse, parseBTC } from "../../utils";

export default (_: NextApiRequest, res: NextApiResponse) => {
  // Return formatted coinmetrics data here
  return parseBTC(
    "../../../../data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv"
  )
    .then((data) => {
      return res.status(200).json(formatAPIDataResponse(data));
    })
    .catch(() => {
      return res.status(400).json({});
    });
};
