import { Item, ItemCategory } from "@/types/item";

const BASE_URL = "https://lost-and-found-ps91.onrender.com";

// Helper to map API category to frontend category
const mapCategoryToFrontend = (apiCategory: string): ItemCategory => {
    switch (apiCategory) {
        case "ID_CARD": return "id-card";
        case "BAG": return "bag";
        case "ELECTRONICS": return "electronics";
        case "STATIONARY": return "stationery"; // Note spelling difference if any
        case "OTHERS": return "other";
        default: return "other";
    }
};

// Helper to map frontend category to API category
export const mapCategoryToApi = (frontendCategory: ItemCategory): string => {
    switch (frontendCategory) {
        case "id-card": return "ID_CARD";
        case "bag": return "BAG";
        case "electronics": return "ELECTRONICS";
        case "stationery": return "STATIONARY";
        case "other": return "OTHERS";
        case "books": return "OTHERS"; // API doesn't have BOOKS, mapping to OTHERS
        default: return "OTHERS";
    }
};

export const postLostItem = async (formData: FormData) => {
    const response = await fetch(`${BASE_URL}/postLostItem`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Failed to post lost item");
    }
    return response.json();
};

export const postFoundItem = async (formData: FormData) => {
    const response = await fetch(`${BASE_URL}/postFoundItem`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Failed to post found item");
    }
    return response.json();
};

export const getLostItems = async (): Promise<Item[]> => {
    // Assuming endpoint exists based on pattern, though not in contract for public
    // If this fails, we might need to use getLostItemsToApprove or similar if that's the intention
    // But usually there is a public getter. 
    // Wait, the user said "getLostItems and getFoundItems are for the normal user" in the prompt.
    const response = await fetch(`${BASE_URL}/getLostItems`);
    if (!response.ok) {
        throw new Error("Failed to fetch lost items");
    }
    const data = await response.json();
    // Transform API data to frontend Item type
    return data.data.map((item: any) => ({
        id: item.id.toString(),
        status: "lost",
        name: item.itemName,
        category: mapCategoryToFrontend(item.category),
        description: item.description,
        location: item.location,
        date: item.date,
        posterName: item.personName,
        section: "N/A", // API doesn't seem to return section?
        email: item.reporterEmail,
        imageUrl: item.imageUrl, // Assuming API returns imageUrl
        createdAt: new Date().toISOString(), // API doesn't return createdAt?
        approved: true,
    }));
};

export const getFoundItems = async (): Promise<Item[]> => {
    const response = await fetch(`${BASE_URL}/getFoundItems`);
    if (!response.ok) {
        throw new Error("Failed to fetch found items");
    }
    const data = await response.json();
    return data.data.map((item: any) => ({
        id: item.id.toString(),
        status: "found",
        name: item.itemName,
        category: mapCategoryToFrontend(item.category),
        description: item.description,
        location: item.location,
        date: item.date,
        posterName: item.personName,
        section: "N/A",
        email: item.reporterEmail,
        imageUrl: item.imageUrl,
        createdAt: new Date().toISOString(),
        approved: true,
    }));
};
