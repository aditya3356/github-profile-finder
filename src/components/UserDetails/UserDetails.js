import { useEffect, useState } from "react";
import spinner from "../../images/spinner.gif";
import { octokit } from "../../constants";
import { Location, Link } from "../../Icons";

const UserDetails = ({ username, errorHandler }) => {
  const [loading, setLoading] = useState(true);
  const [avatarURL, setAvatarURL] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);
  const [twitterUsername, setTwitterUsername] = useState(null);
  const [githubProfileURL, setGithubProfileURL] = useState("");

  useEffect(() => {
    const getUserInfo = async (username) => {
      try {
        const {
          data: { avatar_url, name, bio, location, twitter_username, html_url },
        } = await octokit.rest.users.getByUsername({
          username,
        });
        setAvatarURL(avatar_url);
        setName(name);
        setBio(bio);
        setLocation(location);
        setTwitterUsername(twitter_username);
        setGithubProfileURL(html_url);
      } catch (e) {
        errorHandler(e);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo(username);
  });

  return (
    <div className="mb-10">
      {loading ? (
        <img
          src={spinner}
          alt="spinner"
          className="flex justify-center items-center"
        />
      ) : (
        <div>
          <div className="flex mb-5">
            <img
              src={avatarURL}
              alt="avatar"
              className="w-64 h-64 rounded-full"
            />
            <div className="ml-10 mt-5">
              <div className="text-4xl font-bold mb-3">{name}</div>
              {bio ? <div className="text-base mb-3">{bio}</div> : null}
              {location ? (
                <div className="flex text-base mb-3">
                  <Location />
                  {location}
                </div>
              ) : null}
              {twitterUsername ? (
                <div className="text-base mb-3">
                  {`Twitter: `}
                  <a
                    href={`https://twitter.com/${twitterUsername}`}
                    className="hover:underline hover:text-blue-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`https://twitter.com/${twitterUsername}`}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex text-base">
            <Link />
            <a
              href={githubProfileURL}
              className="hover:underline hover:text-blue-700"
              target="_blank"
              rel="noreferrer"
            >
              {githubProfileURL}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
