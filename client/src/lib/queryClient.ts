import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import type { Player, Team } from "@shared/schema";

function loadPlayers(): Player[] {
  if (typeof localStorage === "undefined") return [];
  const data = localStorage.getItem("players");
  return data ? JSON.parse(data) : [];
}

function savePlayers(players: Player[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("players", JSON.stringify(players));
}

function loadTeams(): Team[] {
  if (typeof localStorage === "undefined") return [];
  const data = localStorage.getItem("teams");
  return data ? JSON.parse(data) : [];
}

function saveTeams(teams: Team[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("teams", JSON.stringify(teams));
}

export async function apiRequest(
  method: string,
  url: string,
  data?: Record<string, any>,
) {
  if (url.startsWith("/api/players")) {
    let players = loadPlayers();
    if (method === "POST" && data) {
      const newPlayer: Player = {
        id: nanoid(),
        entryOrder: Date.now(),
        rating: 0,
        ...data,
      } as Player;
      players.push(newPlayer);
      savePlayers(players);
      return newPlayer;
    }
    if (method === "PUT" && data) {
      const id = url.split("/").pop()!;
      players = players.map(p => (p.id === id ? { ...p, ...data } : p));
      savePlayers(players);
      return players.find(p => p.id === id);
    }
    if (method === "DELETE") {
      const id = url.split("/").pop()!;
      players = players.filter(p => p.id !== id);
      savePlayers(players);
      return {};
    }
  }

  if (url.startsWith("/api/teams")) {
    let teams = loadTeams();
    if (method === "PUT" && data) {
      const id = url.split("/").pop()!;
      teams = teams.map(t => (t.id === id ? { ...t, ...data } : t));
      saveTeams(teams);
      return teams.find(t => t.id === id);
    }
  }

  throw new Error(`Unknown API request: ${method} ${url}`);
}

export const getQueryFn: <T>() => QueryFunction<T> = () =>
  async ({ queryKey }) => {
    const key = queryKey[0] as string;
    if (key === "/api/players") {
      return loadPlayers() as any;
    }
    if (key === "/api/teams") {
      const teams = loadTeams();
      if (teams.length === 0) {
        const defaultTeam: Team = {
          id: nanoid(),
          name: "Lineup Manager",
          formation: "4-4-2",
        } as Team;
        saveTeams([defaultTeam]);
        return [defaultTeam] as any;
      }
      return teams as any;
    }
    return [] as any;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
