import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';
import api from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Exemplo de consulta SQL para obter dados dos empregados com paginação
    const sql = `SELECT * FROM employees LIMIT ${rowsPerPage} OFFSET ${page * rowsPerPage}`;

    api.post('', {
      sql,
    }, {
      headers: {
        'x-api-key': 'kXmls3iiqcacc1Y1IGnO0405GHtxopFw96r5PKiv',
      },
    }).then((response) => {
      setEmployees(response.data.dados);
    });

  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Employees</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Contratação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.emp_no}>
                <TableCell>{employee.emp_no}</TableCell>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{new Date(employee.hire_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={1000}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Employees;
