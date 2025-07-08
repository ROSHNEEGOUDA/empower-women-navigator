
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    appName: 'CreditSakhi',
    subtitle: 'Empowering Women Through Financial Freedom',
    language: 'Language',
    selectLanguage: 'Select Language',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    
    // Login
    welcomeBack: 'Welcome Back',
    signIn: 'Sign in to your account',
    signUp: 'Create new account',
    googleSignIn: 'Continue with Google',
    phoneSignIn: 'Continue with Phone',
    phoneNumber: 'Phone Number',
    enterPhone: 'Enter your phone number',
    sendOTP: 'Send OTP',
    enterOTP: 'Enter OTP',
    otpSent: 'OTP sent to your phone',
    verify: 'Verify',
    newUser: "Don't have an account?",
    existingUser: 'Already have an account?',
    signUpLink: 'Sign up',
    signInLink: 'Sign in',
    
    // DigiLocker
    digiLockerTitle: 'DigiLocker Verification Required',
    digiLockerDesc: 'To ensure secure access and compliance, please link your PAN card through DigiLocker.',
    whyDigiLocker: 'Why DigiLocker?',
    secureStorage: 'Secure document storage by Government of India',
    instantVerification: 'Instant PAN card verification',
    paperlessKYC: 'Paperless KYC process',
    dataProtection: 'Complete data protection & privacy',
    linkPAN: 'Link PAN Card in DigiLocker',
    verificationSteps: 'Verification Steps:',
    step1: '1. Open DigiLocker app/website',
    step2: '2. Login with your Aadhaar',
    step3: '3. Add your PAN card',
    step4: '4. Return to CreditSakhi',
    alreadyLinked: 'Already linked your PAN?',
    continueApp: 'Continue to App',
    skipForNow: 'Skip for now',
    
    // Dashboard
    dashboardTitle: 'Women Empowerment Hub',
    dashboardSubtitle: 'Financial Independence Dashboard',
    welcomeMessage: 'Welcome back, Priya! 👋',
    journeyMessage: 'Your journey to financial independence continues here',
    
    // Features
    financialAnalysis: 'Financial Analysis',
    financialAnalysisDesc: 'Track your expenditure, savings, and gains with detailed insights',
    loanGenerator: 'Loan Generator',
    loanGeneratorDesc: 'Check eligibility and get personalized loan recommendations',
    governmentSchemes: 'Government Schemes',
    governmentSchemesDesc: 'Discover available schemes based on your state and needs',
    shgCommunity: 'SHG Community',
    shgCommunityDesc: 'Connect with Self Help Groups and join mentorship circles',
    msmeKnowledge: 'MSME Knowledge Hub',
    msmeKnowledgeDesc: 'Learn about MSME registration and government benefits',
    navigationGuide: 'App Navigation Guide',
    navigationGuideDesc: 'Get mini-tutorials and learn how to use all features',
    exploreNow: 'Explore Now',
    
    // Stats
    thisMonth: 'This Month',
    totalSavings: 'Total Savings',
    creditScore: 'Credit Score',
    excellent: 'Excellent',
    activeSchemes: 'Active Schemes',
    governmentBenefits: 'Government Benefits',
    
    // Profile
    profile: 'Profile',
    notifications: 'Notifications',
    settings: 'Settings',
    announcements: 'Announcements',
    logout: 'Logout',
    
    // Chatbot
    chatbotTitle: 'AI Assistant',
    chatbotPlaceholder: 'Ask me anything...',
    findSchemes: 'Find government schemes',
    checkEligibility: 'Check loan eligibility',
    msmeHelp: 'MSME registration help',
    connectSHG: 'Connect with SHGs'
  },
  hi: {
    // Common
    appName: 'क्रेडिटसखी',
    subtitle: 'वित्तीय स्वतंत्रता के माध्यम से महिलाओं को सशक्त बनाना',
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    close: 'बंद करें',
    back: 'वापस',
    next: 'अगला',
    save: 'सहेजें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    
    // Login
    welcomeBack: 'वापस स्वागत है',
    signIn: 'अपने खाते में साइन इन करें',
    signUp: 'नया खाता बनाएं',
    googleSignIn: 'Google के साथ जारी रखें',
    phoneSignIn: 'फोन के साथ जारी रखें',
    phoneNumber: 'फोन नंबर',
    enterPhone: 'अपना फोन नंबर दर्ज करें',
    sendOTP: 'OTP भेजें',
    enterOTP: 'OTP दर्ज करें',
    otpSent: 'आपके फोन पर OTP भेजा गया',
    verify: 'सत्यापित करें',
    newUser: 'खाता नहीं है?',
    existingUser: 'पहले से खाता है?',
    signUpLink: 'साइन अप करें',
    signInLink: 'साइन इन करें',
    
    // DigiLocker
    digiLockerTitle: 'डिजिलॉकर सत्यापन आवश्यक',
    digiLockerDesc: 'सुरक्षित पहुंच और अनुपालन सुनिश्चित करने के लिए, कृपया डिजिलॉकर के माध्यम से अपना पैन कार्ड लिंक करें।',
    whyDigiLocker: 'डिजिलॉकर क्यों?',
    secureStorage: 'भारत सरकार द्वारा सुरक्षित दस्तावेज भंडारण',
    instantVerification: 'तत्काल पैन कार्ड सत्यापन',
    paperlessKYC: 'कागज रहित केवाईसी प्रक्रिया',
    dataProtection: 'पूर्ण डेटा सुरक्षा और गोपनीयता',
    linkPAN: 'डिजिलॉकर में पैन कार्ड लिंक करें',
    verificationSteps: 'सत्यापन चरण:',
    step1: '1. डिजिलॉकर ऐप/वेबसाइट खोलें',
    step2: '2. अपने आधार से लॉगिन करें',
    step3: '3. अपना पैन कार्ड जोड़ें',
    step4: '4. क्रेडिटसखी पर वापस आएं',
    alreadyLinked: 'पहले से ही अपना पैन लिंक किया है?',
    continueApp: 'ऐप पर जारी रखें',
    skipForNow: 'अभी के लिए छोड़ें',
    
    // Dashboard
    dashboardTitle: 'महिला सशक्तिकरण केंद्र',
    dashboardSubtitle: 'वित्तीय स्वतंत्रता डैशबोर्ड',
    welcomeMessage: 'वापस स्वागत है, प्रिया! 👋',
    journeyMessage: 'वित्तीय स्वतंत्रता की आपकी यात्रा यहाँ जारी है',
    
    // Features
    financialAnalysis: 'वित्तीय विश्लेषण',
    financialAnalysisDesc: 'विस्तृत अंतर्दृष्टि के साथ अपने खर्च, बचत और लाभ को ट्रैक करें',
    loanGenerator: 'लोन जेनरेटर',
    loanGeneratorDesc: 'पात्रता जांचें और व्यक्तिगत लोन सिफारिशें प्राप्त करें',
    governmentSchemes: 'सरकारी योजनाएं',
    governmentSchemesDesc: 'अपने राज्य और आवश्यकताओं के आधार पर उपलब्ध योजनाएं खोजें',
    shgCommunity: 'एसएचजी समुदाय',
    shgCommunityDesc: 'स्वयं सहायता समूहों से जुड़ें और मेंटरशिप सर्कल में शामिल हों',
    msmeKnowledge: 'एमएसएमई ज्ञान केंद्र',
    msmeKnowledgeDesc: 'एमएसएमई पंजीकरण और सरकारी लाभों के बारे में जानें',
    navigationGuide: 'ऐप नेवीगेशन गाइड',
    navigationGuideDesc: 'मिनी-ट्यूटोरियल प्राप्त करें और सभी सुविधाओं का उपयोग करना सीखें',
    exploreNow: 'अभी एक्सप्लोर करें',
    
    // Stats
    thisMonth: 'इस महीने',
    totalSavings: 'कुल बचत',
    creditScore: 'क्रेडिट स्कोर',
    excellent: 'उत्कृष्ट',
    activeSchemes: 'सक्रिय योजनाएं',
    governmentBenefits: 'सरकारी लाभ',
    
    // Profile
    profile: 'प्रोफ़ाइल',
    notifications: 'सूचनाएं',
    settings: 'सेटिंग्स',
    announcements: 'घोषणाएं',
    logout: 'लॉगआउट',
    
    // Chatbot
    chatbotTitle: 'एआई सहायक',
    chatbotPlaceholder: 'मुझसे कुछ भी पूछें...',
    findSchemes: 'सरकारी योजनाएं खोजें',
    checkEligibility: 'लोन पात्रता जांचें',
    msmeHelp: 'एमएसएमई पंजीकरण सहायता',
    connectSHG: 'एसएचजी से जुड़ें'
  },
  te: {
    // Common
    appName: 'క్రెడిట్‌సఖీ',
    subtitle: 'ఆర్థిక స్వేచ్ఛ ద్వారా మహిళలను శక్తివంతం చేయడం',
    language: 'భాష',
    selectLanguage: 'భాష ఎంచుకోండి',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయం',
    cancel: 'రద్దు చేయండి',
    confirm: 'నిర్ధారించండి',
    close: 'మూసివేయండి',
    back: 'వెనుకకు',
    next: 'తరువాత',
    save: 'సేవ్ చేయండి',
    edit: 'సవరించండి',
    delete: 'తొలగించండి',
    
    // Login
    welcomeBack: 'తిరిగి స్వాగతం',
    signIn: 'మీ ఖాతాలోకి సైన్ ఇన్ చేయండి',
    signUp: 'కొత్త ఖాతా సృష్టించండి',
    googleSignIn: 'Google తో కొనసాగించండి',
    phoneSignIn: 'ఫోన్ తో కొనసాగించండి',
    phoneNumber: 'ఫోన్ నంబర్',
    enterPhone: 'మీ ఫోన్ నంబర్ నమోదు చేయండి',
    sendOTP: 'OTP పంపండి',
    enterOTP: 'OTP నమోదు చేయండి',
    otpSent: 'మీ ఫోన్‌కు OTP పంపబడింది',
    verify: 'ధృవీకరించండి',
    newUser: 'ఖాతా లేదా?',
    existingUser: 'ఇప్పటికే ఖాతా ఉందా?',
    signUpLink: 'సైన్ అప్ చేయండి',
    signInLink: 'సైన్ ఇన్ చేయండి',
    
    // DigiLocker
    digiLockerTitle: 'డిజిలాకర్ ధృవీకరణ అవసరం',
    digiLockerDesc: 'సురక్షిత యాక్సెస్ మరియు కంప్లయెన్స్ కోసం, దయచేసి డిజిలాకర్ ద్వారా మీ PAN కార్డ్‌ను లింక్ చేయండి।',
    whyDigiLocker: 'డిజిలాకర్ ఎందుకు?',
    secureStorage: 'భారత ప్రభుత్వం సురక్షిత పత్రాల నిల్వ',
    instantVerification: 'తక్షణ PAN కార్డ్ ధృవీకరణ',
    paperlessKYC: 'కాగితం లేని KYC ప్రక్రియ',
    dataProtection: 'పూర్తి డేటా రక్షణ & గోప్యత',
    linkPAN: 'డిజిలాకర్‌లో PAN కార్డ్ లింక్ చేయండి',
    verificationSteps: 'ధృవీకరణ దశలు:',
    step1: '1. డిజిలాకర్ యాప్/వెబ్‌సైట్ తెరవండి',
    step2: '2. మీ ఆధార్‌తో లాగిన్ అవ్వండి',
    step3: '3. మీ PAN కార్డ్ జోడించండి',
    step4: '4. క్రెడిట్‌సఖీకి తిరిగి రండి',
    alreadyLinked: 'ఇప్పటికే మీ PAN లింక్ చేశారా?',
    continueApp: 'యాప్‌కు కొనసాగండి',
    skipForNow: 'ఇప్పుడు దాటవేయండి',
    
    // Dashboard
    dashboardTitle: 'మహిళా సాధికారత కేంద్రం',
    dashboardSubtitle: 'ఆర్థిక స్వాతంత్య్ డాష్‌బోర్డ్',
    welcomeMessage: 'తిరిగి స్వాగతం, ప్రియా! 👋',
    journeyMessage: 'ఆర్థిక స్వాతంత్య్ం వైపు మీ ప్రయాణం ఇక్కడ కొనసాగుతుంది',
    
    // Features
    financialAnalysis: 'ఆర్థిక విశ్లేషణ',
    financialAnalysisDesc: 'వివరణాత్మక అంతర్దృష్టులతో మీ ఖర్చులు, పొదుపులు మరియు లాభాలను ట్రాక్ చేయండి',
    loanGenerator: 'లోన్ జెనరేటర్',
    loanGeneratorDesc: 'అర్హతను తనిఖీ చేసి వ్యక్తిగతీకరించిన లోన్ సిఫార్సులను పొందండి',
    governmentSchemes: 'ప్రభుత్వ పథకాలు',
    governmentSchemesDesc: 'మీ రాష్ట్రం మరియు అవసరాల ఆధారంగా అందుబాటులో ఉన్న పథకాలను కనుగొనండి',
    shgCommunity: 'SHG కమ్యూనిటీ',
    shgCommunityDesc: 'స్వయం సహాయక సంఘాలతో కనెక్ట్ అవ్వండి మరియు మెంటర్‌షిప్ సర్కిల్‌లలో చేరండి',
    msmeKnowledge: 'MSME జ్ఞాన కేంద్రం',
    msmeKnowledgeDesc: 'MSME నమోదు మరియు ప్రభుత్వ ప్రయోజనాల గురించి తెలుసుకోండి',
    navigationGuide: 'యాప్ నావిగేషన్ గైడ్',
    navigationGuideDesc: 'మినీ-ట్యుటోరియల్స్ పొందండి మరియు అన్ని ఫీచర్లను ఎలా ఉపయోగించాలో నేర్చుకోండి',
    exploreNow: 'ఇప్పుడే అన్వేషించండి',
    
    // Stats
    thisMonth: 'ఈ నెల',
    totalSavings: 'మొత్తం పొదుపులు',
    creditScore: 'క్రెడిట్ స్కోర్',
    excellent: 'అద్భుతమైన',
    activeSchemes: 'క్రియాశీల పథకాలు',
    governmentBenefits: 'ప్రభుత్వ ప్రయోజనాలు',
    
    // Profile
    profile: 'ప్రొఫైల్',
    notifications: 'నోటిఫికేషన్స్',
    settings: 'సెట్టింగ్స్',
    announcements: 'ప్రకటనలు',
    logout: 'లాగ్ అవుట్',
    
    // Chatbot
    chatbotTitle: 'AI అసిస్టెంట్',
    chatbotPlaceholder: 'నన్ను ఏదైనా అడగండి...',
    findSchemes: 'ప్రభుత్వ పథకాలను కనుగొనండి',
    checkEligibility: 'లోన్ అర్హతను తనిఖీ చేయండి',
    msmeHelp: 'MSME నమోదు సహాయం',
    connectSHG: 'SHGలతో కనెక్ట్ అవ్వండి'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
