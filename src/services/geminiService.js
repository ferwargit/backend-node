import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generarDescripciónConGeminis(imageBuffer) {
  const prompt =
    "Genere una descripción en español para la siguiente imagen";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Texto alternativo no disponible.";
  } catch (erro) {
    console.error("Error al obtener texto alternativo:", erro.message, erro);
    throw new Error("Error al obtener el texto alternativo de Gemini.");
  }
}