import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    onInit();
  }, []);

  async function onInit() {
    try {
      const response = await api.get('/repositories');
      const repositories = response.data;
      console.log(repositories);

      setRepositories(repositories);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/lcaccavaro",
      title: "lcaccavaro",
      techs: ["Node", "Express", "TypeScript"]
    };

    try {
      const response = await api.post('/repositories', repository);
      console.log(response);
      const statusCode = response.status;
      
      if (statusCode === 200) {
        const repositoryCreated = response.data;
        setRepositories([...repositories, repositoryCreated]);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(1)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
