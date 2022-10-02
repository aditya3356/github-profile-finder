import { useEffect, useState } from "react";
import { octokit } from "../../constants";
import Pagination from "../Pagination/Pagination";
import RepositoryDetails from "../RepositoryDetails/RepositoryDetails";
import spinner from "../../images/spinner.gif";

const UserRepositories = ({ username, errorHandler }) => {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getAllRepositories = async (username) => {
      try {
        const { data, headers } = await octokit.rest.repos.listForUser({
          username,
          page,
          per_page: 10,
        });
        setRepositories(
          data.map(({ name, description, html_url }) => ({
            name,
            description,
            url: html_url,
          }))
        );
        if (totalPages === 0) {
          setTotalPages(headers.link.match(/\d+/g).at(-2));
        }
      } catch (e) {
        errorHandler(e);
      } finally {
        setLoading(false);
      }
    };

    getAllRepositories(username);
  }, [page, errorHandler, totalPages, username]);

  const pageChangeHandler = (page) => {
    setPage(page);
    setLoading(true);
  };

  return (
    <div>
      {loading ? (
        <img
          src={spinner}
          alt="spinner"
          className="flex justify-center items-center"
        />
      ) : (
        <div className="grid grid-cols-2 auto-rows-auto gap-x-[57px] gap-y-10">
          {repositories.map((repository, idx) => (
            <RepositoryDetails
              key={idx}
              owner={username}
              repo={repository.name}
              description={repository.description}
              url={repository.url}
            />
          ))}
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        page={page}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default UserRepositories;
