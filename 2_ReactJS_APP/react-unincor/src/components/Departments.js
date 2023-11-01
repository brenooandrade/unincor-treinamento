import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  // useEffect(() => {
  //   // Faça chamadas de API para obter dados dos departamentos
  //   api.get('').then((response) => {
  //     setDepartments(response.data);
  //   });
  // }, []);

  return (
    <div>
      <h2>Departments</h2>
      {/* Exiba a lista de departamentos aqui */}
    </div>
  );
};

export default Departments;
