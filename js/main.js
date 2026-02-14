// Admin Panel JavaScript

const PASSWORD = 'sweet2024';
let branches = [];
let socialMedia = [];
let currentAdminLang = 'en';
let currentContentLang = 'en';
let currentIconPickerTarget = null;
let currentLanguage = 'en'; // Current website language

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active state of theme buttons
    const lightBtn = document.getElementById('lightBtn');
    const darkBtn = document.getElementById('darkBtn');
    
    if (lightBtn && darkBtn) {
        lightBtn.classList.toggle('active', theme === 'light');
        darkBtn.classList.toggle('active', theme === 'dark');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Language Management
const translations = {
    en: {
        siteName: "Sweet Pharma",
        nav: {
            branches: "Branches",
            services: "Services",
            contact: "Contact"
        },
        hero: {
            title: "Your Health is Our Priority",
            description: "Providing world-class pharmaceutical and medical laboratory services with a team you can trust in Erbil",
            cta1: "Our Locations",
            cta2: "Contact Us"
        },
        branches: {
            title: "Our Service Locations",
            description: "Visit us at any of our branches in Erbil",
            noBranches: "No Branches Available"
        },
        service: {
            title: "Home Testing Service",
            description: "Professional medical testing in the comfort of your home",
            feature1: "Quick and accurate test results",
            feature2: "Professional and experienced medical team",
            feature3: "Safe and reliable service you can trust",
            feature4: "Scheduled appointment at your convenience",
            callUs: "Call us:"
        },
        contact: {
            title: "Get in Touch",
            description: "We're here to answer your questions and provide the care you need",
            phone: "Phone",
            email: "Email",
            location: "Location"
        },
        footer: {
            tagline: "Providing world-class healthcare services",
            rights: "All Rights Reserved",
            language: "Language:"
        }
    },
    ku: {
        siteName: "سویت فارما",
        nav: {
            branches: "لقەکان",
            services: "خزمەتگوزارییەکان",
            contact: "پەیوەندی"
        },
        hero: {
            title: "تەندروستیت گرنگە بۆ ئێمە",
            description: "خزمەتگوزاری دەرمانخانە و تاقیگەی پزشکی بە باشترین کوالێتی لە هەولێر",
            cta1: "شوێنەکانمان",
            cta2: "پەیوەندیمان پێوە بکە"
        },
        branches: {
            title: "شوێنی خزمەتگوزارییەکانمان",
            description: "سەردانی هەر کام لە لقەکانمان بکە لە هەولێر",
            noBranches: "هیچ لقێک نییە"
        },
        service: {
            title: "خزمەتی پشکنینی ماڵەوە",
            description: "پشکنینی پزشکی پیشەیی لە ماڵەوە",
            feature1: "ئەنجامی خێرا و ورد",
            feature2: "تیمی پزشکی پسپۆڕ و شارەزا",
            feature3: "خزمەتێکی سەلامەت و متمانەپێکراو",
            feature4: "کاتی گونجاو بە دڵخوازی خۆت",
            callUs: "پەیوەندیمان پێوە بکە:"
        },
        contact: {
            title: "پەیوەندیمان پێوە بکە",
            description: "ئێمە ئامادەین وەڵامی پرسیارەکانت بدەینەوە",
            phone: "تەلەفۆن",
            email: "ئیمەیڵ",
            location: "شوێن"
        },
        footer: {
            tagline: "پێشکەشکردنی خزمەتگوزاری تەندروستی بە باشترین کوالێتی",
            rights: "هەموو مافێک پارێزراوە",
            language: "زمان:"
        }
    },
    ar: {
        siteName: "سويت فارما",
        nav: {
            branches: "الفروع",
            services: "الخدمات",
            contact: "اتصل بنا"
        },
        hero: {
            title: "صحتك أولويتنا",
            description: "نقدم خدمات صيدلانية ومختبرات طبية عالمية المستوى مع فريق يمكنك الوثوق به في أربيل",
            cta1: "مواقعنا",
            cta2: "اتصل بنا"
        },
        branches: {
            title: "مواقع خدماتنا",
            description: "قم بزيارتنا في أي من فروعنا في أربيل",
            noBranches: "لا توجد فروع"
        },
        service: {
            title: "خدمة الفحص المنزلي",
            description: "فحص طبي محترف في راحة منزلك",
            feature1: "نتائج اختبار سريعة ودقيقة",
            feature2: "فريق طبي محترف وذو خبرة",
            feature3: "خدمة آمنة وموثوقة",
            feature4: "موعد محدد حسب راحتك",
            callUs: "اتصل بنا:"
        },
        contact: {
            title: "تواصل معنا",
            description: "نحن هنا للإجابة على أسئلتك وتقديم الرعاية التي تحتاجها",
            phone: "الهاتف",
            email: "البريد الإلكتروني",
            location: "الموقع"
        },
        footer: {
            tagline: "تقديم خدمات رعاية صحية عالمية المستوى",
            rights: "جميع الحقوق محفوظة",
            language: "اللغة:"
        }
    }
};

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Update text direction for Arabic and Kurdish
    if (lang === 'ar' || lang === 'ku') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Update all translatable elements
    updateTranslations();
}

