import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { Tabla } from "./components/Tabla";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const GitCommitHistoryApp = () => {
  const [username, setUsername] = useState("");
  const [repository, setRepository] = useState("");
  const [commits, setCommits] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRepositoryChange = (e) => {
    setRepository(e.target.value);
  };

  const fetchCommits = async () => {
    setIsSearching(true);

    if (username === "" || repository === "") {
      setIsSearching(false);
      return toast.error("You must fill in the empty fields");
    }
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repository}/commits`
      );

      if (response.ok) {
        const data = await response.json();
        setCommits(data);
        setIsSearching(false);
        toast.success("Uploaded commit history");
        console.log(data.private);
      } else {
        setIsSearching(false);
        toast.error(
          "Could not get commit history. Remember that you can only enter a public repository"
        );
        throw new Error("No se pudo obtener el historial de commits.");
      }
    } catch (error) {
      console.error("Error al obtener el historial de commits:", error);
    }
  };

  return (
    <div className="w-full pb-4">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full flex flex-col items-center px-3 md:px-8 ">
        <h1 className="text-center font-bold text-lg mt-4">
          Git Commits History
        </h1>
        <div className="flex flex-col items-center my-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="GitHub Username"
              value={username}
              onChange={handleUsernameChange}
              className="w-[200px] border border-black px-2 py-1"
            />
            <input
              type="text"
              placeholder="Repository Name"
              value={repository}
              onChange={handleRepositoryChange}
              className="w-[200px] border border-black px-2 py-1"
            />
          </div>

          <button
            onClick={fetchCommits}
            className="bg-blue-300 hover:bg-blue-400 flex justify-center w-fit px-2 py-1 mt-2"
            disabled={isSearching}
          >
            {isSearching ? (
              <MoonLoader size={20} color="#000000" />
            ) : (
              <span className="font-semibold">Get Commits</span>
            )}
          </button>
        </div>
      </div>

      <div className="md:w-full overflow-x-auto py-2 flex md:justify-center px-3 md:px-8">
        <Tabla datos={commits} />
      </div>
    </div>
  );
};
