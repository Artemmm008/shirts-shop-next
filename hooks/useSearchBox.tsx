"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useState, type ChangeEvent } from "react";
import { getAllProducts } from "@/services/products";

export function useSearchBox() {
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search.trim(), 400);

	const productsQuery = useQuery({
		queryKey: ["products", "search", debouncedSearch],
		queryFn: () => getAllProducts({ search: debouncedSearch }),
		enabled: Boolean(debouncedSearch),
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const clearSearch = () => {
		setSearch("");
	};

	return {
		search,
		handleChange,
		clearSearch,
		products: productsQuery.data?.products ?? [],
		isLoading: productsQuery.isLoading,
	};
}
