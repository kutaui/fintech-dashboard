import { useAuthStore } from "@/store/Auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export type ApiError = {
  error: string;
  status?: number;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = {
      error: data.error || "An unexpected error occurred",
      status: response.status,
    } as ApiError;

    // If we get a 401 Unauthorized error, we need to clear the user from the store
    if (error.status === 401) {
      // We can't use the hook directly here since this is not a React component
      // Instead, we'll access the store directly with getState/setState
      const { logout, setIsLoading } = useAuthStore.getState();
      logout();
      setIsLoading(false); // Ensure we're not stuck in loading state
    }

    throw error;
  }

  return data as T;
}
