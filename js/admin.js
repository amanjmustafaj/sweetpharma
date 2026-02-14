// Admin Panel JavaScript - Fixed Version

const PASSWORD = 'sweet2024';
let branches = [];
let socialMedia = [];
let branchCounter = 0;
let socialCounter = 0;
let currentAdminLang = 'en';
let currentContentLang = 'en'; // For content editing tabs

// Admin translations
const adminTranslations = {
    en: {
        admin: {
            title: "Sweet Pharma - Admin Panel",
            preview: "👁️ Preview Website",
            logout: "Logout",
            successMsg: "Changes saved successfully! ✓",
            welcome: "👋 Welcome to Admin Panel",
            welcomeText: "Manage all aspects of your website from here.",
            saveChanges: "💾 Save All Changes"
        },
        tabs: {
            content: "Website Content",
            branches: "Branches",
            service: "Home Service",
            social: "Social Media"
        },
        content: {
            title: "📝 Website Content",
            selectLang: "Select Language to Edit:",
            english: "🇬🇧 English",
            kurdish: "🇮🇶 کوردی",
            arabic: "🇸🇦 العربية"
        },
        branches: {
            title: "🏥 Branch Management",
            description: "Add and manage your service locations.",
            addNew: "➕ Add New Branch",
            noBranches: "No Branches Yet",
            noBranchesText: "Click \"Add New Branch\" to start",
            branchNumber: "Branch",
            deleteBranch: "🗑️ Delete",
            name: "Branch Name *",
            badge: "Badge",
            address: "Address *",
            phone: "Phone *",
            phone2: "Phone 2 (Optional)",
            email: "Email",
            specialty: "Specialty",
            imageColor: "🎨 Display",
            displayType: "Display Type",
            emoji: "Emoji",
            imageUrl: "Image URL",
            color: "Color",
            deleteConfirm: "Delete this branch?"
        },
        service: {
            title: "🏠 Home Service",
            phone: "Service Phone Number"
        },
        social: {
            title: "📱 Social Media",
            addNew: "➕ Add Social Media",
            name: "Platform Name",
            url: "URL/Link",
            delete: "🗑️ Delete"
        }
    },
    ku: {
        admin: {
            title: "پانێڵی ئەدمین - سویت فارما",
            preview: "👁️ پێشبینین",
            logout: "چوونە دەرەوە",
            successMsg: "پاشەکەوت کرا! ✓",
            welcome: "👋 بەخێربێیت",
            welcomeText: "لێرەوە ماڵپەڕەکە بەڕێوە ببە",
            saveChanges: "💾 پاشەکەوتکردن"
        },
        tabs: {
            content: "ناوەڕۆک",
            branches: "لقەکان",
            service: "خزمەتی ماڵەوە",
            social: "سۆشیال میدیا"
        },
        content: {
            title: "📝 ناوەڕۆکی ماڵپەڕ",
            selectLang: "زمان هەڵبژێرە:",
            english: "🇬🇧 ئینگلیزی",
            kurdish: "🇮🇶 کوردی",
            arabic: "🇸🇦 عەرەبی"
        },
        branches: {
            title: "🏥 بەڕێوەبردنی لقەکان",
            description: "لقەکان زیاد بکە و بەڕێوەیان ببە",
            addNew: "➕ زیادکردنی لق",
            noBranches: "هێشتا لقێک نییە",
            noBranchesText: "کرتە لەسەر \"زیادکردنی لق\" بکە",
            branchNumber: "لق",
            deleteBranch: "🗑️ سڕینەوە",
            name: "ناوی لق *",
            badge: "نیشان",
            address: "ناونیشان *",
            phone: "تەلەفۆن *",
            phone2: "تەلەفۆن ٢",
            email: "ئیمەیڵ",
            specialty: "تایبەتمەندی",
            imageColor: "🎨 ڕواڵەت",
            displayType: "جۆری پیشاندان",
            emoji: "ئیمۆجی",
            imageUrl: "لینکی وێنە",
            color: "ڕەنگ",
            deleteConfirm: "ئەم لقە بسڕیتەوە؟"
        },
        service: {
            title: "🏠 خزمەتی ماڵەوە",
            phone: "ژمارەی تەلەفۆن"
        },
        social: {
            title: "📱 سۆشیال میدیا",
            addNew: "➕ زیادکردن",
            name: "ناوی پلاتفۆرم",
            url: "لینک",
            delete: "🗑️ سڕینەوە"
        }
    },
    ar: {
        admin: {
            title: "لوحة الإدارة - سويت فارما",
            preview: "👁️ معاينة",
            logout: "خروج",
            successMsg: "تم الحفظ! ✓",
            welcome: "👋 مرحباً",
            welcomeText: "أدر موقعك من هنا",
            saveChanges: "💾 حفظ"
        },
        tabs: {
            content: "المحتوى",
            branches: "الفروع",
            service: "الخدمة المنزلية",
            social: "وسائل التواصل"
        },
        content: {
            title: "📝 محتوى الموقع",
            selectLang: "اختر اللغة:",
            english: "🇬🇧 إنجليزي",
            kurdish: "🇮🇶 كردي",
            arabic: "🇸🇦 عربي"
        },
        branches: {
            title: "🏥 إدارة الفروع",
            description: "أضف وأدر فروعك",
            addNew: "➕ إضافة فرع",
            noBranches: "لا توجد فروع",
            noBranchesText: "انقر \"إضافة فرع\"",
            branchNumber: "فرع",
            deleteBranch: "🗑️ حذف",
            name: "اسم الفرع *",
            badge: "شارة",
            address: "العنوان *",
            phone: "الهاتف *",
            phone2: "هاتف ٢",
            email: "البريد",
            specialty: "التخصص",
            imageColor: "🎨 العرض",
            displayType: "نوع العرض",
            emoji: "إيموجي",
            imageUrl: "رابط الصورة",
            color: "اللون",
            deleteConfirm: "حذف هذا الفرع؟"
        },
        service: {
            title: "🏠 الخدمة المنزلية",
            phone: "رقم الهاتف"
        },
        social: {
            title: "📱 وسائل التواصل",
            addNew: "➕ إضافة",
            name: "اسم المنصة",
            url: "الرابط",
            delete: "🗑️ حذف"
        }
    }
};