function updateTranslations() {
    const lang = currentLanguage;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[lang], key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Load saved language on page load
function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    changeLanguage(savedLang);
}

// Initialize theme and language when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        loadTheme();
        loadLanguage();
    });
}

// Available social media icons
const availableIcons = {
    'facebook': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'instagram': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    'twitter': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
    'youtube': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    'tiktok': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
    'snapchat': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3 0 .605-.153.967-.248.18-.045.385-.09.618-.09.48 0 1.02.228 1.334.659.27.369.329.8.164 1.186-.12.282-.525.525-.992.661-.285.09-.601.135-.856.135-.12 0-.24-.015-.36-.045-.495-.105-1.035-.135-1.485-.03a5.201 5.201 0 0 0-.838.285c-.27.12-.556.24-.856.345.735.675 1.545 1.065 2.415 1.515.36.195.735.39 1.125.615.12.075.24.15.345.24.33.285.48.705.405 1.14-.045.435-.315.825-.705 1.065-1.29.765-2.22 1.095-2.835 1.095-.54 0-.885-.24-1.2-.48-.195-.15-.39-.285-.615-.39-.12-.06-.24-.105-.375-.135.015.405-.015.885-.195 1.38-.495 1.335-1.485 2.205-2.88 2.52-.375.09-.765.135-1.155.135-.375 0-.765-.045-1.125-.135-1.41-.315-2.385-1.185-2.88-2.52-.18-.495-.21-.975-.195-1.38-.12.03-.255.075-.375.135-.225.105-.42.24-.615.39-.315.24-.66.48-1.2.48-.615 0-1.545-.33-2.835-1.095-.39-.24-.66-.63-.705-1.065-.075-.435.075-.855.405-1.14.105-.09.225-.165.345-.24.39-.225.765-.42 1.125-.615.87-.45 1.68-.84 2.415-1.515-.3-.105-.585-.225-.856-.345a5.201 5.201 0 0 0-.838-.285c-.45-.105-.99-.075-1.485.03-.12.03-.24.045-.36.045-.255 0-.571-.045-.856-.135-.467-.136-.872-.379-.992-.661-.165-.386-.106-.817.164-1.186.314-.431.854-.659 1.334-.659.233 0 .438.045.618.09.362.095.667.248.967.248.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.634.299-4.847 1.583-3.545 4.94-3.821 5.93-3.821z"/></svg>',
    'linkedin': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'whatsapp': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    'telegram': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    'pinterest': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>',
    'reddit': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>'
};

