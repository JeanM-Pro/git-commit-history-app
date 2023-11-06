import React, { useState } from "react";

export const GitCommitHistoryApp = () => {
  const [username, setUsername] = useState("");
  const [repository, setRepository] = useState("");
  const [commits, setCommits] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRepositoryChange = (e) => {
    setRepository(e.target.value);
  };

  console.log(commits);

  const fetchCommits = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/github/commits/${username}/${repository}`
      );

      if (response.ok) {
        const data = await response.json();
        setCommits(data);
      } else {
        throw new Error("No se pudo obtener el historial de commits.");
      }
    } catch (error) {
      console.error("Error al obtener el historial de commits:", error);
    }
  };

  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-center font-bold text-lg">Git Commits History</h1>
      <div className="flex flex-col items-center mt-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="GitHub Username"
            value={username}
            onChange={handleUsernameChange}
            className="w-[200px] px-1"
          />
          <input
            type="text"
            placeholder="Repository Name"
            value={repository}
            onChange={handleRepositoryChange}
            className="w-[200px] px-1"
          />
        </div>

        <button
          onClick={fetchCommits}
          className="bg-blue-300 hover:bg-blue-400 flex w-fit px-2 py-1 mt-2"
        >
          <span className="font-semibold">Obtener Commits</span>
        </button>
      </div>
      {commits?.map((commit) => (
        <div key={commit.sha}>
          <p>SHA: {commit.sha}</p>
          <p>Mensaje: {commit.commit.message}</p>
        </div>
      ))}
    </div>
  );
};
