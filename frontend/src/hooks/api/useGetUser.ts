import { User, useAuthStore } from "@/store/Auth";
import { useQuery } from "@tanstack/react-query";
import { ApiError, apiFetch } from "./config";
import { useEffect } from "react";

type UserResponse = {
  user: User;
  message: string;
};

export default function useGetUser() {
  const { setUser, setIsAuthenticated, setIsLoading } = useAuthStore();

  const result = useQuery<UserResponse, ApiError>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        setIsLoading(true);
        const response = await apiFetch<UserResponse>("/api/me");
        return response;
      } catch (error) {
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (error.status === 401) return false;
      if (
        error.error?.includes("fetch failed") ||
        error.error?.includes("Failed to fetch")
      )
        return false;
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  // Handle success, error, and settled cases manually
  const { data, error, status } = result;

  useEffect(() => {
    if (status === "success" && data) {
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (status === "error" && error) {
      // For 401 errors or connection errors, handle similar to unauthorized
      if (
        error.status === 401 ||
        error.error?.includes("fetch failed") ||
        error.error?.includes("Failed to fetch") ||
        error.error?.includes("Connection refused")
      ) {
        // Clear user data for both unauthorized and connection issues
        setUser(null);
        setIsAuthenticated(false);

        // Remove auth cookies explicitly from client side for connection issues
        if (typeof document !== "undefined") {
          document.cookie =
            "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      }
      setIsLoading(false);
    } else if (status === "pending") {
      // Keep loading state true
    } else {
      // For any other state, ensure loading is false
      setIsLoading(false);
    }
  }, [status, data, error, setUser, setIsAuthenticated, setIsLoading]);

  return result;
}
