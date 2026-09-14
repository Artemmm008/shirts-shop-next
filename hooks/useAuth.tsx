"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { login, logout, register } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

interface UseAuthOptions {
  onSuccess?: () => void;
}

export function useAuth({ onSuccess }: UseAuthOptions = {}) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const authMutation = useMutation({
    mutationFn: () =>
      isLogin
        ? login({ email: formData.email, password: formData.password })
        : register(formData),
    onSuccess: (authenticatedUser) => {
      setUser(authenticatedUser);

      if (authenticatedUser?.role) {
        Cookies.set("role", authenticatedUser.role, { expires: 1, path: "/" });
      }

      setFormData({ name: "", email: "", password: "" });
      setErrorMessage("");
      onSuccess?.();
    },
    onError: (error) => {
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Помилка авторизації"
          : "Помилка авторизації"
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      Cookies.remove("role", { path: "/" });
      setErrorMessage("");
      onSuccess?.();
    },
    onError: () => setErrorMessage("Не вдалося вийти з акаунта"),
  });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authMutation.mutate();
    };

    const toggleMode = () => {
        setIsLogin((previous) => !previous);
        setErrorMessage("");
    };

    return {
        isLogin,
        formData,
        user,
        errorMessage,
        isLoading: authMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        handleChange,
        handleSubmit,
        toggleMode,
        logout: () => logoutMutation.mutate(),
    };
}