// Admin translations (keeping existing translations)
const adminTranslations = {
    en: {
        admin: {
            title: "Sweet Pharma - Admin Panel",
            preview: "👁️ Preview Website",
            logout: "Logout",
            successMsg: "Changes saved successfully! ✓",
            welcome: "👋 Welcome to Admin Panel",
            welcomeText: "Manage all aspects of your website from here. Remember to click \"Save Changes\" after making any modifications.",
            saveChanges: "💾 Save All Changes"
        },
        tabs: {
            content: "Website Content",
            branches: "Branches",
            service: "Home Service",
            social: "Social Media"
        },
        content: {
            title: "📝 Website Content Management",
            selectLang: "Select Language to Edit:"
        },
        branches: {
            title: "🏥 Branch Management",
            description: "Add and manage all your service locations. Click on a branch to expand and edit.",
            addNew: "➕ Add New Branch",
            noBranches: "No Branches Yet",
            noBranchesText: "Click \"Add New Branch\" to create your first service location"
        },
        service: {
            title: "🏠 Home Testing Service",
            phone: "Service Phone Number"
        },
        social: {
            title: "📱 Social Media Management"
        }
    },
    ku: {
        admin: {
            title: "پانێڵی ئەدمین - سویت فارما",
            preview: "👁️ پێشبینین",
            logout: "چوونە دەرەوە",
            successMsg: "گۆڕانکارییەکان بە سەرکەوتوویی پاشەکەوت کرا! ✓",
            welcome: "👋 بەخێربێیت بۆ پانێڵی ئەدمین",
            welcomeText: "لێرەوە دەتوانیت هەموو بەشەکانی ماڵپەڕەکە بەڕێوە ببەیت.",
            saveChanges: "💾 پاشەکەوتکردن"
        },
        tabs: {
            content: "ناوەڕۆکی ماڵپەڕ",
            branches: "لقەکان",
            service: "خزمەتی ماڵەوە",
            social: "سۆشیال میدیا"
        },
        content: {
            title: "📝 بەڕێوەبردنی ناوەڕۆک",
            selectLang: "زمان هەڵبژێرە بۆ دەستکاری:"
        },
        branches: {
            title: "🏥 بەڕێوەبردنی لقەکان",
            description: "لقەکانت زیاد بکە و بەڕێوەیان ببە. کرتە لەسەر لقێک بکە بۆ دەستکاری.",
            addNew: "➕ زیادکردنی لقی نوێ",
            noBranches: "هێشتا لقێک نییە",
            noBranchesText: "کرتە لەسەر \"زیادکردنی لقی نوێ\" بکە"
        },
        service: {
            title: "🏠 خزمەتی ماڵەوە",
            phone: "ژمارەی تەلەفۆن"
        },
        social: {
            title: "📱 سۆشیال میدیا"
        }
    },
    ar: {
        admin: {
            title: "لوحة الإدارة - سويت فارما",
            preview: "👁️ معاينة",
            logout: "تسجيل الخروج",
            successMsg: "تم الحفظ بنجاح! ✓",
            welcome: "👋 مرحباً",
            welcomeText: "أدر موقعك من هنا.",
            saveChanges: "💾 حفظ التغييرات"
        },
        tabs: {
            content: "محتوى الموقع",
            branches: "الفروع",
            service: "الخدمة المنزلية",
            social: "وسائل التواصل"
        },
        content: {
            title: "📝 إدارة المحتوى",
            selectLang: "اختر اللغة للتعديل:"
        },
        branches: {
            title: "🏥 إدارة الفروع",
            description: "أضف وأدر فروعك. انقر على فرع للتعديل.",
            addNew: "➕ إضافة فرع",
            noBranches: "لا توجد فروع",
            noBranchesText: "انقر على \"إضافة فرع\""
        },
        service: {
            title: "🏠 الخدمة المنزلية",
            phone: "رقم الهاتف"
        },
        social: {
            title: "📱 وسائل التواصل"
        }
    }
};

