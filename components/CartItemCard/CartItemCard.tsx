"use client"

import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/product";
import Image from "next/image";
import css from "./CartItemCard.module.css";

interface CartItemCardProps {
    item: CartItem;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
};

export default function CartItemCard({ item, onIncrease, onDecrease, onRemove }: CartItemCardProps) {
    const { product, selectedSize, quantity } = item;

    return (
        <div className={css.item}>
            <div className={css.imageWrapper}>
                {product.imageUrl?.[0] ? (
                    <Image
                        src={product.imageUrl[0]}
                        alt={product.title}
                        width={72}
                        height={88}
                        className={css.itemImage}
                    />
                ) : (
                    <div className={css.imagePlaceholder} />
                )}
                <span className={css.quantityBadge}>{quantity}</span>
            </div>

            <div className={css.itemInfo}>
                <h4 className={css.itemTitle}>{product.title}</h4>
                <span className={css.itemSize}>Розмір: {selectedSize}</span>
                <span className={css.itemPrice}>{product.price} ₴</span>
                

                <div className={css.quantityControls}>
                    <button
                        type="button"
                        onClick={onDecrease}
                        className={css.qtyBtn}
                        aria-label="Зменшити кількість"
                    >               
                        <Minus size={14} />
                    </button>
                    <span className={css.quantityText}>{quantity}</span>
                    <button         
                        type="button"        
                        onClick={onIncrease}   
                        className={css.qtyBtn}             
                        aria-label="Збільшити кількість"           
                    >
                        <Plus size={14} />                        
                    </button>                   
                </div>              
            </div>
            

            <button
                type="button"
                onClick={onRemove}                
                className={css.removeBtn}               
                aria-label="Видалити"            
            >
                <Trash2 size={18} />
            </button>
        </div>
  );
}