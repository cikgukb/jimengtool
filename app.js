// Initialize Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// --- Translations (i18n) Logic ---
const i18nData = {
    ms: {
        pageTitle: "Seedance Prompt Gen",
        appTitle: "Seedance<br><span>Prompt Generator</span>",
        themeToggle: "Tukar Tema",
        langToggle: "Tukar Bahasa",
        settingsBtn: "Tetapan",
        binaPrompt: "Bina Prompt Video",
        labelTopic: "Topik Perbincangan",
        placeholderTopic: "Cth: Senjata Pemasaran untuk SME",
        labelTone: "Tone / Mood",
        placeholderTone: "Cth: Tegas, Bersemangat, Taktikal",
        labelLocation: "Tempat / Latar Belakang",
        placeholderLocation: "Cth: Pangkalan operasi, medan perang, ofis",
        labelCta: "Call to Action (CTA)",
        placeholderCta: "Cth: Masuk melapor di link bawah sekarang",
        generateBtn: "<span>Jana 3 Batch</span> <i class=\"fas fa-fighter-jet\"></i>",
        loadingText: "Menjana koordinat prompt dengan AI...",
        outputTitle: "Output Prompt (Jimeng / Seedance)",
        copy: "<i class=\"fas fa-copy\"></i> Salin",
        copied: "<i class=\"fas fa-check\"></i> Disalin!",
        settingsModalTitle: "Tetapan API Taktikal",
        settingsModalDesc: "Setup Replicate API Key anda di sini. Disimpan ke LocalStorage pusat arahan.",
        labelApiKey: "Replicate API Key",
        labelModelName: "Replicate Model Endpoint (Owner/Model)",
        modelHelp: "Jika model spesifik digunakan, pastikan URL endpoint yang sah.",
        saveSettingsBtn: "Simpan Konfigurasi",
        alertTopic: "Sila lengkapkan Topik, Tone, CTA, dan Tempat sebelum melaksanakan arahan.",
        alertApi: "Sila masukkan API Key di ruangan Tetapan terlebih dahulu.",
        alertError: "Ralat komunikasi AI: ",
        alertFail: "Gagal parse Batch ",
        alertRetry: ". Sila cuba lagi.",
        alertSave: "Konfigurasi berjaya dikemaskini!",
        alertMissingApi: "Sila masukkan API Key anda",
        dialogueLang: "Bahasa Melayu"
    },
    en: {
        pageTitle: "Seedance Prompt Gen",
        appTitle: "Seedance<br><span>Prompt Generator</span>",
        themeToggle: "Toggle Theme",
        langToggle: "Toggle Language",
        settingsBtn: "Settings",
        binaPrompt: "Deploy Video Prompt",
        labelTopic: "Mission Topic",
        placeholderTopic: "E.g.: Marketing Arsenal for SME",
        labelTone: "Tone / Mood",
        placeholderTone: "E.g.: Tactical, Energetic, Authoritative",
        labelLocation: "Location / Background",
        placeholderLocation: "E.g.: Command center, battlefield, office",
        labelCta: "Call to Action (CTA)",
        placeholderCta: "E.g.: Report to the link below now",
        generateBtn: "<span>Generate 3 Batches</span> <i class=\"fas fa-fighter-jet\"></i>",
        loadingText: "Generating prompt coordinates via AI...",
        outputTitle: "Prompt Output (Jimeng / Seedance)",
        copy: "<i class=\"fas fa-copy\"></i> Copy",
        copied: "<i class=\"fas fa-check\"></i> Copied!",
        settingsModalTitle: "Tactical API Settings",
        settingsModalDesc: "Setup your Replicate API Key here. Secured in LocalStorage.",
        labelApiKey: "Replicate API Key",
        labelModelName: "Replicate Model Endpoint (Owner/Model)",
        modelHelp: "If a specific model is used, ensure the endpoint URL is valid.",
        saveSettingsBtn: "Save Configuration",
        alertTopic: "Please provide Topic, Tone, CTA, and Location before executing command.",
        alertApi: "Please securely enter your API Key in Settings first.",
        alertError: "AI communication error: ",
        alertFail: "Failed to parse Batch ",
        alertRetry: ". Please try again.",
        alertSave: "Configuration successfully updated!",
        alertMissingApi: "Please provide your API Key",
        dialogueLang: "English"
    }
};

