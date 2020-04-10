import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepositories(response.data);
    })

  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: "https://github.com/rfontess/desafio-conceito-reactjs.git",
      techs: [
        "NodeJS",
        "ReactJS"
      ]
    });

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete('/repositories/' + id).then(response => {

      const newRepository = repositories.filter(repository => repository.id !== id);

      setRepositories(newRepository);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (<li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
