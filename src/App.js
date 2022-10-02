import "./App.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserDetails from "./components/UserDetails/UserDetails";
import UserRepositories from "./components/UserRepositories/UserRepositories";
import errorImage from "./images/error.gif";

const App = () => {
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const errorHandler = (e) => {
    console.error(`${e.name}: ${e.message}`);
    setError(`${e.name}: ${e.message}`);
  };

  return (
    <div className="p-8">
      {error ? (
        <div>
          <div className="text-4xl font-bold text-center">{error}</div>
          <img src={errorImage} alt="error" className="w-screen h-screen" />
        </div>
      ) : (
        <div>
          <UserDetails
            username={searchParams.get("user")}
            errorHandler={errorHandler}
          />
          <UserRepositories
            username={searchParams.get("user")}
            errorHandler={errorHandler}
          />
        </div>
      )}
    </div>
  );
};

export default App;
