import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

const PaginaBaseAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography component="h1" variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ marginY: 2, color: "white" }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ marginY: 2, color: "white" }}>
                  Novo Restaurante
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/">
                <Button sx={{ marginY: 2, color: "white" }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ marginY: 2, color: "white" }}>Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ marginTop: 1 }}>
          <Paper sx={{ padding: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PaginaBaseAdmin;
