// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from "fs";
import FormData from "form-data";
import fetch from "node-fetch";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fData = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,
      });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }
  );

  const imageFile = fData.files.file;
  const tempImagePath = imageFile?.filepath;

  try {
    const file = await fs.readFile(tempImagePath);

    const data = new FormData();
    data.append("file", file, { filename: imageFile.originalFilename });

    const response = await fetch(
      `https://mservices-dev.zinghr.com/aiml/resumescore/resume_ext`,
      {
        method: "POST",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`,
        },
        body: data,
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
    if (tempImagePath) {
      await fs.rm(tempImagePath);
    }
  }
  res.end();
}
