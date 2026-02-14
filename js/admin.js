// Admin Panel JavaScript

const PASSWORD = 'sweet2024';
let branches = [];
let branchCounter = 0;
let currentAdminLang = 'en';

// Admin translations
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
            title: "📝 Website Content & Titles",
            description: "Edit all text content that appears on your website. Changes will be visible in all languages.",
            hero: "Hero Section",
            heroTitle: "Main Title (Hero)",
            heroTitleKu: "Main Title (Kurdish)",
            heroTitleAr: "Main Title (Arabic)",
            heroDesc: "Hero Description (English)",
            heroDescKu: "Hero Description (Kurdish)",
            heroDescAr: "Hero Description (Arabic)",
            english: "English",
            branches: "Branches Section",
            branchesTitle: "Section Title (English)",
            branchesTitleKu: "Section Title (Kurdish)",
            branchesTitleAr: "Section Title (Arabic)",
            service: "Home Service Section",
            serviceTitle: "Service Title (English)",
            serviceTitleKu: "Service Title (Kurdish)",
            serviceTitleAr: "Service Title (Arabic)"
        },
        branches: {
            title: "🏥 Branch Management",
            description: "Add and manage all your service locations. Each branch will appear on the main website.",
            addNew: "➕ Add New Branch",
            noBranches: "No Branches Yet",
            noBranchesText: "Click \"Add New Branch\" to create your first service location",
            branchNumber: "Branch",
            deleteBranch: "🗑️ Delete Branch",
            name: "Branch Name *",
            badge: "Badge (Type)",
            address: "Address *",
            phone: "Phone Number *",
            phone2: "Phone Number 2 (Optional)",
            email: "Email",
            specialty: "Specialty (Optional)",
            imageColor: "🎨 Image & Color",
            displayType: "Display Type",
            emoji: "Emoji Icon",
            imageUrl: "Image URL",
            color: "Card Color",
            location: "📍 Location (Optional)",
            latitude: "Latitude",
            longitude: "Longitude",
            services: "Services/Operations (Optional)",
            deleteConfirm: "Are you sure you want to delete this branch? This cannot be undone!"
        },
        service: {
            title: "🏠 Home Testing Service",
            phone: "Service Phone Number"
        },
        social: {
            title: "📱 Social Media Links"
        }
    },
    ku: {
        admin: {
            title: "پانێڵی ئەدمین - سویت فارما",
            preview: "👁️ پێشبینین",
            logout: "چوونە دەرەوە",
            successMsg: "گۆڕانکارییەکان بە سەرکەوتوویی پاشەکەوت کرا! ✓",
            welcome: "👋 بەخێربێیت بۆ پانێڵی ئەدمین",
            welcomeText: "لێرەوە دەتوانیت هەموو بەشەکانی ماڵپەڕەکە بەڕێوە ببەیت. لەبیرت نەچێت دوگمەی \"پاشەکەوتکردن\" دابگریت.",
            saveChanges: "💾 پاشەکەوتکردنی هەموو گۆڕانکارییەکان"
        },
        tabs: {
            content: "ناوەڕۆکی ماڵپەڕ",
            branches: "لقەکان",
            service: "خزمەتی ماڵەوە",
            social: "سۆشیال میدیا"
        },
        content: {
            title: "📝 ناوەڕۆک و سەردێڕەکانی ماڵپەڕ",
            description: "دەستکاری هەموو دەقەکانی ماڵپەڕەکە بکە. گۆڕانکارییەکان لە هەموو زمانەکاندا دەردەکەون.",
            hero: "بەشی سەرەکی",
            heroTitle: "سەردێڕی سەرەکی",
            heroTitleKu: "سەردێڕی سەرەکی (کوردی)",
            heroTitleAr: "سەردێڕی سەرەکی (عەرەبی)",
            heroDesc: "وەسفی سەرەکی (ئینگلیزی)",
            heroDescKu: "وەسفی سەرەکی (کوردی)",
            heroDescAr: "وەسفی سەرەکی (عەرەبی)",
            english: "ئینگلیزی",
            branches: "بەشی لقەکان",
            branchesTitle: "سەردێڕی بەش (ئینگلیزی)",
            branchesTitleKu: "سەردێڕی بەش (کوردی)",
            branchesTitleAr: "سەردێڕی بەش (عەرەبی)",
            service: "بەشی خزمەتی ماڵەوە",
            serviceTitle: "سەردێڕی خزمەت (ئینگلیزی)",
            serviceTitleKu: "سەردێڕی خزمەت (کوردی)",
            serviceTitleAr: "سەردێڕی خزمەت (عەرەبی)"
        },
        branches: {
            title: "🏥 بەڕێوەبردنی لقەکان",
            description: "لقەکانت زیاد بکە و بەڕێوەیان ببە. هەر لقێک لەسەر ماڵپەڕەکە دەردەکەوێت.",
            addNew: "➕ زیادکردنی لقی نوێ",
            noBranches: "هێشتا لقێک نییە",
            noBranchesText: "کرتە لەسەر \"زیادکردنی لقی نوێ\" بکە بۆ دروستکردنی یەکەم لقەکەت",
            branchNumber: "لقی",
            deleteBranch: "🗑️ سڕینەوەی لقەکە",
            name: "ناوی لقەکە *",
            badge: "جۆر",
            address: "ناونیشان *",
            phone: "ژمارەی تەلەفۆن *",
            phone2: "ژمارەی تەلەفۆن ٢ (ئیختیاری)",
            email: "ئیمەیڵ",
            specialty: "تایبەتمەندی (ئیختیاری)",
            imageColor: "🎨 وێنە و ڕەنگ",
            displayType: "جۆری پیشاندان",
            emoji: "ئایکۆنی ئیمۆجی",
            imageUrl: "لینکی وێنە",
            color: "ڕەنگی کارت",
            location: "📍 شوێن (ئیختیاری)",
            latitude: "پانی",
            longitude: "درێژی",
            services: "خزمەتگوزاریەکان (ئیختیاری)",
            deleteConfirm: "دڵنیایت لە سڕینەوەی ئەم لقە؟ ناتوانیت دووبارە بیگەڕێنیتەوە!"
        },
        service: {
            title: "🏠 خزمەتی تاقیگە لە ماڵەوە",
            phone: "ژمارەی تەلەفۆنی خزمەت"
        },
        social: {
            title: "📱 سۆشیال میدیا"
        }
    },
    ar: {
        admin: {
            title: "لوحة الإدارة - سويت فارما",
            preview: "👁️ معاينة الموقع",
            logout: "تسجيل الخروج",
            successMsg: "تم حفظ التغييرات بنجاح! ✓",
            welcome: "👋 مرحباً بك في لوحة الإدارة",
            welcomeText: "أدر جميع جوانب موقعك من هنا. تذكر النقر على \"حفظ التغييرات\" بعد إجراء أي تعديلات.",
            saveChanges: "💾 حفظ جميع التغييرات"
        },
        tabs: {
            content: "محتوى الموقع",
            branches: "الفروع",
            service: "الخدمة المنزلية",
            social: "وسائل التواصل"
        },
        content: {
            title: "📝 محتوى وعناوين الموقع",
            description: "عدّل جميع النصوص التي تظهر على موقعك. ستكون التغييرات مرئية في جميع اللغات.",
            hero: "القسم الرئيسي",
            heroTitle: "العنوان الرئيسي",
            heroTitleKu: "العنوان الرئيسي (كردي)",
            heroTitleAr: "العنوان الرئيسي (عربي)",
            heroDesc: "الوصف الرئيسي (إنجليزي)",
            heroDescKu: "الوصف الرئيسي (كردي)",
            heroDescAr: "الوصف الرئيسي (عربي)",
            english: "إنجليزي",
            branches: "قسم الفروع",
            branchesTitle: "عنوان القسم (إنجليزي)",
            branchesTitleKu: "عنوان القسم (كردي)",
            branchesTitleAr: "عنوان القسم (عربي)",
            service: "قسم الخدمة المنزلية",
            serviceTitle: "عنوان الخدمة (إنجليزي)",
            serviceTitleKu: "عنوان الخدمة (كردي)",
            serviceTitleAr: "عنوان الخدمة (عربي)"
        },
        branches: {
            title: "🏥 إدارة الفروع",
            description: "أضف وأدر جميع مواقع خدماتك. سيظهر كل فرع على الموقع الرئيسي.",
            addNew: "➕ إضافة فرع جديد",
            noBranches: "لا توجد فروع بعد",
            noBranchesText: "انقر على \"إضافة فرع جديد\" لإنشاء أول موقع خدمة لك",
            branchNumber: "الفرع",
            deleteBranch: "🗑️ حذف الفرع",
            name: "اسم الفرع *",
            badge: "النوع",
            address: "العنوان *",
            phone: "رقم الهاتف *",
            phone2: "رقم الهاتف ٢ (اختياري)",
            email: "البريد الإلكتروني",
            specialty: "التخصص (اختياري)",
            imageColor: "🎨 الصورة واللون",
            displayType: "نوع العرض",
            emoji: "أيقونة إيموجي",
            imageUrl: "رابط الصورة",
            color: "لون البطاقة",
            location: "📍 الموقع (اختياري)",
            latitude: "خط العرض",
            longitude: "خط الطول",
            services: "الخدمات (اختياري)",
            deleteConfirm: "هل أنت متأكد من حذف هذا الفرع؟ لا يمكن التراجع عن ذلك!"
        },
        service: {
            title: "🏠 خدمة الفحوصات المنزلية",
            phone: "رقم هاتف الخدمة"
        },
        social: {
            title: "📱 وسائل التواصل الاجتماعي"
        }
    }
};

