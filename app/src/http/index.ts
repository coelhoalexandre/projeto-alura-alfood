import axios from "axios";

export const urlV1 = "http://localhost:8000/api/v1/";
export const urlV2 = "http://localhost:8000/api/v2/";

export const http = axios.create({
  baseURL: urlV2,
});

export const caminhoRestaurantes = "restaurantes/";
export const caminhoPratos = "pratos/";
export const caminhoTags = "tags/";
