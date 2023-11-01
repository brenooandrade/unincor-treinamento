import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Positions = () => {
  const [positions, setPositions] = useState([]);

  // useEffect(() => {
  //   // Faça chamadas de API para obter dados dos cargos
  //   api.get('').then((response) => {
  //     setPositions(response.data);
  //   });
  // }, []);

  return (
    <div>
      <h2>Positions</h2>
      {/* Exiba a lista de cargos aqui */}
    </div>
  );
};

export default Positions;
