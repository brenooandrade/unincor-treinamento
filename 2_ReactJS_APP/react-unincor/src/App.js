import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import Positions from './components/Positions';
import Employees from './components/Employees';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Menu Lateral */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            zIndex: (theme) => theme.zIndex.drawer + 2, // Ajuste o valor de zIndex aqui
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/departments">
              <ListItemText primary="Departamentos" />
            </ListItem>
            <ListItem button component={Link} to="/positions">
              <ListItemText primary="Cargos" />
            </ListItem>
            <ListItem button component={Link} to="/employees">
              <ListItemText primary="Empregados" />
            </ListItem>
          </List>
        </Drawer>

        {/* Conteúdo Principal */}
        <Container>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Unincor Demo
              </Typography>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