let currentLang = localStorage.getItem('lang') || 'ms';

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const dict = i18nData[lang];
    
    // Update regular innerHTML fields
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerHTML = dict[key];
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    
    // Update titles for tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key]) el.setAttribute('title', dict[key]);
    });
    
    // HTML wrapper tag
    document.documentElement.lang = lang;
    
    // Toggle Button Text (Show the language you can switch to)
    document.getElementById('langText').innerText = lang === 'ms' ? 'EN' : 'MS';
}

const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'ms' ? 'en' : 'ms';
    applyLanguage(newLang);
});

// Initialize translations
applyLanguage(currentLang);


// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}


// --- Settings Modal Logic ---
const settingsBtn = document.getElementById('settingsBtn');
const closeModalBtn = document.getElementById('closeModal');
const settingsModal = document.getElementById('settingsModal');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const apiKeyInput = document.getElementById('apiKey');
const modelNameInput = document.getElementById('modelName');

const defaultApiKey = "";
if (!localStorage.getItem('replicateApiKey')) {
    localStorage.setItem('replicateApiKey', defaultApiKey);
}
if (!localStorage.getItem('replicateModelName')) {
    localStorage.setItem('replicateModelName', 'meta/meta-llama-3-70b-instruct'); 
}

settingsBtn.addEventListener('click', () => {
    apiKeyInput.value = localStorage.getItem('replicateApiKey') || '';
    modelNameInput.value = localStorage.getItem('replicateModelName') || '';
    settingsModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    settingsModal.classList.remove('active');
});

settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
    }
});

saveSettingsBtn.addEventListener('click', () => {
    if(apiKeyInput.value.trim() === '') {
        alert(i18nData[currentLang].alertMissingApi);
        return;
    }
    localStorage.setItem('replicateApiKey', apiKeyInput.value.trim());
    localStorage.setItem('replicateModelName', modelNameInput.value.trim() || 'meta/meta-llama-3-70b-instruct');
    settingsModal.classList.remove('active');
    alert(i18nData[currentLang].alertSave);
});


// --- Core Generation Logic ---
const generateBtn = document.getElementById('generateBtn');
const outputSection = document.getElementById('outputSection');
const loadingIndicator = document.getElementById('loadingIndicator');

const out1 = document.getElementById('out1');
const out2 = document.getElementById('out2');
const out3 = document.getElementById('out3');

generateBtn.addEventListener('click', async () => {
    const topic = document.getElementById('topic').value.trim();
    const tone = document.getElementById('tone').value.trim();
    const cta = document.getElementById('cta').value.trim();
    const location = document.getElementById('location').value.trim();

    if (!topic || !tone || !cta || !location) {
        alert(i18nData[currentLang].alertTopic);
        return;
    }

    const apiKey = localStorage.getItem('replicateApiKey');
    const modelName = localStorage.getItem('replicateModelName');

    if (!apiKey) {
        alert(i18nData[currentLang].alertApi);
        settingsModal.classList.add('active');
        return;
    }

    generateBtn.disabled = true;
    outputSection.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');

    try {
        const results = await callReplicateAPI(topic, tone, cta, location, apiKey, modelName);
        
        let batches = results.split('|||').map(s => s.trim()).filter(s => s.length > 0);
        
        if (batches.length < 3) {
            batches = results.split('\n\n').map(s => s.trim()).filter(s => s.length > 20);
        }

        const failParseMsg = i18nData[currentLang].alertFail;
        const retryParseMsg = i18nData[currentLang].alertRetry;

        out1.value = batches[0] ? cleanOutput(batches[0]) : `${failParseMsg} 1${retryParseMsg}`;
        out2.value = batches[1] ? cleanOutput(batches[1]) : `${failParseMsg} 2${retryParseMsg}`;
        out3.value = batches[2] ? cleanOutput(batches[2]) : `${failParseMsg} 3${retryParseMsg}`;

        outputSection.classList.remove('hidden');
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error(error);
        alert(i18nData[currentLang].alertError + error.message);
    } finally {
        generateBtn.disabled = false;
        loadingIndicator.classList.add('hidden');
    }
});

function cleanOutput(text) {
    return text.replace(/^(Batch \d|Scene \d|Hook|Solution|CTA)[:\-]?\s*/i, '').replace(/[\*\_]/g, '');
}

