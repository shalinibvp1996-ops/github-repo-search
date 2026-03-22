import { useState } from "react";
import { searchRepositories } from "../services/githubApi";
import type { Repository } from "../types/github";
import { FaStar, FaCodeBranch, FaCircle } from "react-icons/fa";

const Home = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (pageNumber: number = 1) => {
    const trimmedQuery = query.trim();

    // validation
    if (trimmedQuery.length < 3) {
      setError("Please enter at least 3 characters.");
      return;
    }

    const isValidQuery = /[a-zA-Z0-9]/.test(trimmedQuery);
    if (!isValidQuery) {
      setError("Please enter a valid search term.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const data = await searchRepositories(trimmedQuery, pageNumber);

      setRepos(data.items);
      setTotalCount(data.total_count);
      setPage(pageNumber);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / 10);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const range = 2;

    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <h1>GitHub Explorer</h1>
        <p className="subtitle">Search and explore repositories</p>
      </div>

      {/* SEARCH */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(1);
        }}
        className="searchContainer"
      >
        <div className="inputWrapper">
          <input
            className="searchInput"
            type="text"
            value={query}
            placeholder="Search repositories..."
            onChange={(e) => {
              setQuery(e.target.value);
              setError("");
            }}
          />

          {query && (
            <button
              type="button"
              className="clearButton"
              onClick={() => {
                setQuery("");
                setRepos([]);
                setTotalCount(0);
                setHasSearched(false);
              }}
            >
              ×
            </button>
          )}
        </div>

        <button
          type="submit"
          className="searchButton"
          disabled={query.trim().length < 3}
        >
          Search
        </button>
      </form>

      {/* ERROR */}
      {error && <div className="errorState">{error}</div>}

      {/* LOADING */}
      {loading && (
        <div className="repoGrid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeletonCard"></div>
          ))}
        </div>
      )}

      {/* RESULTS */}
      {!loading && repos.length > 0 && (
        <>
          <div className="resultCount">
            Showing {repos.length} of {totalCount} repositories for "{query}"
          </div>

          <div className="repoGrid">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="repoCard"
                onClick={() => window.open(repo.html_url, "_blank")}
              >
                <div className="repoTitle">{repo.full_name}</div>

                <div className="repoDescription">
                  {repo.description || "No description available"}
                </div>

                <div className="repoMeta">
                  <span className="metaItem">
                    <FaStar /> {repo.stargazers_count}
                  </span>

                  <span className="metaItem">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>

                  {repo.language && (
                    <span className="metaItem">
                      <FaCircle /> {repo.language}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            {getPageNumbers().map((p, index) =>
              p === "..." ? (
                <span key={index}>...</span>
              ) : (
                <button
                  key={p}
                  className={`pageButton ${page === p ? "activePage" : ""}`}
                  onClick={() => handleSearch(p as number)}
                >
                  {p}
                </button>
              ),
            )}
          </div>
        </>
      )}

      {/* EMPTY STATE */}
      {!loading && hasSearched && repos.length === 0 && !error && (
        <div className="emptyState">
          <h2>🔍 No results found</h2>
          <p>Try a different keyword or check spelling</p>
        </div>
      )}
    </div>
  );
};

export default Home;