// ========== ADMIN LANGUAGE SWITCHING ==========
function changeAdminLanguage(lang) {
    currentAdminLang = lang;
    localStorage.setItem('adminLanguage', lang);
    
    // Update all admin translations
    document.querySelectorAll('[data-admin-i18n]').forEach(el => {
        const key = el.getAttribute('data-admin-i18n');
        const translation = getNestedTranslation(adminTranslations[lang], key);
        if (translation) {
            if (el.tagName === 'INPUT' && el.type !== 'radio' && el.type !== 'checkbox') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
    
    // Update RTL
    document.documentElement.setAttribute('dir', lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr');
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// ========== CONTENT LANGUAGE TABS ==========
function switchContentLang(lang) {
    currentContentLang = lang;
    
    // Hide all language sections
    document.querySelectorAll('.content-lang-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected language section
    const section = document.getElementById(`content-${lang}`);
    if (section) {
        section.classList.add('active');
    }
    
    // Update button active states - FIXED: use correct class name
    document.querySelectorAll('.lang-btn-large').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    const activeBtn = document.querySelector(`.lang-btn-large[data-lang="${lang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    console.log(`✅ Content language switched to: ${lang}`);
}

// ========== LOGIN ==========
function login() {
    const password = document.getElementById('passwordInput').value;
    if (password === PASSWORD) {
        // Save login session
        sessionStorage.setItem('adminLoggedIn', 'true');
        
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadData();
    } else {
        alert('Incorrect password / وشەی نهێنی هەڵەیە');
    }
}

function logout() {
    // Clear login session
    sessionStorage.removeItem('adminLoggedIn');
    
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

// ========== TAB SWITCHING ==========
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// ========== BRANCH MANAGEMENT ==========
function addNewBranch() {
    branchCounter++;
    const newBranch = {
        id: Date.now(),
        name: '',
        badge: '',
        address: '',
        phone: '',
        phone2: '',
        email: '',
        specialty: '',
        imageType: 'emoji',
        icon: '🏥',
        imageUrl: '',
        color: 'gradient-cream',
        expanded: true
    };
    
    branches.push(newBranch);
    renderBranches();
}

function toggleBranch(id) {
    const branch = branches.find(b => b.id === id);
    if (branch) {
        branch.expanded = !branch.expanded;
        renderBranches();
    }
}

function updateBranch(id, field, value) {
    const branch = branches.find(b => b.id === id);
    if (branch) {
        branch[field] = value;
    }
}

function deleteBranch(id) {
    const t = adminTranslations[currentAdminLang].branches;
    if (confirm(t.deleteConfirm)) {
        branches = branches.filter(b => b.id !== id);
        renderBranches();
    }
}

function renderBranches() {
    const container = document.getElementById('branchesContainer');
    const empty = document.getElementById('emptyState');
    const t = adminTranslations[currentAdminLang].branches;
    
    if (branches.length === 0) {
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    container.innerHTML = '';
    
    branches.forEach((branch, index) => {
        const card = document.createElement('div');
        card.className = 'branch-item';
        
        card.innerHTML = `
            <div class="branch-header" onclick="toggleBranch(${branch.id})">
                <div style="flex-grow:1;">
                    <h4>${branch.name || `${t.branchNumber} ${index + 1}`}</h4>
                    <small style="color:var(--text-light);">${branch.address || 'No address'}</small>
                </div>
                <button class="btn-icon" onclick="event.stopPropagation(); deleteBranch(${branch.id})">${t.deleteBranch}</button>
            </div>
            
            <div class="branch-body" style="display:${branch.expanded ? 'block' : 'none'};">
                <div class="form-row">
                    <div class="form-group">
                        <label>${t.name}</label>
                        <input type="text" value="${branch.name}" onchange="updateBranch(${branch.id}, 'name', this.value)">
                    </div>
                    <div class="form-group">
                        <label>${t.badge}</label>
                        <input type="text" value="${branch.badge}" onchange="updateBranch(${branch.id}, 'badge', this.value)">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>${t.address}</label>
                    <textarea onchange="updateBranch(${branch.id}, 'address', this.value)">${branch.address}</textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>${t.phone}</label>
                        <input type="tel" value="${branch.phone}" onchange="updateBranch(${branch.id}, 'phone', this.value)">
                    </div>
                    <div class="form-group">
                        <label>${t.phone2}</label>
                        <input type="tel" value="${branch.phone2}" onchange="updateBranch(${branch.id}, 'phone2', this.value)">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>${t.email}</label>
                        <input type="email" value="${branch.email}" onchange="updateBranch(${branch.id}, 'email', this.value)">
                    </div>
                    <div class="form-group">
                        <label>${t.specialty}</label>
                        <input type="text" value="${branch.specialty}" onchange="updateBranch(${branch.id}, 'specialty', this.value)">
                    </div>
                </div>
                
                <h3 style="margin-top:2rem;color:var(--accent);">${t.imageColor}</h3>
                
                <div class="form-group">
                    <label>${t.displayType}</label>
                    <div style="display:flex;gap:1rem;">
                        <label style="display:flex;align-items:center;gap:0.5rem;">
                            <input type="radio" name="type${branch.id}" value="emoji" 
                                   ${branch.imageType === 'emoji' ? 'checked' : ''}
                                   onchange="updateBranch(${branch.id}, 'imageType', 'emoji'); renderBranches();">
                            ${t.emoji}
                        </label>
                        <label style="display:flex;align-items:center;gap:0.5rem;">
                            <input type="radio" name="type${branch.id}" value="url" 
                                   ${branch.imageType === 'url' ? 'checked' : ''}
                                   onchange="updateBranch(${branch.id}, 'imageType', 'url'); renderBranches();">
                            ${t.imageUrl}
                        </label>
                    </div>
                </div>
                
                ${branch.imageType === 'emoji' ? `
                    <div class="form-row">
                        <div class="form-group">
                            <label>${t.emoji}</label>
                            <input type="text" maxlength="3" value="${branch.icon}" 
                                   onchange="updateBranch(${branch.id}, 'icon', this.value)">
                        </div>
                        <div class="form-group">
                            <label>${t.color}</label>
                            <select onchange="updateBranch(${branch.id}, 'color', this.value)">
                                <option value="gradient-cream" ${branch.color === 'gradient-cream' ? 'selected' : ''}>Cream</option>
                                <option value="gradient-brown" ${branch.color === 'gradient-brown' ? 'selected' : ''}>Brown</option>
                                <option value="gradient-teal" ${branch.color === 'gradient-teal' ? 'selected' : ''}>Teal</option>
                                <option value="gradient-pink" ${branch.color === 'gradient-pink' ? 'selected' : ''}>Pink</option>
                            </select>
                        </div>
                    </div>
                ` : `
                    <div class="form-group">
                        <label>${t.imageUrl}</label>
                        <input type="url" value="${branch.imageUrl}" 
                               onchange="updateBranch(${branch.id}, 'imageUrl', this.value)">
                    </div>
                `}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ========== SOCIAL MEDIA MANAGEMENT ==========
function addSocialMedia() {
    socialCounter++;
    const newSocial = {
        id: Date.now(),
        name: '',
        url: ''
    };
    
    socialMedia.push(newSocial);
    renderSocialMedia();
}

function updateSocialMedia(id, field, value) {
    const social = socialMedia.find(s => s.id === id);
    if (social) {
        social[field] = value;
    }
}

function deleteSocialMedia(id) {
    const t = adminTranslations[currentAdminLang].social;
    if (confirm('Delete this social media?')) {
        socialMedia = socialMedia.filter(s => s.id !== id);
        renderSocialMedia();
    }
}

function renderSocialMedia() {
    const container = document.getElementById('socialMediaContainer');
    const t = adminTranslations[currentAdminLang].social;
    
    if (socialMedia.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📱</div>
                <p>No social media links yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    socialMedia.forEach((social, index) => {
        const card = document.createElement('div');
        card.className = 'social-media-item';
        
        card.innerHTML = `
            <div class="social-media-header">
                <h4 style="color: var(--accent); font-size: 1.2rem; margin: 0;">Social Media ${index + 1}</h4>
                <button class="social-delete-btn" onclick="deleteSocialMedia(${social.id})">${t.delete}</button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>${t.name}</label>
                    <input type="text" placeholder="Facebook, Instagram..." 
                           value="${social.name}" 
                           onchange="updateSocialMedia(${social.id}, 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>${t.url}</label>
                    <input type="url" placeholder="https://..." 
                           value="${social.url}" 
                           onchange="updateSocialMedia(${social.id}, 'url', this.value)">
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    console.log(`✅ Rendered ${socialMedia.length} social media items`);
}

// ========== SAVE & LOAD DATA ==========
function saveData() {
    const data = {
        branches: branches,
        socialMedia: socialMedia,
        service_phone: document.getElementById('servicePhone')?.value || '',
        content: {
            // English
            hero_title_en: document.getElementById('heroTitle_en')?.value || '',
            hero_desc_en: document.getElementById('heroDesc_en')?.value || '',
            hero_btn1_en: document.getElementById('heroBtn1_en')?.value || '',
            hero_btn2_en: document.getElementById('heroBtn2_en')?.value || '',
            branches_title_en: document.getElementById('branchesTitle_en')?.value || '',
            branches_desc_en: document.getElementById('branchesDesc_en')?.value || '',
            service_title_en: document.getElementById('serviceTitle_en')?.value || '',
            service_desc_en: document.getElementById('serviceDesc_en')?.value || '',
            contact_title_en: document.getElementById('contactTitle_en')?.value || '',
            contact_desc_en: document.getElementById('contactDesc_en')?.value || '',
            footer_tagline_en: document.getElementById('footerTagline_en')?.value || '',
            // Kurdish
            hero_title_ku: document.getElementById('heroTitle_ku')?.value || '',
            hero_desc_ku: document.getElementById('heroDesc_ku')?.value || '',
            hero_btn1_ku: document.getElementById('heroBtn1_ku')?.value || '',
            hero_btn2_ku: document.getElementById('heroBtn2_ku')?.value || '',
            branches_title_ku: document.getElementById('branchesTitle_ku')?.value || '',
            branches_desc_ku: document.getElementById('branchesDesc_ku')?.value || '',
            service_title_ku: document.getElementById('serviceTitle_ku')?.value || '',
            service_desc_ku: document.getElementById('serviceDesc_ku')?.value || '',
            contact_title_ku: document.getElementById('contactTitle_ku')?.value || '',
            contact_desc_ku: document.getElementById('contactDesc_ku')?.value || '',
            footer_tagline_ku: document.getElementById('footerTagline_ku')?.value || '',
            // Arabic
            hero_title_ar: document.getElementById('heroTitle_ar')?.value || '',
            hero_desc_ar: document.getElementById('heroDesc_ar')?.value || '',
            hero_btn1_ar: document.getElementById('heroBtn1_ar')?.value || '',
            hero_btn2_ar: document.getElementById('heroBtn2_ar')?.value || '',
            branches_title_ar: document.getElementById('branchesTitle_ar')?.value || '',
            branches_desc_ar: document.getElementById('branchesDesc_ar')?.value || '',
            service_title_ar: document.getElementById('serviceTitle_ar')?.value || '',
            service_desc_ar: document.getElementById('serviceDesc_ar')?.value || '',
            contact_title_ar: document.getElementById('contactTitle_ar')?.value || '',
            contact_desc_ar: document.getElementById('contactDesc_ar')?.value || '',
            footer_tagline_ar: document.getElementById('footerTagline_ar')?.value || ''
        }
    };
    
    localStorage.setItem('sweetPharmaData', JSON.stringify(data));
    
    // Show success
    const msg = document.getElementById('successMessage');
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 3000);
}

function loadData() {
    const saved = localStorage.getItem('sweetPharmaData');
    
    if (saved) {
        const data = JSON.parse(saved);
        
        // Load branches
        branches = data.branches || [];
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
                const el = document.getElementById(key);
                if (el) el.value = data.content[key];
            });
        }
    }
}

// ========== LOGIN & LOGOUT ==========
function login(event) {
    if (event) event.preventDefault();
    
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('loginError');
    
    if (password === PASSWORD) {
        // Save session
        sessionStorage.setItem('adminLoggedIn', 'true');
        console.log('✅ Login successful - session saved');
        
        // Hide login screen, show admin panel
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        
        // Load data
        loadData();
        
        // Clear password field
        document.getElementById('passwordInput').value = '';
        errorMsg.style.display = 'none';
    } else {
        // Show error
        errorMsg.style.display = 'block';
        console.log('❌ Wrong password');
    }
    
    return false;
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        sessionStorage.removeItem('adminLoggedIn');
        console.log('🚪 Logged out - session cleared');
        
        // Show login screen, hide admin panel
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
        
        // Clear password field
        document.getElementById('passwordInput').value = '';
    }
}

// ========== INITIALIZATION ==========
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Admin panel loading...');
    
    // Check if user is already logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    console.log('🔍 Checking session:', isLoggedIn);
    
    if (isLoggedIn === 'true') {
        // Auto-login: show admin panel
        console.log('✅ Session found - auto login');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadData();
    } else {
        // Show login screen
        console.log('❌ No session - show login');
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }
    
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
        console.log('✅ Login form event attached');
    }
    
    // Initialize content language tab
    switchContentLang('en');
    
    console.log('✅ Admin panel ready!');
});