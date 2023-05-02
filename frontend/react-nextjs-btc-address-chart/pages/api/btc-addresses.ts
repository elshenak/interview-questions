import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
  // Return formatted coinmetrics data here

  res.status(200).json([])
}
