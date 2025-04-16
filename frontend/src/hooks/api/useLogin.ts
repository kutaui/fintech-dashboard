import { User, useAuthStore } from "@/store/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiFetch } from "./config";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: User;
  success: boolean;
};

export default function useLogin() {
  const queryClient = useQueryClient();
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: async (
      credentials: LoginCredentials
    ): Promise<LoginResponse> => {
      return apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuthenticated(true);
      queryClient.setQueryData(["user"], data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`Welcome back, ${data.user.email}!`);
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });
}
