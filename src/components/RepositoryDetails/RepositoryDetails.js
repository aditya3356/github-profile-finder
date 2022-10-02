import { useEffect, useState } from "react";
import { octokit } from "../../constants";
import spinner from "../../images/spinner.gif";

const RepositoryDetails = ({ owner, repo, description, url }) => {
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const getRepositoryTags = async (owner, repo) => {
      const { data } = await octokit.rest.repos.listLanguages({
        owner,
        repo,
      });
      setLanguages(Object.keys(data));
      setLoading(false);
    };

    getRepositoryTags(owner, repo);
  }, [owner, repo]);

  return (
    <div className="flex flex-col justify-between box-border border-2 border-solid border-black p-3">
      <div className="mb-3">
        <a
          href={url}
          className="text-4xl hover:underline text-blue-500 font-bold"
          target="_blank"
          rel="noreferrer"
        >
          {repo}
        </a>
      </div>
      <div className="text-base mb-3">{description}</div>
      {loading ? (
        <img
          src={spinner}
          alt="spinner"
          className="w-12 h-12 flex justify-center items-center"
        />
      ) : (
        <div className="flex overflow-auto">
          {languages.map((language, idx) => (
            <div
              key={idx}
              className="text-xs text-white font-medium bg-blue-500 mr-3 rounded-md p-1 min-w-max"
            >
              {language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepositoryDetails;