// Change admin language
function changeAdminLanguage(lang) {
    currentAdminLang = lang;
    localStorage.setItem('adminLanguage', lang);
    
    // Update HTML lang and dir
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'ku') ? 'rtl' : 'ltr';
    
    // Update active language button
    document.querySelectorAll('.admin-lang-switcher .lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    updateAdminTranslations();
    
    // Re-render branches to update their labels
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

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('passwordInput').value;
    
    if (password === PASSWORD) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        
        // Load saved admin language
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
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
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
        operations: ''
    };
    
    branches.push(branch);
    renderBranches();
}

// Remove branch
function removeBranch(id) {
    const t = adminTranslations[currentAdminLang].branches;
    
    if (!confirm(t.deleteConfirm)) {
        return;
    }
    
    branches = branches.filter(b => b.id !== id);
    renderBranches();
}

// Render all branches
function renderBranches() {
    const container = document.getElementById('branchesContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (branches.length === 0) {
        emptyState.style.display = 'block';
        updateAdminTranslations(); // Update empty state text
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
        const branchElement = createBranchElement(branch, index);
        container.appendChild(branchElement);
    });
}

// Create branch element
function createBranchElement(branch, index) {
    const t = adminTranslations[currentAdminLang].branches;
    const div = document.createElement('div');
    div.className = 'branch-item';
    
    div.innerHTML = `
        <div class="branch-item-header">
            <h3>${t.branchNumber} ${index + 1}</h3>
            <button class="branch-delete-btn" onclick="removeBranch(${branch.id})">
                ${t.deleteBranch}
            </button>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>${t.name}</label>
                <input type="text" 
                       placeholder="e.g., Sweet Pharma Zanko" 
                       value="${branch.name}"
                       onchange="updateBranch(${branch.id}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>${t.badge}</label>
                <input type="text" 
                       placeholder="e.g., Pharmacy, Medical Lab" 
                       value="${branch.badge}"
                       onchange="updateBranch(${branch.id}, 'badge', this.value)">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>${t.address}</label>
                <textarea placeholder="Full address" 
                          onchange="updateBranch(${branch.id}, 'address', this.value)">${branch.address}</textarea>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>${t.phone}</label>
                <input type="tel" 
                       placeholder="+964 750 123 4567" 
                       value="${branch.phone}"
                       onchange="updateBranch(${branch.id}, 'phone', this.value)">
            </div>
            <div class="form-group">
                <label>${t.phone2}</label>
                <input type="tel" 
                       placeholder="+964 770 123 4567" 
                       value="${branch.phone2}"
                       onchange="updateBranch(${branch.id}, 'phone2', this.value)">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>${t.email}</label>
                <input type="email" 
                       placeholder="branch@example.com" 
                       value="${branch.email}"
                       onchange="updateBranch(${branch.id}, 'email', this.value)">
            </div>
            <div class="form-group">
                <label>${t.specialty}</label>
                <input type="text" 
                       placeholder="e.g., Comprehensive Medical Lab" 
                       value="${branch.specialty}"
                       onchange="updateBranch(${branch.id}, 'specialty', this.value)">
            </div>
        </div>
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent);">${t.imageColor}</h3>
        
        <div class="form-group">
            <label>${t.displayType}</label>
            <div class="image-type-toggle">
                <label>
                    <input type="radio" 
                           name="imageType${branch.id}" 
                           value="emoji" 
                           ${branch.imageType === 'emoji' ? 'checked' : ''}
                           onchange="updateBranch(${branch.id}, 'imageType', 'emoji'); renderBranches();">
                    <span>${t.emoji}</span>
                </label>
                <label>
                    <input type="radio" 
                           name="imageType${branch.id}" 
                           value="url" 
                           ${branch.imageType === 'url' ? 'checked' : ''}
                           onchange="updateBranch(${branch.id}, 'imageType', 'url'); renderBranches();">
                    <span>${t.imageUrl}</span>
                </label>
            </div>
        </div>
        
        ${branch.imageType === 'emoji' ? `
            <div class="form-row">
                <div class="form-group">
                    <label>${t.emoji}</label>
                    <input type="text" 
                           maxlength="3" 
                           placeholder="🏥" 
                           value="${branch.icon}"
                           onchange="updateBranch(${branch.id}, 'icon', this.value)">
                </div>
                <div class="form-group">
                    <label>${t.color}</label>
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
                <label>${t.imageUrl}</label>
                <input type="url" 
                       placeholder="https://example.com/image.jpg" 
                       value="${branch.imageUrl}"
                       onchange="updateBranch(${branch.id}, 'imageUrl', this.value)">
                <small>💡 You can upload images to <a href="https://imgur.com/" target="_blank" style="color: var(--accent);">Imgur</a> and copy the link</small>
            </div>
        `}
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent);">${t.location}</h3>
        
        <div class="form-row">
            <div class="form-group">
                <label>${t.latitude}</label>
                <input type="text" 
                       placeholder="36.1911" 
                       value="${branch.lat}"
                       onchange="updateBranch(${branch.id}, 'lat', this.value)">
                <small>Get coordinates from <a href="https://www.google.com/maps" target="_blank" style="color: var(--accent);">Google Maps</a></small>
            </div>
            <div class="form-group">
                <label>${t.longitude}</label>
                <input type="text" 
                       placeholder="44.0094" 
                       value="${branch.lng}"
                       onchange="updateBranch(${branch.id}, 'lng', this.value)">
            </div>
        </div>
        
        <div class="form-group">
            <label>${t.services}</label>
            <textarea placeholder="List services, one per line&#10;e.g.,&#10;Blood tests&#10;Medical consultations&#10;Pharmacy services" 
                      onchange="updateBranch(${branch.id}, 'operations', this.value)">${branch.operations}</textarea>
            <small>Enter each service on a new line</small>
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

// Save all data
function saveData() {
    const data = {
        branches: branches,
        service_phone: document.getElementById('servicePhone').value,
        social_facebook: document.getElementById('socialFacebook').value,
        social_instagram: document.getElementById('socialInstagram').value,
        social_tiktok: document.getElementById('socialTiktok').value,
        social_snapchat: document.getElementById('socialSnapchat').value,
        // CMS Content
        content: {
            hero_title_en: document.getElementById('heroTitle_en')?.value || '',
            hero_title_ku: document.getElementById('heroTitle_ku')?.value || '',
            hero_title_ar: document.getElementById('heroTitle_ar')?.value || '',
            hero_desc_en: document.getElementById('heroDesc_en')?.value || '',
            hero_desc_ku: document.getElementById('heroDesc_ku')?.value || '',
            hero_desc_ar: document.getElementById('heroDesc_ar')?.value || '',
            branches_title_en: document.getElementById('branchesTitle_en')?.value || '',
            branches_title_ku: document.getElementById('branchesTitle_ku')?.value || '',
            branches_title_ar: document.getElementById('branchesTitle_ar')?.value || '',
            service_title_en: document.getElementById('serviceTitle_en')?.value || '',
            service_title_ku: document.getElementById('serviceTitle_ku')?.value || '',
            service_title_ar: document.getElementById('serviceTitle_ar')?.value || ''
        }
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
        renderBranches();
        
        // Load service data
        if (data.service_phone) {
            document.getElementById('servicePhone').value = data.service_phone;
        }
        
        // Load social media
        if (data.social_facebook) {
            document.getElementById('socialFacebook').value = data.social_facebook;
        }
        if (data.social_instagram) {
            document.getElementById('socialInstagram').value = data.social_instagram;
        }
        if (data.social_tiktok) {
            document.getElementById('socialTiktok').value = data.social_tiktok;
        }
        if (data.social_snapchat) {
            document.getElementById('socialSnapchat').value = data.social_snapchat;
        }
        
        // Load CMS content
        if (data.content) {
            const fields = [
                'heroTitle_en', 'heroTitle_ku', 'heroTitle_ar',
                'heroDesc_en', 'heroDesc_ku', 'heroDesc_ar',
                'branchesTitle_en', 'branchesTitle_ku', 'branchesTitle_ar',
                'serviceTitle_en', 'serviceTitle_ku', 'serviceTitle_ar'
            ];
            
            fields.forEach(field => {
                const element = document.getElementById(field);
                const dataKey = field.replace(/_/g, '_').toLowerCase();
                if (element && data.content[dataKey]) {
                    element.value = data.content[dataKey];
                }
            });
        }
    } else {
        // No saved data - start fresh
        branches = [];
        renderBranches();
    }
}