import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    // Exemplo de consulta SQL para obter a contagem de empregados
    const sql = "SELECT COUNT(*) as employeeCount FROM employees";

    api.post('', {
      sql,
    }).then((response) => {
      setDashboardData(response.data.dados[0]);
    });

  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total de Empregados: {dashboardData.employeeCount}</p>
    </div>
  );
};

export default Dashboard;
