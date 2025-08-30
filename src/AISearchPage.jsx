import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Sparkles,
  Home,
  Search,
  User,
  Users,
  Mic,
  Globe,
  ChevronDown,
} from "lucide-react";
import {
  getDataRanges,
  parsePriceRequirement,
  parseBedroomRequirement,
} from "@/data/properties.js";

const AISearchPage = ({ setCurrentView }) => {
  const [inputText, setInputText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // Language configurations
  const languages = {
    en: { name: "English", flag: "🇺🇸" },
    zh: { name: "中文", flag: "🇨🇳" },
    es: { name: "Español", flag: "🇪🇸" },
    fr: { name: "Français", flag: "🇫🇷" },
    de: { name: "Deutsch", flag: "🇩🇪" },
    ja: { name: "日本語", flag: "🇯🇵" },
    ko: { name: "한국어", flag: "🇰🇷" },
    pt: { name: "Português", flag: "🇵🇹" },
    it: { name: "Italiano", flag: "🇮🇹" },
    ru: { name: "Русский", flag: "🇷🇺" },
    ar: { name: "العربية", flag: "🇸🇦" },
    hi: { name: "हिन्दी", flag: "🇮🇳" },
  };

  // Translations for different languages
  const translations = {
    en: {
      title: "AI Property Search",
      subtitle: "Describe what you're looking for",
      placeholder:
        "I'm looking for a 2-bedroom apartment in Brooklyn under $2000 with good public transport access, pet-friendly, and preferably with a balcony or outdoor space...",
      tip: "Tip: Be specific about location, budget, amenities, and lifestyle preferences",
      quickSuggestions: "Quick suggestions:",
      howItWorks: "How AI Search Works",
      features: [
        "Understands natural language descriptions",
        "Matches your lifestyle and preferences",
        "Considers location, commute, and amenities",
        "Learns from your swipe history",
      ],
      suggestions: [
        "1-bedroom apartment under $3000",
        "2-bedroom apartment in Brooklyn under $4000",
        "Pet-friendly 1-bedroom with balcony",
        "3-bedroom apartment in Manhattan",
        "Modern apartment with gym access",
        "Quiet neighborhood, close to coffee shops",
      ],
    },
    zh: {
      title: "AI房产搜索",
      subtitle: "描述您要找的房子",
      placeholder:
        "我在寻找布鲁克林的一个两居室公寓，价格在2000美元以下，交通便利，允许养宠物，最好有阳台或户外空间...",
      tip: "提示：请具体说明位置、预算、设施和生活方式偏好",
      quickSuggestions: "快速建议：",
      howItWorks: "AI搜索工作原理",
      features: [
        "理解自然语言描述",
        "匹配您的生活方式和偏好",
        "考虑位置、通勤和设施",
        "从您的滑动历史中学习",
      ],
      suggestions: [
        "3000美元以下的一居室公寓",
        "布鲁克林4000美元以下的两居室公寓",
        "允许养宠物的一居室带阳台",
        "曼哈顿的三居室公寓",
        "带健身房通道的现代公寓",
        "安静社区，靠近咖啡店",
      ],
    },
    es: {
      title: "Búsqueda de Propiedades IA",
      subtitle: "Describe lo que estás buscando",
      placeholder:
        "Busco un apartamento de 2 habitaciones en Brooklyn por menos de $2000 con buen acceso al transporte público, que permita mascotas, y preferiblemente con balcón o espacio exterior...",
      tip: "Consejo: Sé específico sobre ubicación, presupuesto, comodidades y preferencias de estilo de vida",
      quickSuggestions: "Sugerencias rápidas:",
      howItWorks: "Cómo Funciona la Búsqueda IA",
      features: [
        "Entiende descripciones en lenguaje natural",
        "Coincide con tu estilo de vida y preferencias",
        "Considera ubicación, transporte y comodidades",
        "Aprende de tu historial de deslizamientos",
      ],
      suggestions: [
        "Apartamento de 1 habitación bajo $3000",
        "Apartamento de 2 habitaciones en Brooklyn bajo $4000",
        "1 habitación que permita mascotas con balcón",
        "Apartamento de 3 habitaciones en Manhattan",
        "Apartamento moderno con acceso a gimnasio",
        "Barrio tranquilo, cerca de cafeterías",
      ],
    },
    fr: {
      title: "Recherche de Propriétés IA",
      subtitle: "Décrivez ce que vous cherchez",
      placeholder:
        "Je cherche un appartement de 2 chambres à Brooklyn sous 2000$ avec un bon accès aux transports en commun, acceptant les animaux, et de préférence avec un balcon ou un espace extérieur...",
      tip: "Conseil: Soyez spécifique sur l'emplacement, le budget, les équipements et les préférences de style de vie",
      quickSuggestions: "Suggestions rapides:",
      howItWorks: "Comment Fonctionne la Recherche IA",
      features: [
        "Comprend les descriptions en langage naturel",
        "Correspond à votre style de vie et préférences",
        "Considère l'emplacement, les trajets et équipements",
        "Apprend de votre historique de glissements",
      ],
      suggestions: [
        "Appartement 1 chambre sous 3000$",
        "Appartement 2 chambres à Brooklyn sous 4000$",
        "1 chambre acceptant les animaux avec balcon",
        "Appartement 3 chambres à Manhattan",
        "Appartement moderne avec accès au gym",
        "Quartier calme, près des cafés",
      ],
    },
    de: {
      title: "KI-Immobiliensuche",
      subtitle: "Beschreiben Sie, wonach Sie suchen",
      placeholder:
        "Ich suche eine 2-Zimmer-Wohnung in Brooklyn unter 2000$ mit guter Anbindung an öffentliche Verkehrsmittel, haustierfreundlich und vorzugsweise mit Balkon oder Außenbereich...",
      tip: "Tipp: Seien Sie spezifisch bezüglich Standort, Budget, Ausstattung und Lebensstil-Präferenzen",
      quickSuggestions: "Schnelle Vorschläge:",
      howItWorks: "Wie die KI-Suche funktioniert",
      features: [
        "Versteht natürliche Sprachbeschreibungen",
        "Passt zu Ihrem Lebensstil und Präferenzen",
        "Berücksichtigt Standort, Pendeln und Ausstattung",
        "Lernt aus Ihrer Wisch-Historie",
      ],
      suggestions: [
        "1-Zimmer-Wohnung unter 3000$",
        "Haustierfreundliche 1-Zimmer-Wohnung mit Balkon",
        "2-Zimmer-Wohnung in Brooklyn unter 4000$",
        "3-Zimmer-Wohnung in Manhattan",
        "Moderne Wohnung mit Fitnessstudio-Zugang",
        "Ruhige Nachbarschaft, in der Nähe von Cafés",
      ],
    },
    ja: {
      title: "AI物件検索",
      subtitle: "お探しの物件を説明してください",
      placeholder:
        "ブルックリンの2ベッドルームアパートを探しています。2000ドル以下で、公共交通機関へのアクセスが良く、ペット可で、できればバルコニーや屋外スペースがある物件...",
      tip: "ヒント：場所、予算、設備、ライフスタイルの好みを具体的に説明してください",
      quickSuggestions: "クイック提案：",
      howItWorks: "AI検索の仕組み",
      features: [
        "自然言語の説明を理解します",
        "あなたのライフスタイルと好みにマッチします",
        "場所、通勤、設備を考慮します",
        "スワイプ履歴から学習します",
      ],
      suggestions: [
        "3000ドル以下の1ベッドルームアパート",
        "ペット可の1ベッドルーム、バルコニー付き",
        "ブルックリンの4000ドル以下の2ベッドルームアパート",
        "マンハッタンの3ベッドルームアパート",
        "ジムアクセス付きのモダンアパート",
        "静かな近隣、カフェに近い",
      ],
    },
    ko: {
      title: "AI 부동산 검색",
      subtitle: "찾고 계신 것을 설명해주세요",
      placeholder:
        "브루클린의 2베드룸 아파트를 찾고 있습니다. 2000달러 이하로, 대중교통 접근성이 좋고, 애완동물 허용이며, 바람직하게는 발코니나 야외 공간이 있는 곳...",
      tip: "팁: 위치, 예산, 편의시설, 라이프스타일 선호도를 구체적으로 설명해주세요",
      quickSuggestions: "빠른 제안:",
      howItWorks: "AI 검색 작동 방식",
      features: [
        "자연어 설명을 이해합니다",
        "당신의 라이프스타일과 선호도에 맞춥니다",
        "위치, 통근, 편의시설을 고려합니다",
        "스와이프 기록에서 학습합니다",
      ],
      suggestions: [
        "3000달러 이하 1베드룸 아파트",
        "애완동물 허용 1베드룸, 발코니 포함",
        "브루클린 4000달러 이하 2베드룸 아파트",
        "맨하튼 3베드룸 아파트",
        "헬스장 접근이 가능한 모던 아파트",
        "조용한 동네, 카페 근처",
      ],
    },
    pt: {
      title: "Busca de Propriedades IA",
      subtitle: "Descreva o que você está procurando",
      placeholder:
        "Estou procurando um apartamento de 2 quartos no Brooklyn por menos de $2000 com bom acesso ao transporte público, que aceite animais, e de preferência com varanda ou espaço externo...",
      tip: "Dica: Seja específico sobre localização, orçamento, comodidades e preferências de estilo de vida",
      quickSuggestions: "Sugestões rápidas:",
      howItWorks: "Como Funciona a Busca IA",
      features: [
        "Entende descrições em linguagem natural",
        "Combina com seu estilo de vida e preferências",
        "Considera localização, deslocamento e comodidades",
        "Aprende com seu histórico de deslizamentos",
      ],
      suggestions: [
        "Apartamento de 1 quarto sob $3000",
        "1 quarto que aceita animais com varanda",
        "Apartamento de 2 quartos no Brooklyn sob $4000",
        "Apartamento de 3 quartos em Manhattan",
        "Apartamento moderno com acesso à academia",
        "Bairro tranquilo, perto de cafés",
      ],
    },
    it: {
      title: "Ricerca Immobiliare IA",
      subtitle: "Descrivi quello che stai cercando",
      placeholder:
        "Sto cercando un appartamento di 2 camere a Brooklyn sotto i $2000 con buon accesso ai trasporti pubblici, che accetti animali, e preferibilmente con balcone o spazio esterno...",
      tip: "Suggerimento: Sii specifico su posizione, budget, servizi e preferenze di stile di vita",
      quickSuggestions: "Suggerimenti rapidi:",
      howItWorks: "Come Funziona la Ricerca IA",
      features: [
        "Comprende descrizioni in linguaggio naturale",
        "Corrisponde al tuo stile di vita e preferenze",
        "Considera posizione, spostamenti e servizi",
        "Impara dalla tua cronologia di scorrimento",
      ],
      suggestions: [
        "Appartamento di 1 camera sotto $3000",
        "1 camera che accetta animali con balcone",
        "Appartamento di 2 camere a Brooklyn sotto $4000",
        "Appartamento di 3 camere a Manhattan",
        "Appartamento moderno con accesso alla palestra",
        "Quartiere tranquillo, vicino ai caffè",
      ],
    },
    ru: {
      title: "ИИ Поиск Недвижимости",
      subtitle: "Опишите, что вы ищете",
      placeholder:
        "Я ищу 2-комнатную квартиру в Бруклине за менее чем $2000 с хорошим доступом к общественному транспорту, где разрешены домашние животные, и желательно с балконом или внешним пространством...",
      tip: "Совет: Будьте конкретны относительно местоположения, бюджета, удобств и предпочтений образа жизни",
      quickSuggestions: "Быстрые предложения:",
      howItWorks: "Как Работает ИИ Поиск",
      features: [
        "Понимает описания на естественном языке",
        "Соответствует вашему образу жизни и предпочтениям",
        "Учитывает местоположение, поездки и удобства",
        "Учится из вашей истории свайпов",
      ],
      suggestions: [
        "1-комнатная квартира под $3000",
        "1-комнатная с животными с балконом",
        "2-комнатная квартира в Бруклине под $4000",
        "3-комнатная квартира в Манхэттене",
        "Современная квартира с доступом к тренажерному залу",
        "Тихий район, рядом с кафе",
      ],
    },
    ar: {
      title: "البحث العقاري بالذكاء الاصطناعي",
      subtitle: "اوصف ما تبحث عنه",
      placeholder:
        "أبحث عن شقة من غرفتين في بروكلين بأقل من 2000 دولار مع وصول جيد للنقل العام، تسمح بالحيوانات الأليفة، ويفضل أن يكون لها شرفة أو مساحة خارجية...",
      tip: "نصيحة: كن محدداً حول الموقع والميزانية والمرافق وتفضيلات نمط الحياة",
      quickSuggestions: "اقتراحات سريعة:",
      howItWorks: "كيف يعمل البحث بالذكاء الاصطناعي",
      features: [
        "يفهم الأوصاف باللغة الطبيعية",
        "يتطابق مع نمط حياتك وتفضيلاتك",
        "يأخذ في الاعتبار الموقع والتنقل والمرافق",
        "يتعلم من تاريخ التمرير الخاص بك",
      ],
      suggestions: [
        "شقة من غرفة واحدة تحت 3000 دولار",
        "غرفة واحدة تسمح بالحيوانات الأليفة مع شرفة",
        "شقة من غرفتين في بروكلين تحت 4000 دولار",
        "شقة من ثلاث غرف في مانهاتن",
        "شقة حديثة مع وصول إلى الصالة الرياضية",
        "حي هادئ، قريب من المقاهي",
      ],
    },
    hi: {
      title: "AI संपत्ति खोज",
      subtitle: "बताएं कि आप क्या खोज रहे हैं",
      placeholder:
        "मैं ब्रुकलिन में $2000 से कम में 2 बेडरूम अपार्टमेंट खोज रहा हूं जिसमें सार्वजनिक परिवहन की अच्छी पहुंच हो, पालतू जानवरों की अनुमति हो, और अधिमानतः बालकनी या बाहरी स्थान हो...",
      tip: "सुझाव: स्थान, बजट, सुविधाओं और जीवनशैली वरीयताओं के बारे में विशिष्ट रहें",
      quickSuggestions: "त्वरित सुझाव:",
      howItWorks: "AI खोज कैसे काम करती है",
      features: [
        "प्राकृतिक भाषा विवरणों को समझती है",
        "आपकी जीवनशैली और वरीयताओं से मेल खाती है",
        "स्थान, आवागमन और सुविधाओं पर विचार करती है",
        "आपके स्वाइप इतिहास से सीखती है",
      ],
      suggestions: [
        "$3000 से कम में 1 बेडरूम अपार्टमेंट",
        "बालकनी के साथ पालतू जानवरों की अनुमति वाला 1 बेडरूम",
        "$4000 से कम में ब्रुकलिन में 2 बेडरूम अपार्टमेंट",
        "मैनहट्टन में 3 बेडरूम अपार्टमेंट",
        "जिम की पहुंच के साथ आधुनिक अपार्टमेंट",
        "शांत पड़ोस, कैफे के पास",
      ],
    },
  };

  const t = translations[currentLanguage];

  // Bottom Navigation Component (Mobile app container)
  const BottomNav = ({ currentView, setCurrentView }) => (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "home" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Discover</span>
        </button>
        <button
          onClick={() => setCurrentView("property-list")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "property-list"
              ? "text-purple-600"
              : "text-gray-400"
          }`}
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Browse</span>
        </button>
        <button
          onClick={() => setCurrentView("llm-input")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "llm-input" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">AI Search</span>
        </button>
        <button
          onClick={() => setCurrentView("forum")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "forum" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Users className="w-5 h-5 mb-1" />
          <span className="text-xs">Forum</span>
        </button>
        <button
          onClick={() => setCurrentView("profile")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "profile" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );

  // Handle voice input simulation
  const handleVoiceInput = () => {
    setIsVoiceRecording(!isVoiceRecording);
    // Simulate voice recording
    setTimeout(() => {
      setIsVoiceRecording(false);
      // Simulate voice-to-text result
      setInputText(
        (prev) =>
          prev +
          " " +
          t.suggestions[Math.floor(Math.random() * t.suggestions.length)]
      );
    }, 2000);
  };

  // Handle language change
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setShowLanguageMenu(false);
  };

  // Validate search criteria against available data
  const validateSearchCriteria = (query) => {
    const dataRanges = getDataRanges();
    const maxPrice = parsePriceRequirement(query);
    const requiredBedrooms = parseBedroomRequirement(query);

    let errors = [];

    if (maxPrice !== null && maxPrice < dataRanges.minPrice) {
      errors.push(
        `Your budget of $${maxPrice.toLocaleString()} is below our minimum price of $${dataRanges.minPrice.toLocaleString()}`
      );
    }

    if (
      requiredBedrooms !== null &&
      !dataRanges.availableBedrooms.includes(requiredBedrooms)
    ) {
      errors.push(
        `We don't have ${requiredBedrooms}-bedroom properties. Available: ${dataRanges.availableBedrooms.join(
          ", "
        )} bedrooms`
      );
    }

    return { isValid: errors.length === 0, errors, dataRanges };
  };

  // Handle AI search with filtering
  const handleSearch = () => {
    if (!inputText.trim()) return;

    // Validate search criteria first
    const validation = validateSearchCriteria(inputText);

    if (!validation.isValid) {
      alert(
        `Search Error: ${validation.errors.join(
          ". "
        )}\n\nAvailable options:\n- Price range: $${validation.dataRanges.minPrice.toLocaleString()} - $${validation.dataRanges.maxPrice.toLocaleString()}\n- Bedrooms: ${validation.dataRanges.availableBedrooms.join(
          ", "
        )}\n- Locations: ${validation.dataRanges.availableLocations.join(", ")}`
      );
      return;
    }

    setIsSearching(true);
    // Simulate AI search and filtering
    setTimeout(() => {
      setIsSearching(false);
      // Store search criteria for filtering
      const searchCriteria = {
        query: inputText,
        language: currentLanguage,
        timestamp: Date.now(),
      };
      localStorage.setItem("aiSearchCriteria", JSON.stringify(searchCriteria));
      // Navigate to filtered SwipeRight page
      setCurrentView("home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile App Container */}
      <div
        className="w-full max-w-sm bg-white shadow-2xl relative overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{t.title}</h1>
                <p className="text-sm text-gray-500">{t.subtitle}</p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">
                  {languages[currentLanguage].flag}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        currentLanguage === code
                          ? "bg-purple-50 text-purple-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 pb-32">
          <div className="mb-6">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.placeholder}
                className="w-full h-32 p-4 pr-20 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm leading-relaxed"
              />

              {/* Voice Input Button */}
              <button
                onClick={handleVoiceInput}
                disabled={isVoiceRecording}
                className={`absolute bottom-3 right-14 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isVoiceRecording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSearch}
                disabled={!inputText.trim() || isSearching}
                className="absolute bottom-3 right-3 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2">{t.tip}</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="text-sm font-semibold text-gray-600 mb-3">
              {t.quickSuggestions}
            </div>
            {t.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputText(suggestion)}
                className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-purple-200">
                    <MessageCircle className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {suggestion}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.howItWorks}</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav currentView="llm-input" setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default AISearchPage;
