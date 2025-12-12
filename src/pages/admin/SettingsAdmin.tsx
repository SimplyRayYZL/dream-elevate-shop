import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
    Settings,
    Store,
    Share2,
    BarChart3,
    Image,
    FileText,
    Truck,
    Search,
    Database,
    Save,
    Loader2,
    ArrowRight,
    Phone,
    Mail,
    MapPin,
    Clock,
    Globe,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteSettings, useUpdateSettings, SiteSettings, DEFAULT_SETTINGS } from "@/hooks/useSettings";
import { toast } from "sonner";

const SettingsAdmin = () => {
    const { data: settings, isLoading } = useSiteSettings();
    const updateSettings = useUpdateSettings();
    const [formData, setFormData] = useState<SiteSettings>(DEFAULT_SETTINGS);

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    const handleChange = (field: keyof SiteSettings, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            await updateSettings.mutateAsync(formData);
            toast.success("تم حفظ الإعدادات بنجاح");
        } catch (error) {
            toast.error("حدث خطأ أثناء حفظ الإعدادات");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-secondary" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>إعدادات الموقع | لوحة التحكم</title>
            </Helmet>

            <div className="min-h-screen bg-muted/30">
                {/* Header */}
                <header className="bg-card border-b sticky top-0 z-40">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/admin/products"
                                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowRight className="h-5 w-5" />
                                    العودة
                                </Link>
                                <div className="h-6 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                    <Settings className="h-6 w-6 text-secondary" />
                                    <h1 className="text-xl font-bold">إعدادات الموقع</h1>
                                </div>
                            </div>
                            <Button
                                onClick={handleSave}
                                disabled={updateSettings.isPending}
                                className="gap-2"
                            >
                                {updateSettings.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                حفظ التغييرات
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="container mx-auto px-4 py-8">
                    <Tabs defaultValue="store" className="space-y-6">
                        <TabsList className="flex flex-wrap gap-2 h-auto bg-card p-2 rounded-xl">
                            <TabsTrigger value="store" className="gap-2">
                                <Store className="h-4 w-4" />
                                المتجر
                            </TabsTrigger>
                            <TabsTrigger value="social" className="gap-2">
                                <Share2 className="h-4 w-4" />
                                السوشيال
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="gap-2">
                                <BarChart3 className="h-4 w-4" />
                                التتبع
                            </TabsTrigger>
                            <TabsTrigger value="banners" className="gap-2">
                                <Image className="h-4 w-4" />
                                البانرات
                            </TabsTrigger>
                            <TabsTrigger value="content" className="gap-2">
                                <FileText className="h-4 w-4" />
                                المحتوى
                            </TabsTrigger>
                            <TabsTrigger value="shipping" className="gap-2">
                                <Truck className="h-4 w-4" />
                                الشحن
                            </TabsTrigger>
                            <TabsTrigger value="seo" className="gap-2">
                                <Search className="h-4 w-4" />
                                SEO
                            </TabsTrigger>
                            <TabsTrigger value="database" className="gap-2">
                                <Database className="h-4 w-4" />
                                الداتابيز
                            </TabsTrigger>
                        </TabsList>

                        {/* Store Info Tab */}
                        <TabsContent value="store" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">معلومات المتجر</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>اسم المتجر (عربي)</Label>
                                    <Input
                                        value={formData.store_name}
                                        onChange={(e) => handleChange("store_name", e.target.value)}
                                        placeholder="دريم للتجارة"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>اسم المتجر (إنجليزي)</Label>
                                    <Input
                                        value={formData.store_name_en}
                                        onChange={(e) => handleChange("store_name_en", e.target.value)}
                                        placeholder="Dream For Trade"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>وصف المتجر</Label>
                                    <Textarea
                                        value={formData.store_description}
                                        onChange={(e) => handleChange("store_description", e.target.value)}
                                        placeholder="وصف قصير عن المتجر..."
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>الشعار النصي (Slogan)</Label>
                                    <Input
                                        value={formData.store_slogan}
                                        onChange={(e) => handleChange("store_slogan", e.target.value)}
                                        placeholder="راحتك... حلمنا"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رابط اللوجو</Label>
                                    <Input
                                        value={formData.store_logo}
                                        onChange={(e) => handleChange("store_logo", e.target.value)}
                                        placeholder="/logo.png"
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold border-b pb-3 pt-4 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-secondary" />
                                بيانات التواصل
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>رقم الهاتف الأساسي</Label>
                                    <Input
                                        value={formData.store_phone}
                                        onChange={(e) => handleChange("store_phone", e.target.value)}
                                        placeholder="01289006310"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رقم الهاتف الاحتياطي</Label>
                                    <Input
                                        value={formData.store_phone_alt}
                                        onChange={(e) => handleChange("store_phone_alt", e.target.value)}
                                        placeholder="01xxxxxxxxx"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رقم الواتساب (بدون +)</Label>
                                    <Input
                                        value={formData.store_whatsapp}
                                        onChange={(e) => handleChange("store_whatsapp", e.target.value)}
                                        placeholder="201289006310"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رسالة الواتساب التلقائية</Label>
                                    <Input
                                        value={formData.whatsapp_message}
                                        onChange={(e) => handleChange("whatsapp_message", e.target.value)}
                                        placeholder="مرحباً، أريد الاستفسار..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>البريد الإلكتروني</Label>
                                    <Input
                                        type="email"
                                        value={formData.store_email}
                                        onChange={(e) => handleChange("store_email", e.target.value)}
                                        placeholder="info@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>العنوان</Label>
                                    <Input
                                        value={formData.store_address}
                                        onChange={(e) => handleChange("store_address", e.target.value)}
                                        placeholder="القاهرة، مصر"
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold border-b pb-3 pt-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-secondary" />
                                مواعيد العمل
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>من الساعة</Label>
                                    <Input
                                        type="time"
                                        value={formData.working_hours_from}
                                        onChange={(e) => handleChange("working_hours_from", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>إلى الساعة</Label>
                                    <Input
                                        type="time"
                                        value={formData.working_hours_to}
                                        onChange={(e) => handleChange("working_hours_to", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>أيام العمل</Label>
                                    <Input
                                        value={formData.working_days}
                                        onChange={(e) => handleChange("working_days", e.target.value)}
                                        placeholder="السبت - الخميس"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Social Media Tab */}
                        <TabsContent value="social" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">روابط السوشيال ميديا</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Facebook className="h-4 w-4 text-blue-600" />
                                        Facebook
                                    </Label>
                                    <Input
                                        value={formData.facebook_url}
                                        onChange={(e) => handleChange("facebook_url", e.target.value)}
                                        placeholder="https://facebook.com/yourpage"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Instagram className="h-4 w-4 text-pink-600" />
                                        Instagram
                                    </Label>
                                    <Input
                                        value={formData.instagram_url}
                                        onChange={(e) => handleChange("instagram_url", e.target.value)}
                                        placeholder="https://instagram.com/yourprofile"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                        </svg>
                                        TikTok
                                    </Label>
                                    <Input
                                        value={formData.tiktok_url}
                                        onChange={(e) => handleChange("tiktok_url", e.target.value)}
                                        placeholder="https://tiktok.com/@yourprofile"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Twitter className="h-4 w-4 text-sky-500" />
                                        Twitter / X
                                    </Label>
                                    <Input
                                        value={formData.twitter_url}
                                        onChange={(e) => handleChange("twitter_url", e.target.value)}
                                        placeholder="https://twitter.com/yourprofile"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Youtube className="h-4 w-4 text-red-600" />
                                        YouTube
                                    </Label>
                                    <Input
                                        value={formData.youtube_url}
                                        onChange={(e) => handleChange("youtube_url", e.target.value)}
                                        placeholder="https://youtube.com/@yourchannel"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </Label>
                                    <Input
                                        value={formData.linkedin_url}
                                        onChange={(e) => handleChange("linkedin_url", e.target.value)}
                                        placeholder="https://linkedin.com/company/yourcompany"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        Snapchat
                                    </Label>
                                    <Input
                                        value={formData.snapchat_url}
                                        onChange={(e) => handleChange("snapchat_url", e.target.value)}
                                        placeholder="https://snapchat.com/add/yourprofile"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <MessageCircle className="h-4 w-4 text-blue-500" />
                                        Telegram
                                    </Label>
                                    <Input
                                        value={formData.telegram_url}
                                        onChange={(e) => handleChange("telegram_url", e.target.value)}
                                        placeholder="https://t.me/yourchannel"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Analytics Tab */}
                        <TabsContent value="analytics" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">Google والتتبع والتحليلات</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-orange-500" />
                                        Google Analytics 4 (GA4)
                                    </Label>
                                    <Input
                                        value={formData.google_analytics_id}
                                        onChange={(e) => handleChange("google_analytics_id", e.target.value)}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                    <p className="text-xs text-muted-foreground">Measurement ID من Google Analytics</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-blue-500" />
                                        Google Tag Manager
                                    </Label>
                                    <Input
                                        value={formData.google_tag_manager_id}
                                        onChange={(e) => handleChange("google_tag_manager_id", e.target.value)}
                                        placeholder="GTM-XXXXXXX"
                                    />
                                    <p className="text-xs text-muted-foreground">Container ID من Tag Manager</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Search className="h-4 w-4 text-green-500" />
                                        Google Search Console
                                    </Label>
                                    <Input
                                        value={formData.google_search_console}
                                        onChange={(e) => handleChange("google_search_console", e.target.value)}
                                        placeholder="verification code"
                                    />
                                    <p className="text-xs text-muted-foreground">كود التحقق من ملكية الموقع</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Store className="h-4 w-4 text-blue-600" />
                                        Google Merchant Center
                                    </Label>
                                    <Input
                                        value={formData.google_merchant_id}
                                        onChange={(e) => handleChange("google_merchant_id", e.target.value)}
                                        placeholder="Merchant ID"
                                    />
                                    <p className="text-xs text-muted-foreground">لعرض المنتجات في Google Shopping</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold border-b pb-3 pt-4">Pixels للإعلانات</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Facebook className="h-4 w-4 text-blue-600" />
                                        Facebook Pixel
                                    </Label>
                                    <Input
                                        value={formData.facebook_pixel_id}
                                        onChange={(e) => handleChange("facebook_pixel_id", e.target.value)}
                                        placeholder="Pixel ID"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                        </svg>
                                        TikTok Pixel
                                    </Label>
                                    <Input
                                        value={formData.tiktok_pixel_id}
                                        onChange={(e) => handleChange("tiktok_pixel_id", e.target.value)}
                                        placeholder="Pixel ID"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Snapchat Pixel</Label>
                                    <Input
                                        value={formData.snapchat_pixel_id}
                                        onChange={(e) => handleChange("snapchat_pixel_id", e.target.value)}
                                        placeholder="Pixel ID"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Banners Tab */}
                        <TabsContent value="banners" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">إدارة البانرات</h2>

                            <div className="bg-muted/50 rounded-xl p-6 text-center">
                                <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="font-semibold mb-2">قريباً</h3>
                                <p className="text-muted-foreground text-sm">
                                    سيتم إضافة إمكانية تعديل البانرات قريباً
                                </p>
                            </div>
                        </TabsContent>

                        {/* Content Tab */}
                        <TabsContent value="content" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">محتوى الموقع</h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>عنوان الـ Hero الرئيسي</Label>
                                    <Input
                                        value={formData.homepage_hero_title}
                                        onChange={(e) => handleChange("homepage_hero_title", e.target.value)}
                                        placeholder="تكييفات بأفضل الأسعار"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>النص الفرعي للـ Hero</Label>
                                    <Textarea
                                        value={formData.homepage_hero_subtitle}
                                        onChange={(e) => handleChange("homepage_hero_subtitle", e.target.value)}
                                        placeholder="اكتشف مجموعتنا الواسعة..."
                                        rows={2}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>نص الـ Footer</Label>
                                    <Input
                                        value={formData.footer_text}
                                        onChange={(e) => handleChange("footer_text", e.target.value)}
                                        placeholder="جميع الحقوق محفوظة..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>محتوى صفحة "عن الشركة"</Label>
                                    <Textarea
                                        value={formData.about_content}
                                        onChange={(e) => handleChange("about_content", e.target.value)}
                                        placeholder="اكتب محتوى صفحة عن الشركة هنا..."
                                        rows={6}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Shipping Tab */}
                        <TabsContent value="shipping" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">إعدادات الشحن والتوصيل</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>رسوم التوصيل - القاهرة (ج.م)</Label>
                                    <Input
                                        type="number"
                                        value={formData.delivery_fee_cairo}
                                        onChange={(e) => handleChange("delivery_fee_cairo", Number(e.target.value))}
                                        placeholder="50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رسوم التوصيل - الجيزة (ج.م)</Label>
                                    <Input
                                        type="number"
                                        value={formData.delivery_fee_giza}
                                        onChange={(e) => handleChange("delivery_fee_giza", Number(e.target.value))}
                                        placeholder="50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رسوم التوصيل - الإسكندرية (ج.م)</Label>
                                    <Input
                                        type="number"
                                        value={formData.delivery_fee_alex}
                                        onChange={(e) => handleChange("delivery_fee_alex", Number(e.target.value))}
                                        placeholder="100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>رسوم التوصيل - باقي المحافظات (ج.م)</Label>
                                    <Input
                                        type="number"
                                        value={formData.delivery_fee_other}
                                        onChange={(e) => handleChange("delivery_fee_other", Number(e.target.value))}
                                        placeholder="150"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>حد الشحن المجاني (ج.م)</Label>
                                    <Input
                                        type="number"
                                        value={formData.free_shipping_threshold}
                                        onChange={(e) => handleChange("free_shipping_threshold", Number(e.target.value))}
                                        placeholder="10000"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        الطلبات فوق هذا المبلغ يكون الشحن مجاني
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>رسالة التوصيل</Label>
                                    <Input
                                        value={formData.delivery_message}
                                        onChange={(e) => handleChange("delivery_message", e.target.value)}
                                        placeholder="التوصيل خلال 2-5 أيام عمل"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* SEO Tab */}
                        <TabsContent value="seo" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4">إعدادات SEO</h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>عنوان الموقع (Title)</Label>
                                    <Input
                                        value={formData.seo_title}
                                        onChange={(e) => handleChange("seo_title", e.target.value)}
                                        placeholder="دريم للتجارة - تكييفات بأفضل الأسعار"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {formData.seo_title.length}/60 حرف (الأفضل أقل من 60)
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>وصف الموقع (Meta Description)</Label>
                                    <Textarea
                                        value={formData.seo_description}
                                        onChange={(e) => handleChange("seo_description", e.target.value)}
                                        placeholder="وصف قصير يظهر في نتائج البحث..."
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {formData.seo_description.length}/160 حرف (الأفضل أقل من 160)
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>الكلمات المفتاحية (Keywords)</Label>
                                    <Textarea
                                        value={formData.seo_keywords}
                                        onChange={(e) => handleChange("seo_keywords", e.target.value)}
                                        placeholder="تكييف، تكييفات، كاريير، ميديا، شارب..."
                                        rows={2}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        افصل بين الكلمات بفاصلة
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>صورة المشاركة (OG Image URL)</Label>
                                    <Input
                                        value={formData.og_image}
                                        onChange={(e) => handleChange("og_image", e.target.value)}
                                        placeholder="/og-image.jpg"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        الصورة التي تظهر عند مشاركة الموقع
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Database Tab */}
                        <TabsContent value="database" className="bg-card rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                                <Database className="h-6 w-6 text-secondary" />
                                إعدادات قاعدة البيانات
                            </h2>

                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                                    ⚠️ <strong>تحذير:</strong> تغيير هذه الإعدادات قد يؤثر على عمل الموقع. تأكد من صحة البيانات قبل الحفظ.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Supabase URL</Label>
                                    <Input
                                        placeholder="https://xxxxx.supabase.co"
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        رابط مشروع Supabase الخاص بك
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Supabase Anon Key</Label>
                                    <Input
                                        type="password"
                                        placeholder="eyJhbGciOiJIUzI1NiIsInR..."
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        المفتاح العام (Anon Key) للوصول للبيانات
                                    </p>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-6 mt-6">
                                <h3 className="font-semibold mb-2">لتغيير إعدادات الداتابيز:</h3>
                                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                                    <li>افتح ملف <code className="bg-muted px-1 rounded">src/integrations/supabase/client.ts</code></li>
                                    <li>غير قيم SUPABASE_URL و SUPABASE_ANON_KEY</li>
                                    <li>أعد تشغيل الموقع</li>
                                </ol>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </>
    );
};

export default SettingsAdmin;
