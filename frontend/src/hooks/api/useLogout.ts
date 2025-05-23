import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./config";
import { useAuthStore } from "@/store/Auth";
import { toast } from "sonner";

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
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
}
