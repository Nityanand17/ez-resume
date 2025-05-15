import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Contributor {
  name: string;
  url: string;
  avatar: string;
}

export const fetchGithubContributors = async (): Promise<Contributor[]> => {
  const response = await axios.get<{ login: string; avatar_url: string; html_url: string }[]>(
    "https://api.github.com/repos/AmruthPillai/Reactive-Resume/contributors?per_page=100"
  );

  return response.data.map((contributor) => ({
    name: contributor.login,
    avatar: contributor.avatar_url,
    url: contributor.html_url,
  }));
};

export const useContributors = () => {
  const { data: github, isLoading: loading } = useQuery({
    queryKey: ["github-contributors"],
    queryFn: fetchGithubContributors,
  });

  return { github, loading };
}; 