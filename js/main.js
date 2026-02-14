// Sweet Pharma - Frontend JavaScript
// Theme & Language Management

let currentLanguage = 'en';

// ========== THEME MANAGEMENT ==========
function setTheme(theme) {
    console.log('🎨 Setting theme:', theme);
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

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// ========== LANGUAGE MANAGEMENT ==========
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
    console.log('🌍 Changing language to:', lang);
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

function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    changeLanguage(savedLang);
}

// ========== CAROUSEL MANAGEMENT ==========
function moveCarousel(direction) {
    const container = document.getElementById('carouselContainer');
    if (!container) return;
    
    const scrollAmount = 370; // card width + gap
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// ========== DYNAMIC CONTENT LOADING ==========
function loadWebsiteContent() {
    const savedData = localStorage.getItem('sweetPharmaData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Load branches
        if (data.branches && data.branches.length > 0) {
            renderBranchesCarousel(data.branches);
        }
        
        // Load service phone
        if (data.service_phone) {
            const phoneElement = document.getElementById('servicePhoneNumber');
            const phoneLink = document.getElementById('servicePhone');
            if (phoneElement) phoneElement.textContent = data.service_phone;
            if (phoneLink) phoneLink.href = `tel:${data.service_phone}`;
        }
        
        // Load social media links
        if (data.socialMedia && data.socialMedia.length > 0) {
            updateSocialMediaLinks(data.socialMedia);
        }
    }
}

function renderBranchesCarousel(branches) {
    const container = document.getElementById('carouselContainer');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    branches.forEach(branch => {
        const card = document.createElement('div');
        card.className = 'branch-card';
        
        const lang = currentLanguage;
        const name = branch[`name_${lang}`] || branch.name_en || 'Branch';
        const address = branch[`address_${lang}`] || branch.address_en || '';
        const phone = branch.phone || '';
        const hours = branch[`hours_${lang}`] || branch.hours_en || '';
        
        card.innerHTML = `
            <h3>${name}</h3>
            ${address ? `<p>📍 ${address}</p>` : ''}
            ${phone ? `<p>📞 <a href="tel:${phone}">${phone}</a></p>` : ''}
            ${hours ? `<p>🕒 ${hours}</p>` : ''}
        `;
        
        container.appendChild(card);
    });
}

function updateSocialMediaLinks(socialMedia) {
    socialMedia.forEach(social => {
        // Update hero section social links
        const heroLink = document.getElementById(`social${social.name}`);
        if (heroLink) {
            heroLink.href = social.url;
        }
        
        // Update footer social links
        const footerLink = document.getElementById(`footer${social.name}`);
        if (footerLink) {
            footerLink.href = social.url;
        }
    });
}

// ========== INITIALIZATION ==========
window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Sweet Pharma - Loading...');
    
    // Load theme and language
    loadTheme();
    loadLanguage();
    
    // Load dynamic content from localStorage
    loadWebsiteContent();
    
    console.log('✅ Sweet Pharma - Ready!');
});
