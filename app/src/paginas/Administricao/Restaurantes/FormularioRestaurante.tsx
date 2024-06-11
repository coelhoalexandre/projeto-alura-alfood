import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { caminhoRestaurantes, http } from "../../../http";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`${caminhoRestaurantes}${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`${caminhoRestaurantes}${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => alert("Restaurante atualizado com sucesso!"));
    } else {
      http
        .post(caminhoRestaurantes, {
          nome: nomeRestaurante,
        })
        .then(() => alert("Restaurante cadastrado com sucesso!"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h2" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          id="standard-basic"
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
