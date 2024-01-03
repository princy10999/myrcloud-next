// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  try {
    const response = await fetch(
      `http://127.0.0.1:5050/resumescore/get_score`,
      {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(req.body),
      }
    );
    if (!response.ok) {
      res.status(response.status);
    } else {
      res.status(200).json(await response.json());
    }
  } catch (error) {
    console.error("error", error);
  } finally {
  }
  res.end();
}
