export interface ParseDescription {
    description: string;
    sizeGuide: string | null;
}

export function parseProductDescription(rawDescription: string = ""): ParseDescription {
    const SEPARATOR = "--SIZE_GUIDE--";

    if (!rawDescription.includes(SEPARATOR)) {
        return {
            description: rawDescription.trim(),
            sizeGuide: null,
        };
    }

    const [description, sizeGuide] = rawDescription.split(SEPARATOR);

    return {
        description: description.trim(),
        sizeGuide: sizeGuide ? sizeGuide.trim() : null,
    };
};