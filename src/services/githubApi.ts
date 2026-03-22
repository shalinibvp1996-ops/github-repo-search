import axios from "axios";
import type { GithubResponse } from "../types/github";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export const searchRepositories = async (
  query: string,
  page: number,
): Promise<GithubResponse> => {
  try {
    const response = await api.get<GithubResponse>("/search/repositories", {
      params: {
        q: query,
        page,
        per_page: 10,
      },
    });

    return response.data;
  } catch (error: unknown) {
    // Handle known API errors safely
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error(
          "GitHub API rate limit exceeded. Please try again later.",
        );
      }

      if (error.response?.status === 422) {
        throw new Error("Invalid search query.");
      }
    }

    throw new Error("Failed to fetch repositories.");
  }
};
