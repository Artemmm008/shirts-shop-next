import { X } from "lucide-react";
import { parseProductDescription } from "@/utils/parseDescription";
import css from "./SizeGuideModal.module.css";

interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    rawDescription?: string;
}

export default function SizeGuideModal({ isOpen, onClose, rawDescription }: SizeGuideModalProps) {
    if (!isOpen) return null;

    const { sizeGuide } = parseProductDescription(rawDescription);

    return (
        <>
            <div className={css.backdrop} onClick={onClose} />

            <div className={css.modal}>
                <div className={css.header}>
                    <h2>Гід по розмірах</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className={css.closeBtn}
                        aria-label="Закрити"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className={css.content}>
                    {sizeGuide ? (
                        <div className={css.guideText}>{sizeGuide}</div>
                    ) : (
                        <p className={css.empty}>Таблиця розмірів відсутня для цього товару.</p>
                    )}
                </div>
            </div>
        </>
    );
};