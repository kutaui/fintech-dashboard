import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./config";
import { useAuthStore } from "@/store/Auth";

type LogoutResponse = {
  success: boolean;
  message: string;
};

export default function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async (): Promise<LogoutResponse> => {
      return apiFetch<LogoutResponse>("/auth/logout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      logout();
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
