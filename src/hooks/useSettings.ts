import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
    id?: string;
    // Store Info
    store_name: string;
    store_name_en: string;
    store_logo: string;
    store_description: string;
    store_slogan: string;
    store_address: string;
    store_phone: string;
    store_phone_alt: string;
    store_email: string;
    store_whatsapp: string;
    whatsapp_message: string;
    working_hours_from: string;
    working_hours_to: string;
    working_days: string;

    // Social Media
    facebook_url: string;
    instagram_url: string;
    tiktok_url: string;
    twitter_url: string;
    youtube_url: string;
    linkedin_url: string;
    snapchat_url: string;
    telegram_url: string;

    // Google & Analytics
    google_analytics_id: string;
    google_tag_manager_id: string;
    google_search_console: string;
    google_merchant_id: string;
    facebook_pixel_id: string;
    tiktok_pixel_id: string;
    snapchat_pixel_id: string;

    // Shipping
    delivery_fee_cairo: number;
    delivery_fee_giza: number;
    delivery_fee_alex: number;
    delivery_fee_other: number;
    free_shipping_threshold: number;
    delivery_message: string;

    // SEO
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    og_image: string;

    // Content
    homepage_hero_title: string;
    homepage_hero_subtitle: string;
    about_content: string;
    footer_text: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
    store_name: "دريم للتجارة",
    store_name_en: "Dream For Trade",
    store_logo: "/logo.png",
    store_description: "الوكيل المعتمد لأكبر الماركات العالمية للتكييفات",
    store_slogan: "راحتك... حلمنا",
    store_address: "القاهرة، مصر",
    store_phone: "01289006310",
    store_phone_alt: "",
    store_email: "info@dreamfortrade.com",
    store_whatsapp: "201289006310",
    whatsapp_message: "مرحباً، أريد الاستفسار عن منتجاتكم",
    working_hours_from: "09:00",
    working_hours_to: "21:00",
    working_days: "السبت - الخميس",

    facebook_url: "",
    instagram_url: "",
    tiktok_url: "",
    twitter_url: "",
    youtube_url: "",
    linkedin_url: "",
    snapchat_url: "",
    telegram_url: "",

    google_analytics_id: "",
    google_tag_manager_id: "",
    google_search_console: "",
    google_merchant_id: "",
    facebook_pixel_id: "",
    tiktok_pixel_id: "",
    snapchat_pixel_id: "",

    delivery_fee_cairo: 50,
    delivery_fee_giza: 50,
    delivery_fee_alex: 100,
    delivery_fee_other: 150,
    free_shipping_threshold: 10000,
    delivery_message: "التوصيل خلال 2-5 أيام عمل",

    seo_title: "دريم للتجارة - تكييفات بأفضل الأسعار",
    seo_description: "الوكيل المعتمد لأكبر الماركات العالمية للتكييفات في مصر. كاريير، ميديا، شارب، فريش وأكثر.",
    seo_keywords: "تكييف، تكييفات، كاريير، ميديا، شارب، فريش، مصر",
    og_image: "/og-image.jpg",

    homepage_hero_title: "تكييفات بأفضل الأسعار",
    homepage_hero_subtitle: "اكتشف مجموعتنا الواسعة من التكييفات العالمية",
    about_content: "",
    footer_text: "جميع الحقوق محفوظة © دريم للتجارة",
};

const SETTINGS_KEY = "site_settings";

// Get settings from localStorage
const getStoredSettings = (): SiteSettings => {
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
        return DEFAULT_SETTINGS;
    } catch {
        return DEFAULT_SETTINGS;
    }
};

// Save settings to localStorage
const saveSettings = (settings: SiteSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Fetch site settings
export const useSiteSettings = () => {
    return useQuery({
        queryKey: ["site-settings"],
        queryFn: async (): Promise<SiteSettings> => {
            // Use localStorage for now
            return getStoredSettings();
        },
    });
};

// Update site settings
export const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (settings: SiteSettings): Promise<SiteSettings> => {
            saveSettings(settings);
            return settings;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["site-settings"] });
        },
    });
};

// Export default settings for initial use
export { DEFAULT_SETTINGS };
