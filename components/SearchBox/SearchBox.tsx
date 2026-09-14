"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchBox } from "@/hooks/useSearchBox"
import css from "./SearchBox.module.css"

interface SearchBoxProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
    onClear?: () => void;
};

export default function SearchBox({ value, onChange, onSubmit, onClear }: SearchBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchBox = useSearchBox();
    const inputValue = value ?? searchBox.search;
    const handleChange = onChange ?? searchBox.handleChange;
    const handleClear = onClear ?? searchBox.clearSearch;

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        handleClear();
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        } else if (inputValue.trim()) {
            router.push(`/search?q=${(inputValue.trim())}`);
        };
    };

    return (
        <div className={css.container}>
            {!isOpen ? (
                <button
                    type="button"               
                    onClick={handleOpen}                  
                    className={css.toggleBtn}                   
                    aria-label="Відкрити пошук"                   
                >
                    <Search size={24} />
                </button>
            ) : (
                    <form onSubmit={handleSubmit} className={css.form}>
                        <Search size={24} className={css.searchIconInside} />
                        <input         
                            ref={inputRef}                         
                            className={css.input}                         
                            type="text"                        
                            placeholder="Пошук товарів..."                         
                            value={inputValue}
                            onChange={handleChange}
                        />     
                        <button
                            type="button"
                            onClick={handleClose}             
                            className={css.closeBtn}
                            aria-label="Закрити пошук"
                        >
                            <X size={24} />  
                        </button>  
                    </form>
            )}
        </div>
    );
};