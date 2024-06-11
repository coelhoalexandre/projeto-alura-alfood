import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  caminhoPratos,
  caminhoRestaurantes,
  caminhoTags,
  http,
} from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricaoPrato, setDescricaoPrato] = useState("");

  const [restaurante, setRestaurante] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);

  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>(caminhoTags)
      .then((resposta) => setTags(resposta.data.tags));

    http
      .get<IRestaurante[]>(caminhoRestaurantes)
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricaoPrato);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: caminhoPratos,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNomePrato("");
        setDescricaoPrato("");
        setTag("");
        setRestaurante("");
        setImagem(null);
        alert("Prato cadastrado com sucesso");
      })
      .catch((erro) => console.log(erro));
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
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          id="standard-basic"
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
        />

        <TextField
          value={descricaoPrato}
          onChange={(evento) => setDescricaoPrato(evento.target.value)}
          id="standard-basic"
          label="Descrição do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={(evento) => selecionarArquivo(evento)} />

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

export default FormularioPrato;