async function callReplicateAPI(topic, tone, cta, location, apiKey, modelName) {
    const dialogueLang = i18nData[currentLang].dialogueLang;
    
    // We adjust instructions based on the current language
    const promptText = `Generate exactly 3 video scenes based on these inputs:
Topic: ${topic}
Tone/Mood: ${tone}
Location/Background: ${location}
Call to Action (CTA): ${cta}

RULES:
1. Each scene must be exactly 30-70 words long.
2. The character description must be EXACTLY the word: "@cikgukb". DO NOT use any other description for the person.
3. The location of the scene must explicitly reflect the input "Location/Background".
4. Include dialog in ${dialogueLang}, enclosed in double quotes.
5. Mention the camera angle (e.g. Medium shot, Close-up) and the lighting/mood.
6. DO NOT output any labels like "Batch 1", "Hook", or "Scene". Just the raw prompt text.
7. Separate the three scenes with exactly three pipe characters: |||
8. DO NOT use markdown, bold, or lists.

FORMAT EXAMPLE:
@cikgukb, standing in ${location || "an office"}, tired expression, nods slowly. Says: "${currentLang === 'ms' ? 'Kos naik... korang rasa tak?' : 'Costs are rising... do you feel it?'}" Medium shot, eye-level. Warm natural light, sincere tone.|||@cikgukb, standing in ${location || "an office"}, expression brightens, nods confident. Says: "${currentLang === 'ms' ? 'Lepas aku jumpa Kit Jimat Cermat ni...' : 'Since I found this Thrift Kit...'}" Medium shot, slight lean forward. Warm light.|||@cikgukb, in ${location || "an office"}, confident smile, points directly at camera. Says: "${currentLang === 'ms' ? 'Klik link bawah ni sekarang.' : 'Click the link below right now.'}" Close-up shot, eye-level. Bright warm light, energetic finish.`;

    const proxyUrl = `/v1/models/${modelName}/predictions`;

    const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Prefer": "wait"
        },
        body: JSON.stringify({
            input: {
                prompt: promptText,
                system_prompt: "You are a specialized output generator. Follow the user's instructions perfectly and without adding conversational filler."
            }
        })
    });

    if (!response.ok) {
        let errorMsg = currentLang === 'ms' ? "Ralat API Replicate. Sila semak API Key atau nama model anda." : "Replicate API Error. Please check your API Key or model name.";
        try {
            const errorData = await response.json();
            console.error('[DEBUG] Replicate error response:', JSON.stringify(errorData));
            console.error('[DEBUG] HTTP Status:', response.status);
            console.error('[DEBUG] Model used:', modelName);
            console.error('[DEBUG] API Key (first 8 chars):', apiKey ? apiKey.substring(0, 8) + '...' : 'EMPTY');
            errorMsg = errorData.detail || errorData.error || errorMsg;
        } catch(e) {
            console.error('[DEBUG] HTTP Status:', response.status, '| Could not parse error JSON');
            console.error('[DEBUG] Model used:', modelName);
            console.error('[DEBUG] API Key (first 8 chars):', apiKey ? apiKey.substring(0, 8) + '...' : 'EMPTY');
        }
        throw new Error(`[${response.status}] ${errorMsg}`);
    }

    let prediction = await response.json();

    while (prediction.status !== "succeeded" && prediction.status !== "failed" && prediction.status !== "canceled") {
        await new Promise(r => setTimeout(r, 1000));
        
        const pollProxyUrl = `/v1/predictions/${prediction.id}`;
        
        const res = await fetch(pollProxyUrl, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            }
        });
        prediction = await res.json();
    }

    if (prediction.status === "failed") {
        const apiFailedMsg = currentLang === 'ms' ? "Penjanaan gagal di pelayan Replicate." : "Generation failed on Replicate server.";
        throw new Error(prediction.error || apiFailedMsg);
    }

    const output = prediction.output;
    return Array.isArray(output) ? output.join("") : output;
}

// Copy Buttons Functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        const textArea = document.getElementById(targetId);
        
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(textArea.value).then(() => {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = i18nData[currentLang].copied;
            btn.classList.add('copied');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML; // restore based on translations
                btn.classList.remove('copied');
            }, 2000);
        });
    });
});