// Change admin language
function changeAdminLanguage(lang) {
    currentAdminLang = lang;
    localStorage.setItem('adminLanguage', lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'ku') ? 'rtl' : 'ltr';
    
    document.querySelectorAll('.admin-lang-switcher .lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    updateAdminTranslations();
    
    if (branches.length > 0) {
        renderBranches();
    }
}

// Update admin translations
function updateAdminTranslations() {
    const t = adminTranslations[currentAdminLang];
    
    document.querySelectorAll('[data-admin-i18n]').forEach(element => {
        const key = element.getAttribute('data-admin-i18n');
        const keys = key.split('.');
        let value = t;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// Switch content language
function switchContentLang(lang) {
    currentContentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn-large').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide content sections
    document.querySelectorAll('.content-lang-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`content-${lang}`).classList.add('active');
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('passwordInput').value;
    
    if (password === PASSWORD) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        
        const savedLang = localStorage.getItem('adminLanguage') || 'en';
        changeAdminLanguage(savedLang);
        
        loadData();
    } else {
        document.getElementById('loginError').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loginError').style.display = 'none';
        }, 3000);
    }
});

// Logout functionality
function logout() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Add new branch
function addNewBranch() {
    const branch = {
        id: Date.now(),
        name: '',
        badge: '',
        address: '',
        phone: '',
        phone2: '',
        email: '',
        specialty: '',
        icon: '🏥',
        color: 'gradient-cream',
        imageType: 'emoji',
        imageUrl: '',
        lat: '',
        lng: '',
        operations: '',
        expanded: true
    };
    
    branches.push(branch);
    renderBranches();
}

// Toggle branch accordion
function toggleBranch(id) {
    const branch = branches.find(b => b.id === id);
    if (branch) {
        branch.expanded = !branch.expanded;
        renderBranches();
    }
}

// Save branch and collapse
function saveBranch(id) {
    const branch = branches.find(b => b.id === id);
    if (branch) {
        branch.expanded = false;
        renderBranches();
        
        // Show save feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Saved!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }
}

// Delete branch (FIXED)
function deleteBranch(id) {
    if (!confirm('Are you sure you want to delete this branch? This cannot be undone!')) {
        return;
    }
    
    // Find index and remove
    const index = branches.findIndex(b => b.id === id);
    if (index > -1) {
        branches.splice(index, 1);
        renderBranches();
    }
}

// Render all branches
function renderBranches() {
    const container = document.getElementById('branchesContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (branches.length === 0) {
        emptyState.style.display = 'block';
        updateAdminTranslations();
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Clear container except empty state
    Array.from(container.children).forEach(child => {
        if (child.id !== 'emptyState') {
            child.remove();
        }
    });
    
    branches.forEach((branch, index) => {
        const branchElement = createBranchAccordion(branch, index);
        container.appendChild(branchElement);
    });
}

// Create branch accordion
function createBranchAccordion(branch, index) {
    const div = document.createElement('div');
    div.className = 'branch-accordion-item';
    if (branch.expanded) {
        div.classList.add('expanded');
    }
    
    const branchIcon = branch.imageType === 'emoji' ? branch.icon || '🏥' : '🏥';
    const branchName = branch.name || `Branch ${index + 1}`;
    
    div.innerHTML = `
        <div class="branch-accordion-header" onclick="toggleBranch(${branch.id})">
            <div class="branch-accordion-title">
                <span class="branch-icon">${branchIcon}</span>
                <span>${branchName}</span>
            </div>
            <div class="branch-accordion-actions">
                <button class="branch-accordion-toggle">▼</button>
            </div>
        </div>
        <div class="branch-accordion-content">
            <div class="branch-accordion-body">
                <div class="form-row">
                    <div class="form-group">
                        <label>Branch Name *</label>
                        <input type="text" 
                               placeholder="e.g., Sweet Pharma Zanko" 
                               value="${branch.name}"
                               onchange="updateBranch(${branch.id}, 'name', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Badge/Type</label>
                        <input type="text" 
                               placeholder="e.g., Pharmacy, Lab" 
                               value="${branch.badge}"
                               onchange="updateBranch(${branch.id}, 'badge', this.value)">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Address *</label>
                    <textarea placeholder="Full address" 
                              onchange="updateBranch(${branch.id}, 'address', this.value)">${branch.address}</textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" 
                               placeholder="+964 750 123 4567" 
                               value="${branch.phone}"
                               onchange="updateBranch(${branch.id}, 'phone', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Phone Number 2 (Optional)</label>
                        <input type="tel" 
                               placeholder="+964 770 123 4567" 
                               value="${branch.phone2}"
                               onchange="updateBranch(${branch.id}, 'phone2', this.value)">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" 
                               placeholder="branch@example.com" 
                               value="${branch.email}"
                               onchange="updateBranch(${branch.id}, 'email', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Specialty (Optional)</label>
                        <input type="text" 
                               placeholder="e.g., Medical Lab" 
                               value="${branch.specialty}"
                               onchange="updateBranch(${branch.id}, 'specialty', this.value)">
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem; color: var(--accent);">🎨 Display</h3>
                
                <div class="form-group">
                    <label>Display Type</label>
                    <div class="image-type-toggle">
                        <label>
                            <input type="radio" 
                                   name="imageType${branch.id}" 
                                   value="emoji" 
                                   ${branch.imageType === 'emoji' ? 'checked' : ''}
                                   onchange="updateBranch(${branch.id}, 'imageType', 'emoji'); renderBranches();">
                            <span>Emoji</span>
                        </label>
                        <label>
                            <input type="radio" 
                                   name="imageType${branch.id}" 
                                   value="url" 
                                   ${branch.imageType === 'url' ? 'checked' : ''}
                                   onchange="updateBranch(${branch.id}, 'imageType', 'url'); renderBranches();">
                            <span>Image URL</span>
                        </label>
                    </div>
                </div>
                
                ${branch.imageType === 'emoji' ? `
                    <div class="form-row">
                        <div class="form-group">
                            <label>Emoji Icon</label>
                            <input type="text" 
                                   maxlength="3" 
                                   placeholder="🏥" 
                                   value="${branch.icon}"
                                   onchange="updateBranch(${branch.id}, 'icon', this.value); renderBranches();">
                        </div>
                        <div class="form-group">
                            <label>Card Color</label>
                            <select onchange="updateBranch(${branch.id}, 'color', this.value)">
                                <option value="gradient-cream" ${branch.color === 'gradient-cream' ? 'selected' : ''}>Cream</option>
                                <option value="gradient-brown" ${branch.color === 'gradient-brown' ? 'selected' : ''}>Brown</option>
                                <option value="gradient-teal" ${branch.color === 'gradient-teal' ? 'selected' : ''}>Teal</option>
                                <option value="gradient-pink" ${branch.color === 'gradient-pink' ? 'selected' : ''}>Pink</option>
                                <option value="gradient-purple" ${branch.color === 'gradient-purple' ? 'selected' : ''}>Purple</option>
                                <option value="gradient-blue" ${branch.color === 'gradient-blue' ? 'selected' : ''}>Blue</option>
                                <option value="gradient-orange" ${branch.color === 'gradient-orange' ? 'selected' : ''}>Orange</option>
                            </select>
                        </div>
                    </div>
                ` : `
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" 
                               placeholder="https://example.com/image.jpg" 
                               value="${branch.imageUrl}"
                               onchange="updateBranch(${branch.id}, 'imageUrl', this.value)">
                    </div>
                `}
                
                <h3 style="margin: 1.5rem 0 1rem; color: var(--accent);">📍 Location</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Latitude</label>
                        <input type="text" 
                               placeholder="36.1911" 
                               value="${branch.lat}"
                               onchange="updateBranch(${branch.id}, 'lat', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Longitude</label>
                        <input type="text" 
                               placeholder="44.0094" 
                               value="${branch.lng}"
                               onchange="updateBranch(${branch.id}, 'lng', this.value)">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Services (one per line)</label>
                    <textarea placeholder="Blood tests&#10;Medical consultations&#10;Pharmacy services" 
                              onchange="updateBranch(${branch.id}, 'operations', this.value)">${branch.operations}</textarea>
                </div>
                
                <div class="action-buttons">
                    <button class="branch-save-btn" onclick="saveBranch(${branch.id})">
                        💾 Save & Close
                    </button>
                    <button class="social-delete-btn" onclick="deleteBranch(${branch.id})">
                        🗑️ Delete Branch
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

// Update branch data
function updateBranch(id, field, value) {
    const branch = branches.find(b => b.id === id);
    if (branch) {
        branch[field] = value;
    }
}

// Add social media
function addSocialMedia() {
    const social = {
        id: Date.now(),
        name: '',
        url: '',
        icon: 'facebook'
    };
    
    socialMedia.push(social);
    renderSocialMedia();
}

// Delete social media
function deleteSocialMedia(id) {
    const index = socialMedia.findIndex(s => s.id === id);
    if (index > -1) {
        socialMedia.splice(index, 1);
        renderSocialMedia();
    }
}

// Update social media
function updateSocialMedia(id, field, value) {
    const social = socialMedia.find(s => s.id === id);
    if (social) {
        social[field] = value;
        if (field === 'icon') {
            renderSocialMedia();
        }
    }
}

// Open icon picker
function openIconPicker(socialId) {
    currentIconPickerTarget = socialId;
    const modal = document.getElementById('iconPickerModal');
    const iconGrid = document.getElementById('iconGrid');
    
    // Populate icon grid
    iconGrid.innerHTML = '';
    Object.keys(availableIcons).forEach(iconName => {
        const div = document.createElement('div');
        div.className = 'icon-grid-item';
        div.innerHTML = availableIcons[iconName];
        div.onclick = () => selectIcon(iconName);
        
        const social = socialMedia.find(s => s.id === socialId);
        if (social && social.icon === iconName) {
            div.classList.add('selected');
        }
        
        iconGrid.appendChild(div);
    });
    
    modal.classList.add('active');
}

// Close icon picker
function closeIconPicker() {
    document.getElementById('iconPickerModal').classList.remove('active');
    currentIconPickerTarget = null;
}

// Select icon
function selectIcon(iconName) {
    if (currentIconPickerTarget) {
        updateSocialMedia(currentIconPickerTarget, 'icon', iconName);
    }
    closeIconPicker();
}

// Render social media
function renderSocialMedia() {
    const container = document.getElementById('socialMediaContainer');
    container.innerHTML = '';
    
    if (socialMedia.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:2rem;">No social media links added yet.</p>';
        return;
    }
    
    socialMedia.forEach((social, index) => {
        const div = document.createElement('div');
        div.className = 'social-media-item';
        
        div.innerHTML = `
            <div class="social-media-header">
                <div class="social-icon-preview">${availableIcons[social.icon] || availableIcons['facebook']}</div>
                <div style="flex-grow:1;margin:0 1rem;">
                    <h4 style="margin-bottom:0.5rem;">Social Media ${index + 1}</h4>
                </div>
                <button class="social-delete-btn" onclick="deleteSocialMedia(${social.id})">
                    🗑️ Delete
                </button>
            </div>
            <div class="form-row" style="margin-top:1rem;">
                <div class="form-group">
                    <label>Platform Name</label>
                    <input type="text" 
                           placeholder="e.g., Facebook" 
                           value="${social.name}"
                           onchange="updateSocialMedia(${social.id}, 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>URL/Link</label>
                    <input type="url" 
                           placeholder="https://facebook.com/yourpage" 
                           value="${social.url}"
                           onchange="updateSocialMedia(${social.id}, 'url', this.value)">
                </div>
            </div>
            <button class="icon-picker-btn" onclick="openIconPicker(${social.id})">
                🎨 Choose Icon
            </button>
        `;
        
        container.appendChild(div);
    });
}

// Save all data
function saveData() {
    // Collect all content data
    const content = {};
    ['en', 'ku', 'ar'].forEach(lang => {
        const fields = [
            'heroTitle', 'heroDesc', 'heroBtn1', 'heroBtn2',
            'branchesTitle', 'branchesDesc',
            'serviceTitle', 'serviceDesc',
            'contactTitle', 'contactDesc',
            'footerTagline'
        ];
        
        fields.forEach(field => {
            const element = document.getElementById(`${field}_${lang}`);
            if (element) {
                content[`${field}_${lang}`] = element.value;
            }
        });
    });
    
    const data = {
        branches: branches,
        socialMedia: socialMedia,
        service_phone: document.getElementById('servicePhone').value,
        content: content
    };
    
    localStorage.setItem('sweetPharmaData', JSON.stringify(data));
    
    // Show success message
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

// Load data
function loadData() {
    const savedData = localStorage.getItem('sweetPharmaData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Load branches
        branches = data.branches || [];
        branches.forEach(b => b.expanded = false); // Collapse all by default
        renderBranches();
        
        // Load social media
        socialMedia = data.socialMedia || [];
        renderSocialMedia();
        
        // Load service phone
        if (data.service_phone) {
            document.getElementById('servicePhone').value = data.service_phone;
        }
        
        // Load content
        if (data.content) {
            Object.keys(data.content).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = data.content[key];
                }
            });
        }
    } else {
        branches = [];
        socialMedia = [];
        renderBranches();
        renderSocialMedia();
    }
}