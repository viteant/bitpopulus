export const routeTranslations = {
    "en": {
        "home": "/",
        "about": "/about",
        "services": "/services",
        "portfolio": "/portfolio",
        "blog": "/insights",
        "contact": "/contact"
    },
    "es": {
        "home": "/es",
        "about": "/es/acerca-de-nosotros",
        "services": "/es/servicios",
        "portfolio": "/es/portafolio",
        "blog": "/es/blog",
        "contact": "/es/contacto"
    }
};

export const navItemsEs = [
    { label: "Inicio", key: "home" },
    { label: "Acerca de", key: "about" },
    { label: "Servicios", key: "services" },
    { label: "Portafolio", key: "portfolio" },
    { label: "Blog", key: "blog" },
    { label: "Contacto", key: "contact" }
] as const;

export const navItemsEn = [
    { label: "Home", key: "home" },
    { label: "About", key: "about" },
    { label: "Services", key: "services" },
    { label: "Portfolio", key: "portfolio" },
    { label: "Blog", key: "blog" },
    { label: "Contact", key: "contact" }
] as const;

export function getLanguageFromURL(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'es') {
        return 'es';
    }
    return 'en';
}

export function getRouteKeyByOriginalPath(pathname: string, lang: "en" | "es"): keyof typeof routeTranslations.en | null {
    // Standardize pathname: remove trailing slash and ensure it starts with /
    let normalizedPath = pathname.replace(/\/$/, "");
    if (!normalizedPath.startsWith("/")) normalizedPath = "/" + normalizedPath;
    if (normalizedPath === "") normalizedPath = "/";
    
    // special case for /es/ vs /es
    if (normalizedPath === "/es") normalizedPath = "/es";
    
    const translationMap = routeTranslations[lang];
    // Find which key matches the path
    for (const [key, path] of Object.entries(translationMap)) {
        if (path === normalizedPath) {
            return key as keyof typeof routeTranslations.en;
        }
    }
    
    // Fallback for sub-paths (e.g. blog posts)
    for (const [key, path] of Object.entries(translationMap)) {
        if (path !== '/' && path !== '/es' && normalizedPath.startsWith(path)) {
            return key as keyof typeof routeTranslations.en;
        }
    }
    
    return null;
}
