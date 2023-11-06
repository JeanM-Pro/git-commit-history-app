import React, { useEffect, useState } from "react";

export const GitCommitHistoryApp = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch("http://localhost:4000/github/commits"); // Debes ajustar la URL según tu configuración de rutas en NestJS
        if (response.ok) {
          const data = await response.json();
          setCommits(data);
        } else {
          throw new Error("No se pudo obtener el historial de commits.");
        }
      } catch (error) {
        console.error(
          "Error al obtener el historial de commits activo:",
          error
        );
      }
    };

    fetchCommits();
  }, []);

  return (
    <div className="App">
      <h1>Historial de Commits de GitHub</h1>
      {commits?.map((commit) => (
        <div key={commit.sha}>
          <p>SHA: {commit.sha}</p>
          <p>Mensaje: {commit.commit.message}</p>
        </div>
      ))}
    </div>
  );
};
