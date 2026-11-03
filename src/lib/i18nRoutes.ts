import { Currency } from '@/context/CurrencyContext';

export interface I18nFaqItem {
  question: string;
  answer: string;
}

export interface I18nRouteConfig {
  slug: string;
  hreflang: string;
  ogLocale: string;
  langCode: string;
  googleCode: string;
  currency: Currency;
  currencySymbol: string;
  flag: string;
  nativeName: string;
  brandTranslation: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  searchPlaceholder: string;
  seoSectionTitle: string;
  seoSectionBody: string;
  keywords: string[];
  faqItems: I18nFaqItem[];
}

export const I18N_SEO_ROUTES: Record<string, I18nRouteConfig> = {
  en: {
    slug: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    langCode: 'en-US',
    googleCode: 'en',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    nativeName: 'English (US / Global $)',
    brandTranslation: 'A Good Gift',
    title: 'A Good Gift 【2026】 What to Gift? Best Gift Ideas & Original Presents',
    description:
      'Looking for a good gift? Discover the best original gift ideas for babies, kids, teens, and adults in USD ($). Smart gift finder & WhatsApp group voting.',
    h1: 'Best Gift Ideas: What to Gift in 2026?',
    subtitle:
      'Type who you are buying for or what they love. Our smart gift finder recommends verified Amazon gift ideas by age, hobby, and budget in USD ($).',
    searchPlaceholder: 'E.g.: Gift for my gamer boyfriend, Star Wars, coffee lover, 6 year old girl...',
    seoSectionTitle: 'What to Gift? Ultimate Guide to Original Gift Ideas for Every Age',
    seoSectionBody:
      'Finding a good gift (Un Buen Regalo) for a birthday, anniversary, Secret Santa, Christmas, or baby shower is effortless when you filter by age and real interests. Browse curated presents with 4.5+ star ratings in USD ($), compare ideas with friends using our free WhatsApp Group Gift Voting tool, write an official Letter to Santa, or explore specialized hubs for GTA 6 / GTA VI fans, gamers, bikers, and coffee lovers.',
    keywords: [
      'a good gift',
      'what to gift',
      'best gift ideas',
      'original gifts',
      'gift ideas 2026',
      'what to buy for boyfriend',
      'what to buy for girlfriend',
      'birthday gift ideas',
      'secret santa gifts',
      'group gift voting',
      'gta 6 gifts',
      'un buen regalo english',
    ],
    faqItems: [
      {
        question: 'How do I find a good gift for someone who has everything?',
        answer:
          'Use our smart search bar or AI Gift Assistant to filter by hobbies (gaming, coffee barista, motorcycles, pets, GTA VI) and budget in USD ($) or EUR (€). You can also create a free group poll and let friends vote on WhatsApp.',
      },
      {
        question: 'Can I view gift prices in US Dollars ($ USD) and Euros (€ EUR)?',
        answer:
          'Yes! Our platform automatically displays prices in USD ($) on the English (US/Global) edition and allows one-click switching between $ USD and € EUR at any time in the top selector.',
      },
      {
        question: 'How does the WhatsApp Group Gift Voting work?',
        answer:
          'Add 2 or more gift ideas from our catalog to the voting drawer, enter the recipient name, and share the generated link on WhatsApp so friends and family can vote without registering.',
      },
    ],
  },
  'en-gb': {
    slug: 'en-gb',
    hreflang: 'en-GB',
    ogLocale: 'en_GB',
    langCode: 'en-GB',
    googleCode: 'en',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇬🇧',
    nativeName: 'British English (UK)',
    brandTranslation: 'A Good Gift UK',
    title: 'A Good Gift UK 【2026】 What to Buy? Original Present Ideas & Group Voting',
    description:
      'Not sure what present to buy? Discover original gift ideas for babies, children, teenagers, and adults with real reviews and WhatsApp group gift voting.',
    h1: 'Best Present Ideas UK: What to Buy in 2026?',
    subtitle:
      'Search by age, occasion, or hobby. Explore top-rated Amazon gift ideas for birthdays, Secret Santa, and Christmas with instant group voting.',
    searchPlaceholder: 'E.g.: Present for dad, gamer setup, barista coffee, 8 year old boy...',
    seoSectionTitle: 'What Present to Buy? Curated Gift Ideas by Age & Interest',
    seoSectionBody:
      'Whether you need a thoughtful Secret Santa present under €20, a milestone 18th birthday gift, or Montessori toys for newborns and toddlers, A Good Gift (Un Buen Regalo) brings together the highest-rated presents and a collaborative WhatsApp voting tool.',
    keywords: [
      'a good gift uk',
      'best present ideas',
      'what present to buy',
      'original presents',
      'secret santa gifts',
      'birthday presents for him',
      'birthday presents for her',
      'group gift poll',
    ],
    faqItems: [
      {
        question: 'What are the most popular presents in 2026?',
        answer:
          'Top-rated presents include Montessori wooden toys for toddlers, LEGO & board games for kids, PS5 & GTA VI gaming gear for teens, and espresso barista accessories for adults.',
      },
      {
        question: 'Can our group vote on a joint birthday or leaving present?',
        answer:
          'Yes, select your favourite gifts and open the Group Voting drawer to share a live poll link via WhatsApp.',
      },
    ],
  },
  'es-us': {
    slug: 'es-us',
    hreflang: 'es-US',
    ogLocale: 'es_MX',
    langCode: 'es-US',
    googleCode: 'es',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🌎',
    nativeName: 'Español (América / USD $)',
    brandTranslation: 'Un Buen Regalo ($ USD)',
    title: 'Un Buen Regalo 【2026】 ¿Qué Regalar? Ideas y Regalos Originales en Dólares ($)',
    description:
      '¿No sabes qué regalar? Encuentra en Un Buen Regalo las mejores ideas de regalo para bebés, niños, jóvenes y adultos con precios en dólares ($ USD) y votación en grupo.',
    h1: 'Ideas de Regalos Originales: ¿Qué Regalar en 2026? ($ USD)',
    subtitle:
      'Encuentra ideas de regalo verificadas en dólares ($ USD) para cumpleaños, amigo secreto, aniversario o Navidad, y vota en grupo por WhatsApp.',
    searchPlaceholder: 'Ej: Para mi novio gamer, cafeteras, niña de 6 años, regalo menos de $20...',
    seoSectionTitle: '¿Qué Regalar? Ideas de Regalo Originales en Dólares ($ USD)',
    seoSectionBody:
      'En la edición internacional en dólares ($ USD) de Un Buen Regalo puedes explorar cientos de ideas para regalar clasificadas por edad (de 0 meses a +18 años), presupuesto y aficiones, además de organizar votaciones grupales por WhatsApp para regalos de cumpleaños o amigo secreto.',
    keywords: [
      'un buen regalo',
      'que regalar',
      'ideas de regalo en dolares',
      'regalos originales',
      'regalos de cumpleanos',
      'regalos amigo secreto',
      'que regalar a mi novio',
      'que regalar a mi novia',
    ],
    faqItems: [
      {
        question: '¿Cómo ver todos los precios de los regalos en dólares ($ USD)?',
        answer:
          'Al entrar en esta edición internacional (/es-us), todos los precios del catálogo se muestran automáticamente en dólares estadounidenses ($ USD).',
      },
      {
        question: '¿Cómo funciona la votación de regalos para amigo secreto o cumpleaños?',
        answer:
          'Elige varios productos del catálogo, abre el panel de Votación en Grupo y comparte el enlace por WhatsApp para que tus amigos voten gratis.',
      },
    ],
  },
  de: {
    slug: 'de',
    hreflang: 'de',
    ogLocale: 'de_DE',
    langCode: 'de',
    googleCode: 'de',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇩🇪',
    nativeName: 'Deutsch (EUR €)',
    brandTranslation: 'Ein Gutes Geschenk',
    title: 'Ein Gutes Geschenk 【2026】 Was Schenken? Originelle Geschenkideen',
    description:
      'Du weißt nicht, was du schenken sollst? Entdecke bei Ein Gutes Geschenk (Un Buen Regalo) originelle Geschenkideen für Babys, Kinder, Teenager und Erwachsene.',
    h1: 'Die besten Geschenkideen: Was schenken 2026?',
    subtitle:
      'Gib ein, wem du eine Freude machen möchtest. Unser intelligenter Geschenkefinder zeigt dir sofort die besten Amazon-Geschenkideen nach Alter und Budget.',
    searchPlaceholder: 'Z. B.: Geschenk für Freund, Gaming, Kaffeeliebhaber, Mädchen 6 Jahre...',
    seoSectionTitle: 'Was Schenken? Der große Ratgeber für originelle Geschenkideen 2026',
    seoSectionBody:
      'Ob Geburtstag, Wichteln, Weihnachten oder Babyparty: Bei Ein Gutes Geschenk (Un Buen Regalo) findest du geprüfte Geschenkideen mit Top-Bewertungen für jedes Alter sowie unsere kostenlose Gruppenabstimmung per WhatsApp für gemeinsame Geschenke.',
    keywords: [
      'ein gutes geschenk',
      'was schenken',
      'geschenkideen',
      'originelle geschenke',
      'geburtstagsgeschenke',
      'wichtelgeschenke',
      'geschenke für männer',
      'geschenke für frauen',
      'geschenke für kinder',
    ],
    faqItems: [
      {
        question: 'Wie finde ich schnell ein gutes Geschenk für jedes Alter?',
        answer:
          'Nutze unsere Altersfilter (0–12 Monate bis 18+ Jahre), die Themensuche oder den KI-Geschenkeberater, um sofort passende Empfehlungen zu erhalten.',
      },
      {
        question: 'Wie funktioniert die Gruppenabstimmung für Geschenke?',
        answer:
          'Wähle mehrere Geschenkideen aus und teile den Abstimmungslink per WhatsApp, damit Freunde gemeinsam über das beste Geschenk abstimmen können.',
      },
    ],
  },
  fr: {
    slug: 'fr',
    hreflang: 'fr',
    ogLocale: 'fr_FR',
    langCode: 'fr',
    googleCode: 'fr',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇫🇷',
    nativeName: 'Français (EUR €)',
    brandTranslation: 'Un Bon Cadeau',
    title: 'Un Bon Cadeau 【2026】 Que Offrir ? Idées Cadeaux Originales pour Tous',
    description:
      'Vous ne savez pas quoi offrir ? Découvrez sur Un Bon Cadeau (Un Buen Regalo) les meilleures idées cadeaux pour bébés, enfants, ados et adultes avec vote en groupe.',
    h1: 'Idées Cadeaux Originales : Que Choisir et Offrir en 2026 ?',
    subtitle:
      'Indiquez pour qui vous cherchez un cadeau ou ses passions. Notre moteur intelligent sélectionne les meilleures idées cadeaux vérifiées en quelques secondes.',
    searchPlaceholder: 'Ex : Cadeau pour mon copain gamer, amateur de café, fille 6 ans...',
    seoSectionTitle: 'Que Offrir ? Guide des Meilleures Idées Cadeaux Originales par Âge',
    seoSectionBody:
      'Trouver un bon cadeau (Un Buen Regalo) pour un anniversaire, un Secret Santa, Noël ou une naissance devient simple grâce à notre classement par âge et par passion (Gaming, GTA 6, Motards, Café Barista) et notre outil gratuit de vote de cadeaux en groupe sur WhatsApp.',
    keywords: [
      'un bon cadeau',
      'que offrir',
      'idées cadeaux',
      'cadeau original',
      'idées cadeaux anniversaire',
      'cadeau homme',
      'cadeau femme',
      'cadeau enfant',
      'secret santa cadeau',
    ],
    faqItems: [
      {
        question: 'Comment trouver une idée cadeau originale rapidement ?',
        answer:
          'Filtrez par tranche d’âge (de 0-12 mois à +18 ans) ou par budget (<15 €, <20 €) et laissez notre assistant IA vous suggérer les cadeaux les mieux notés.',
      },
      {
        question: 'Peut-on voter en groupe sur WhatsApp pour un cadeau commun ?',
        answer:
          'Oui, ajoutez vos idées cadeaux au comparateur et partagez le lien sur WhatsApp pour que vos amis votent en temps réel.',
      },
    ],
  },
  it: {
    slug: 'it',
    hreflang: 'it',
    ogLocale: 'it_IT',
    langCode: 'it',
    googleCode: 'it',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇮🇹',
    nativeName: 'Italiano (EUR €)',
    brandTranslation: 'Un Buon Regalo',
    title: 'Un Buon Regalo 【2026】 Cosa Regalare? Idee Regalo Originali per Tutti',
    description:
      'Non sai cosa regalare? Scopri su Un Buon Regalo le migliori idee regalo originali per neonati, bambini, ragazzi e adulti con votazione di gruppo su WhatsApp.',
    h1: 'Idee Regalo Originali: Cosa Regalare nel 2026?',
    subtitle:
      'Scrivi per chi stai cercando un regalo o le sue passioni. Il nostro motore intelligente trova subito le migliori idee regalo verificate per ogni età e budget.',
    searchPlaceholder: 'Es: Regalo per fidanzato gamer, amante del caffè, bambina 6 anni...',
    seoSectionTitle: 'Cosa Regalare? Guida alle Idee Regalo Originali per Ogni Età',
    seoSectionBody:
      'Scegliere cosa regalare per un compleanno, laurea, Amico Segreto o Natale è facilissimo con Un Buon Regalo: esplora centinaia di idee regalo recensite con 4.5+ stelle e organizza sondaggi di gruppo su WhatsApp per i regali condivisi.',
    keywords: [
      'un buon regalo',
      'cosa regalare',
      'idee regalo',
      'regali originali',
      'idee regalo compleanno',
      'regalo uomo',
      'regalo donna',
      'regali bambini',
    ],
    faqItems: [
      {
        question: 'Come trovare un buon regalo per chi ha già tutto?',
        answer:
          'Esplora le nostre categorie specializzate (Gaming, GTA 6, Motociclisti, Caffè Barista, Animali) o usa il nostro Assistente IA per consigli su misura.',
      },
      {
        question: 'Come funziona la votazione di gruppo su WhatsApp?',
        answer:
          'Seleziona i regali candidati, crea il sondaggio gratuito in un clic e invia il link nel gruppo WhatsApp per votare insieme.',
      },
    ],
  },
  pt: {
    slug: 'pt',
    hreflang: 'pt',
    ogLocale: 'pt_PT',
    langCode: 'pt',
    googleCode: 'pt',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇵🇹',
    nativeName: 'Português (EUR € / USD $)',
    brandTranslation: 'Um Bom Presente',
    title: 'Um Bom Presente 【2026】 O Que Dar de Presente? Ideias de Presentes Originais',
    description:
      'Não sabe o que dar de presente? Descubra em Um Bom Presente (Un Buen Regalo) as melhores ideias de presentes para bebés, crianças, jovens e adultos.',
    h1: 'Ideias de Presentes Originais: O que Dar de Presente em 2026?',
    subtitle:
      'Pesquise por idade, orçamento ou paixão. Encontre presentes originais bem avaliados e organize votações de presentes em grupo pelo WhatsApp.',
    searchPlaceholder: 'Ex: Presente para namorado gamer, amante de café, criança 6 anos...',
    seoSectionTitle: 'O Que Dar de Presente? Guia de Presentes Originais para Todas as Idades',
    seoSectionBody:
      'Encontrar um bom presente de aniversário, amigo secreto ou Natal é muito mais simples quando você filtra por faixa etária e interesses reais. Alterne facilmente entre Euros (€) e Dólares ($) e vote em grupo com seus amigos no WhatsApp.',
    keywords: [
      'um bom presente',
      'o que dar de presente',
      'ideias de presentes',
      'presentes originais',
      'presente de aniversario',
      'presente para namorado',
      'presente para namorada',
      'amigo secreto presentes',
    ],
    faqItems: [
      {
        question: 'Como escolher um bom presente por idade e orçamento?',
        answer:
          'Use os filtros de idade (de recém-nascidos a adultos +18) e limite de preço (<15 €, <20 €) ou peça sugestões ao nosso Assistente IA.',
      },
      {
        question: 'Posso criar uma votação de presente em grupo no WhatsApp?',
        answer:
          'Sim! Adicione os produtos favoritos à lista de votação e partilhe o link no WhatsApp para que todos votem.',
      },
    ],
  },
  ru: {
    slug: 'ru',
    hreflang: 'ru',
    ogLocale: 'ru_RU',
    langCode: 'ru',
    googleCode: 'ru',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇷🇺',
    nativeName: 'Русский (EUR € / USD $)',
    brandTranslation: 'Хороший Подарок',
    title: 'Хороший Подарок 【2026】 Что Подарить? Оригинальные Идеи Подарков',
    description:
      'Не знаете, что подарить? Откройте для себя лучшие идеи подарков для малышей, детей, подростков и взрослых с групповым голосованием в WhatsApp.',
    h1: 'Оригинальные Идеи Подарков: Что Подарить в 2026 Году?',
    subtitle:
      'Введите, кому вы ищете подарок и чем он увлекается. Умный поиск мгновенно подберет проверенные идеи подарков по возрасту и бюджету в € или $.',
    searchPlaceholder: 'Например: подарок парню геймеру, любителю кофе, девочке 6 лет...',
    seoSectionTitle: 'Что Подарить? Гид по Оригинальным Подаркам для Всех Возрастов',
    seoSectionBody:
      'Выбрать хороший подарок (Un Buen Regalo) на день рождения, Новый год, Рождество или Тайного Санту легко с помощью фильтров по возрасту, интересам и бесплатного группового голосования за подарки в WhatsApp.',
    keywords: [
      'хороший подарок',
      'что подарить',
      'идеи подарков',
      'оригинальные подарки',
      'подарок на день рождения',
      'что подарить парню',
      'что подарить девушке',
      'подарки детям',
    ],
    faqItems: [
      {
        question: 'Как быстро выбрать хороший подарок по возрасту?',
        answer:
          'Выберите возрастную категорию (от 0–12 месяцев до 18+ лет) или воспользуйтесь ИИ-помощником по выбору подарков.',
      },
      {
        question: 'Как работает групповое голосование за подарок?',
        answer:
          'Добавьте понравившиеся подарки в список голосования и отправьте ссылку друзьям в WhatsApp, чтобы выбрать лучший вариант вместе.',
      },
    ],
  },
  nl: {
    slug: 'nl',
    hreflang: 'nl',
    ogLocale: 'nl_NL',
    langCode: 'nl',
    googleCode: 'nl',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇳🇱',
    nativeName: 'Nederlands (EUR €)',
    brandTranslation: 'Een Goed Cadeau',
    title: 'Een Goed Cadeau 【2026】 Wat te Geven? Originele Cadeau Ideeën',
    description:
      'Weet je niet wat je moet geven? Ontdek bij Een Goed Cadeau (Un Buen Regalo) originele cadeau-ideeën voor baby’s, kinderen, tieners en volwassenen.',
    h1: 'Beste Cadeau Ideeën: Wat te Geven in 2026?',
    subtitle:
      'Zoek op leeftijd, hobby of budget en vind direct de best beoordeelde cadeaus met groepsstemmen via WhatsApp.',
    searchPlaceholder: 'Bijv.: Cadeau voor vriend, gamer, koffieliefhebber, meisje 6 jaar...',
    seoSectionTitle: 'Wat te Geven? De Beste Originele Cadeau Ideeën voor Elke Leeftijd',
    seoSectionBody:
      'Of het nu gaat om een verjaardag, Sinterklaas, Kerst of Secret Santa: bij Een Goed Cadeau vind je geverifieerde cadeaus met topbeoordelingen en kun je eenvoudig samen stemmen via WhatsApp.',
    keywords: ['een goed cadeau', 'wat te geven', 'cadeau ideeën', 'origineel cadeau', 'verjaardagscadeau'],
    faqItems: [
      {
        question: 'Hoe vind ik snel een origineel cadeau?',
        answer: 'Filter op leeftijd of budget (< €15, < €20) of gebruik onze slimme AI Cadeau Assistent.',
      },
    ],
  },
  pl: {
    slug: 'pl',
    hreflang: 'pl',
    ogLocale: 'pl_PL',
    langCode: 'pl',
    googleCode: 'pl',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇵🇱',
    nativeName: 'Polski (EUR €)',
    brandTranslation: 'Dobry Prezent',
    title: 'Dobry Prezent 【2026】 Co Kupić na Prezent? Oryginalne Pomysły na Prezent',
    description:
      'Nie wiesz, co kupić na prezent? Odkryj najlepsze pomysły na prezent dla niemowląt, dzieci, młodzieży i dorosłych oraz głosowanie grupowe na WhatsApp.',
    h1: 'Najlepsze Pomysły na Prezent: Co Kupić w 2026 Roku?',
    subtitle:
      'Wpisz, dla kogo szukasz prezentu lub czym się pasjonuje. Nasza wyszukiwarka dopasuje najlepsze prezenty według wieku i budżetu.',
    searchPlaceholder: 'Np.: Prezent dla chłopaka gracza, miłośnika kawy, dziewczynki 6 lat...',
    seoSectionTitle: 'Co Kupić na Prezent? Przewodnik po Oryginalnych Prezentach',
    seoSectionBody:
      'Znajdź idealny prezent na urodziny, święta lub Mikołajki dzięki filtrom wiekowym i wspólnemu głosowaniu ze znajomymi na WhatsApp.',
    keywords: ['dobry prezent', 'co kupić na prezent', 'pomysły na prezent', 'oryginalny prezent', 'prezent na urodziny'],
    faqItems: [
      {
        question: 'Jak działa głosowanie grupowe na prezent?',
        answer: 'Dodaj wybrane prezenty do listy i udostępnij link na WhatsApp, aby znajomi mogli zagłosować.',
      },
    ],
  },
  zh: {
    slug: 'zh',
    hreflang: 'zh-CN',
    ogLocale: 'zh_CN',
    langCode: 'zh-CN',
    googleCode: 'zh-CN',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇨🇳',
    nativeName: '简体中文 (USD $)',
    brandTranslation: '好礼物 (A Good Gift)',
    title: '好礼物 【2026】 送什么礼物好？最佳创意礼物推荐与群组投票',
    description:
      '不知道送什么礼物好？在 Un Buen Regalo (好礼物) 探索适合婴儿、儿童、青少年和成人的高分创意礼物推荐，支持美元($)与欧元(€)及群组投票。',
    h1: '创意礼物推荐指南：2026年送什么礼物好？',
    subtitle: '输入收礼人或兴趣爱好，智能搜索引擎为您按年龄和预算推荐精选礼物（支持 $ USD / € EUR）。',
    searchPlaceholder: '例如：送游戏男友的礼物、咖啡爱好者、6岁女孩玩具...',
    seoSectionTitle: '送什么礼物好？全年龄段创意礼物挑选指南',
    seoSectionBody:
      '无论是生日礼物、圣诞礼物、纪念日还是朋友聚会，通过年龄分段（0-12个月至18岁以上）和兴趣中心（游戏、GTA 6、咖啡师、机车、宠物），轻松找到最受欢迎的好礼物。',
    keywords: ['好礼物', '送什么礼物好', '创意礼物', '生日礼物推荐', '礼物排行榜', 'a good gift'],
    faqItems: [
      {
        question: '如何切换美元($)和欧元(€)价格？',
        answer: '在中文及国际版页面默认显示美元($)，您也可以在顶部语言与货币菜单中随时一键切换为欧元(€)。',
      },
    ],
  },
  ja: {
    slug: 'ja',
    hreflang: 'ja',
    ogLocale: 'ja_JP',
    langCode: 'ja',
    googleCode: 'ja',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇯🇵',
    nativeName: '日本語 (USD $)',
    brandTranslation: '良いプレゼント (A Good Gift)',
    title: '良いプレゼント 【2026】 何を贈る？おすすめのギフトアイデア＆グループ投票',
    description:
      'プレゼント選びに迷ったら！赤ちゃん、子供、ティーン、大人向けの人気ギフトアイデアを年齢・予算別に検索。グループ投票機能付き。',
    h1: '人気プレゼント特集：2026年に何を贈る？おすすめギフト',
    subtitle: '贈る相手や趣味を入力するだけで、年齢や予算（$ USD / € EUR）に合った高評価ギフトを瞬時に提案します。',
    searchPlaceholder: '例：ゲーマーの彼氏へのプレゼント、コーヒー好き、6歳の女の子...',
    seoSectionTitle: '何を贈る？年齢・趣味別おすすめプレゼント完全ガイド',
    seoSectionBody:
      '誕生日、クリスマス、記念日、出産祝いまで、高評価レビュー付きのギフトを厳選。友達と一緒に選べるグループ投票機能も無料で利用できます。',
    keywords: ['良いプレゼント', '何を贈る', 'プレゼント おすすめ', 'ギフトアイデア', '誕生日プレゼント'],
    faqItems: [
      {
        question: 'グループでプレゼントを投票するには？',
        answer: '候補のギフトを追加してリンクを共有するだけで、友達全員でリアルタイム投票ができます。',
      },
    ],
  },
  ar: {
    slug: 'ar',
    hreflang: 'ar',
    ogLocale: 'ar_SA',
    langCode: 'ar',
    googleCode: 'ar',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇸🇦',
    nativeName: 'العربية (USD $)',
    brandTranslation: 'هدية جيدة (A Good Gift)',
    title: 'هدية جيدة 【2026】 ماذا أهدي؟ أفضل أفكار الهدايا المبتكرة والتصويت الجماعي',
    description:
      'هل تحتار ماذا تهدي؟ اكتشف أفضل أفكار الهدايا للأطفال والشباب والكبار بالدولار ($) واليورو (€) مع ميزة التصويت الجماعي عبر واتساب.',
    h1: 'أفضل أفكار الهدايا: ماذا تهدي في 2026؟ هدايا مميزة',
    subtitle: 'ابحث حسب العمر أو الهواية أو الميزانية بالدولار ($) لاختيار الهدية المثالية في ثوانٍ.',
    searchPlaceholder: 'مثال: هدية لصديق يحب الألعاب، عشاق القهوة، طفل 6 سنوات...',
    seoSectionTitle: 'ماذا أهدي؟ دليلك الشامل لأفضل أفكار الهدايا لجميع الأعمار',
    seoSectionBody:
      'اعثر على هدية مميزة لأعياد الميلاد والمناسبات الخاصة مصنفة حسب العمر والاهتمامات مع إمكانية مشاركة التصويت الجماعي مع الأصدقاء عبر واتساب.',
    keywords: ['هدية جيدة', 'ماذا أهدي', 'أفكار هدايا', 'هدايا أعياد ميلاد', 'هدايا مميزة'],
    faqItems: [
      {
        question: 'كيف يمكنني عرض الأسعار بالدولار أو اليورو؟',
        answer: 'يتم عرض الأسعار بالدولار ($) تلقائياً ويمكنك التبديل بين الدولار واليورو من القائمة العلوية.',
      },
    ],
  },
  uk: {
    slug: 'uk',
    hreflang: 'uk',
    ogLocale: 'uk_UA',
    langCode: 'uk',
    googleCode: 'uk',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇺🇦',
    nativeName: 'Українська (EUR €)',
    brandTranslation: 'Гарний Подарунок',
    title: 'Гарний Подарунок 【2026】 Що Подарувати? Оригінальні Ідеї Подарунків',
    description:
      'Не знаєте, що подарувати? Найкращі ідеї подарунків для малюків, дітей, підлітків і дорослих зі спільним голосуванням у WhatsApp.',
    h1: 'Найкращі Ідеї Подарунків: Що Подарувати у 2026 Році?',
    subtitle: 'Обирайте перевірені подарунки за віком, хобі та бюджетом у € або $ за лічені секунди.',
    searchPlaceholder: 'Наприклад: подарунок хлопцю геймеру, кавоману, дівчинці 6 років...',
    seoSectionTitle: 'Що Подарувати? Путівник Оригінальними Подарунками для Всіх',
    seoSectionBody:
      'Знаходьте ідеальні подарунки на день народження, Різдво чи Таємного Санту та голосуйте разом із друзями.',
    keywords: ['гарний подарунок', 'що подарувати', 'ідеї подарунків', 'оригінальні подарунки'],
    faqItems: [
      {
        question: 'Як проголосувати за подарунок із друзями?',
        answer: 'Додайте товари до списку голосування та надішліть посилання у WhatsApp.',
      },
    ],
  },
  sv: {
    slug: 'sv',
    hreflang: 'sv',
    ogLocale: 'sv_SE',
    langCode: 'sv',
    googleCode: 'sv',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇸🇪',
    nativeName: 'Svenska (EUR €)',
    brandTranslation: 'En Bra Present',
    title: 'En Bra Present 【2026】 Vad Ska Man Ge i Present? Bästa Presenttipsen',
    description:
      'Vet du inte vad du ska ge i present? Upptäck originella presenttips för bebisar, barn, tonåringar och vuxna med gruppröstning på WhatsApp.',
    h1: 'Bästa Presenttipsen: Vad Ska Man Ge i Present 2026?',
    subtitle: 'Sök efter ålder, intresse eller budget och hitta topprankade presenter direkt.',
    searchPlaceholder: 'T.ex.: Present till pojkvän, gamer, kaffeälskare, 6-åring...',
    seoSectionTitle: 'Vad Ska Man Ge i Present? Guide till Originella Presenttips',
    seoSectionBody:
      'Hitta rätt födelsedagspresent, julklapp eller Secret Santa-gåva sorterat efter ålder och intresse.',
    keywords: ['en bra present', 'vad ska man ge i present', 'presenttips', 'födelsedagspresent'],
    faqItems: [
      {
        question: 'Hur fungerar gruppröstningen för presenter?',
        answer: 'Lägg till presentförslag och dela länken i WhatsApp så att vänner kan rösta.',
      },
    ],
  },
  no: {
    slug: 'no',
    hreflang: 'no',
    ogLocale: 'nb_NO',
    langCode: 'no',
    googleCode: 'no',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇳🇴',
    nativeName: 'Norsk (EUR €)',
    brandTranslation: 'En God Gave',
    title: 'En God Gave 【2026】 Hva Skal Man Gi i Gave? Beste Gavetips',
    description:
      'Usikker på hva du skal gi i gave? Finn originale gavetips til baby, barn, ungdom og voksne med gruppeavstemning på WhatsApp.',
    h1: 'Beste Gavetips: Hva Skal Man Gi i Gave i 2026?',
    subtitle: 'Søk etter alder, hobby eller budsjett for å finne den perfekte gaven på sekunder.',
    searchPlaceholder: 'F.eks.: Gave til kjæreste, gamer, kaffeelsker, 6-åring...',
    seoSectionTitle: 'Hva Skal Man Gi i Gave? Guide til Originale Gavetips',
    seoSectionBody:
      'Finn bursdagsgaver og julegaver med topp vurderinger for alle aldre og stem sammen med venner.',
    keywords: ['en god gave', 'hva skal man gi i gave', 'gavetips', 'bursdagsgave'],
    faqItems: [
      {
        question: 'Hvordan stemmer man over gaver i gruppe?',
        answer: 'Velg gavene dere vurderer og del avstemningslenken på WhatsApp.',
      },
    ],
  },
  da: {
    slug: 'da',
    hreflang: 'da',
    ogLocale: 'da_DK',
    langCode: 'da',
    googleCode: 'da',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇩🇰',
    nativeName: 'Dansk (EUR €)',
    brandTranslation: 'En God Gave',
    title: 'En God Gave 【2026】 Hvad Skal Man Give i Gave? Originale Gaveideer',
    description:
      'Ved du ikke, hvad du skal give i gave? Find de bedste gaveideer til babyer, børn, unge og voksne med gruppeafstemning på WhatsApp.',
    h1: 'Bedste Gaveideer: Hvad Skal Man Give i Gave i 2026?',
    subtitle: 'Filtrer efter alder, interesse og budget for at finde de bedste gaver med det samme.',
    searchPlaceholder: 'F.eks.: Gave til kæreste, gamer, kaffeelsker, 6-årig...',
    seoSectionTitle: 'Hvad Skal Man Give i Gave? Guide til Gaveideer for Alle Aldre',
    seoSectionBody:
      'Uanset om det er fødselsdag, pakkeleg eller jul, hjælper En God Gave dig med at finde populære gaver.',
    keywords: ['en god gave', 'hvad skal man give i gave', 'gaveideer', 'fødselsdagsgave'],
    faqItems: [
      {
        question: 'Hvordan fungerer gruppeafstemning om gaver?',
        answer: 'Tilføj gaveideer til listen og del linket via WhatsApp med dine venner.',
      },
    ],
  },
  fi: {
    slug: 'fi',
    hreflang: 'fi',
    ogLocale: 'fi_FI',
    langCode: 'fi',
    googleCode: 'fi',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇫🇮',
    nativeName: 'Suomi (EUR €)',
    brandTranslation: 'Hyvä Lahja',
    title: 'Hyvä Lahja 【2026】 Mitä Lahjaksi? Parhaat Lahjaideat Kaikenikäisille',
    description:
      'Etkö tiedä mitä ostaa lahjaksi? Löydä parhaat lahjaideat vauvoille, lapsille, nuorille ja aikuisille sekä WhatsApp-ryhmääänestys.',
    h1: 'Parhaat Lahjaideat: Mitä Antaa Lahjaksi 2026?',
    subtitle: 'Etsi lahjoja iän, harrastuksen tai budjetin mukaan ja löydä täydellinen lahja hetkessä.',
    searchPlaceholder: 'Esim.: Lahja poikaystävälle, pelaajalle, kahvin ystävälle...',
    seoSectionTitle: 'Mitä Lahjaksi? Opas Parhaisiin Lahjaideoihin',
    seoSectionBody:
      'Löydä syntymäpäivälahjat ja joululahjat helposti ikäryhmittäin ja äänestä yhteisestä lahjasta WhatsAppissa.',
    keywords: ['hyvä lahja', 'mitä lahjaksi', 'lahjaideoita', 'syntymäpäivälahja'],
    faqItems: [
      {
        question: 'Miten ryhmääänestys toimii?',
        answer: 'Valitse lahjaehdokkaat ja jaa äänestyslinkki WhatsApp-ryhmässäsi.',
      },
    ],
  },
  el: {
    slug: 'el',
    hreflang: 'el',
    ogLocale: 'el_GR',
    langCode: 'el',
    googleCode: 'el',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇬🇷',
    nativeName: 'Ελληνικά (EUR €)',
    brandTranslation: 'Ένα Καλό Δώρο',
    title: 'Ένα Καλό Δώρο 【2026】 Τι Δώρο να Πάρω; Πρωτότυπες Ιδέες για Δώρα',
    description:
      'Δεν ξέρετε τι δώρο να πάρετε; Ανακαλύψτε τις καλύτερες ιδέες για δώρα για μωρά, παιδιά, εφήβους και ενήλικες με ομαδική ψηφοφορία στο WhatsApp.',
    h1: 'Πρωτότυπες Ιδέες για Δώρα: Τι Δώρο να Πάρω το 2026;',
    subtitle: 'Αναζητήστε ανά ηλικία, χόμπι ή προϋπολογισμό και βρείτε το τέλειο δώρο σε δευτερόλεπτα.',
    searchPlaceholder: 'Π.χ.: Δώρο για αγόρι gamer, λάτρη του καφέ, παιδί 6 ετών...',
    seoSectionTitle: 'Τι Δώρο να Πάρω; Οδηγός με Πρωτότυπες Ιδέες για Δώρα',
    seoSectionBody:
      'Βρείτε το ιδανικό δώρο γενεθλίων, γιορτής ή Χριστουγέννων ταξινομημένο ανά ηλικία και ψηφίστε ομαδικά με την παρέα σας.',
    keywords: ['ένα καλό δώρο', 'τι δώρο να πάρω', 'ιδέες για δώρα', 'πρωτότυπα δώρα'],
    faqItems: [
      {
        question: 'Πώς λειτουργεί η ομαδική ψηφοφορία δώρων;',
        answer: 'Προσθέστε τα αγαπημένα σας δώρα και μοιραστείτε τον σύνδεσμο στο WhatsApp για να ψηφίσουν οι φίλοι σας.',
      },
    ],
  },
  tr: {
    slug: 'tr',
    hreflang: 'tr',
    ogLocale: 'tr_TR',
    langCode: 'tr',
    googleCode: 'tr',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇹🇷',
    nativeName: 'Türkçe (EUR € / USD $)',
    brandTranslation: 'İyi Bir Hediye',
    title: 'İyi Bir Hediye 【2026】 Ne Hediye Alınır? Orijinal Hediye Fikirleri',
    description:
      'Ne hediye alacağınızı bilmiyor musunuz? Bebekler, çocuklar, gençler ve yetişkinler için en iyi hediye fikirlerini ve WhatsApp grup oylamasını keşfedin.',
    h1: 'En İyi Hediye Fikirleri: 2026\'da Ne Hediye Alınır?',
    subtitle: 'Yaşa, ilgi alanına veya bütçeye göre arayın; en yüksek puanlı hediye önerilerini anında bulun.',
    searchPlaceholder: 'Örn: Oyuncu sevgiliye hediye, kahve tutkunu, 6 yaş çocuk...',
    seoSectionTitle: 'Ne Hediye Alınır? Her Yaş İçin Orijinal Hediye Rehberi',
    seoSectionBody:
      'Doğum günü, yılbaşı veya çekiliş için en popüler hediye fikirlerini inceleyin ve WhatsApp üzerinden arkadaşlarınızla ortak hediye oylaması yapın.',
    keywords: ['iyi bir hediye', 'ne hediye alınır', 'hediye fikirleri', 'orijinal hediyeler', 'doğum günü hediyesi'],
    faqItems: [
      {
        question: 'Grup hediye oylaması nasıl çalışır?',
        answer: 'Beğendiğiniz hediyeleri listeye ekleyin ve WhatsApp bağlantısını paylaşarak arkadaşlarınızla oylayın.',
      },
    ],
  },
  ro: {
    slug: 'ro',
    hreflang: 'ro',
    ogLocale: 'ro_RO',
    langCode: 'ro',
    googleCode: 'ro',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇷🇴',
    nativeName: 'Română (EUR €)',
    brandTranslation: 'Un Cadou Bun',
    title: 'Un Cadou Bun 【2026】 Ce Cadou să Cumpăr? Idei de Cadouri Originale',
    description:
      'Nu știi ce cadou să alegi? Descoperă cele mai bune idei de cadouri pentru bebeluși, copii, adolescenți și adulți cu vot în grup pe WhatsApp.',
    h1: 'Idei de Cadouri Originale: Ce Cadou să Cumperi în 2026?',
    subtitle: 'Caută după vârstă, pasiune sau buget și găsește instantaneu cadoul potrivit.',
    searchPlaceholder: 'Ex: Cadou pentru iubit gamer, iubitor de cafea, fetiță 6 ani...',
    seoSectionTitle: 'Ce Cadou să Cumpăr? Ghidul Ideilor de Cadouri Originale',
    seoSectionBody:
      'Alege cadoul perfect pentru zi de naștere, Secret Santa sau Crăciun și votează în grup pe WhatsApp împreună cu prietenii.',
    keywords: ['un cadou bun', 'ce cadou să cumpăr', 'idei de cadouri', 'cadouri originale'],
    faqItems: [
      {
        question: 'Cum funcționează votul în grup pentru cadouri?',
        answer: 'Adaugă produsele în lista de vot și trimite linkul pe WhatsApp prietenilor tăi.',
      },
    ],
  },
  bg: {
    slug: 'bg',
    hreflang: 'bg',
    ogLocale: 'bg_BG',
    langCode: 'bg',
    googleCode: 'bg',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇧🇬',
    nativeName: 'Български (EUR €)',
    brandTranslation: 'Добър Подарък',
    title: 'Добър Подарък 【2026】 Какво да Подаря? Оригинални Идеи за Подарък',
    description:
      'Не знаете какво да подарите? Открийте най-добрите идеи за подарък за бебета, деца, тийнейджъри и възрастни с групово гласуване в WhatsApp.',
    h1: 'Най-добрите Идеи за Подарък: Какво да Подаря през 2026?',
    subtitle: 'Търсете по възраст, хоби или бюджет и открийте най-високо оценените подаръци.',
    searchPlaceholder: 'Напр.: Подарък за геймър, любител на кафето, дете на 6 г...',
    seoSectionTitle: 'Какво да Подаря? Наръчник за Оригинални Подаръци',
    seoSectionBody:
      'Изберете перфектния подарък за рожден ден или Коледа и гласувайте заедно с приятели чрез WhatsApp.',
    keywords: ['добър подарък', 'какво да подаря', 'идеи за подарък', 'оригинални подаръци'],
    faqItems: [
      {
        question: 'Как работи груповото гласуване за подарък?',
        answer: 'Изберете няколко продукта и споделете връзката в WhatsApp, за да гласувате заедно.',
      },
    ],
  },
  cs: {
    slug: 'cs',
    hreflang: 'cs',
    ogLocale: 'cs_CZ',
    langCode: 'cs',
    googleCode: 'cs',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇨🇿',
    nativeName: 'Čeština (EUR €)',
    brandTranslation: 'Dobrý Dárek',
    title: 'Dobrý Dárek 【2026】 Co Dát jako Dárek? Originální Tipy na Dárky',
    description:
      'Nevíte, co koupit jako dárek? Objevte nejlepší tipy na dárky pro miminka, děti, teenagery i dospělé se skupinovým hlasováním na WhatsAppu.',
    h1: 'Nejlepší Tipy na Dárky: Co Koupit jako Dárek v Roce 2026?',
    subtitle: 'Hledejte podle věku, koníčků nebo rozpočtu a najděte ten nejlepší dárek během několika sekund.',
    searchPlaceholder: 'Např.: Dárek pro přítele hráče, milovníka kávy, dívku 6 let...',
    seoSectionTitle: 'Co Koupit jako Dárek? Průvodce Originálními Dárky',
    seoSectionBody:
      'Najděte skvělý dárek k narozeninám či Vánocům rozdělený podle věku a hlasujte o společném dárku s přáteli.',
    keywords: ['dobrý dárek', 'tipy na dárky', 'originální dárky', 'co koupit k narozeninám'],
    faqItems: [
      {
        question: 'Jak funguje skupinové hlasování o dárcích?',
        answer: 'Vyberte kandidáty na dárek a pošlete odkaz přátelům přes WhatsApp.',
      },
    ],
  },
  hu: {
    slug: 'hu',
    hreflang: 'hu',
    ogLocale: 'hu_HU',
    langCode: 'hu',
    googleCode: 'hu',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇭🇺',
    nativeName: 'Magyar (EUR €)',
    brandTranslation: 'Egy Jó Ajándék',
    title: 'Egy Jó Ajándék 【2026】 Mit Ajándékozzak? Eredeti Ajándékötletek',
    description:
      'Nem tudod, mit ajándékozz? Fedezd fel a legjobb ajándékötleteket babáknak, gyerekeknek, tiniknek és felnőtteknek csoportos WhatsApp-szavazással.',
    h1: 'Legjobb Ajándékötletek: Mit Ajándékozzak 2026-ban?',
    subtitle: 'Keress életkor, hobbi vagy ár alapján, és találd meg a tökéletes ajándékot másodpercek alatt.',
    searchPlaceholder: 'Pl.: Ajándék gamer barátnak, kávékedvelőnek, 6 éves kislánynak...',
    seoSectionTitle: 'Mit Ajándékozzak? Eredeti Ajándékötletek Minden Korosztálynak',
    seoSectionBody:
      'Születésnapra, karácsonyra vagy névnapra keresel ajándékot? Válogass a legjobb értékelésű termékek között és szavazzatok közösen WhatsAppon.',
    keywords: ['egy jó ajándék', 'mit ajándékozzak', 'ajándékötletek', 'eredeti ajándékok'],
    faqItems: [
      {
        question: 'Hogyan működik a csoportos ajándékszavazás?',
        answer: 'Adj hozzá több ajándékötletet a listához, és oszd meg a linket WhatsAppon a barátaiddal.',
      },
    ],
  },
  ko: {
    slug: 'ko',
    hreflang: 'ko',
    ogLocale: 'ko_KR',
    langCode: 'ko',
    googleCode: 'ko',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇰🇷',
    nativeName: '한국어 (USD $)',
    brandTranslation: '좋은 선물 (A Good Gift)',
    title: '좋은 선물 【2026】 무엇을 선물할까? 센스있는 선물 추천 및 그룹 투표',
    description:
      '무엇을 선물할지 고민되시나요? 아기, 어린이, 청소년, 성인을 위한 연령별·예산별 최고의 선물 추천과 그룹 투표 기능을 만나보세요 ($ USD / € EUR 지원).',
    h1: '베스트 선물 추천: 2026년 센스있는 선물 아이디어',
    subtitle: '받는 사람이나 취미를 입력하면 연령과 예산($ USD / € EUR)에 맞는 인기 선물을 즉시 찾아드립니다.',
    searchPlaceholder: '예: 게이머 남자친구 선물, 커피 애호가, 6세 여아 장난감...',
    seoSectionTitle: '무엇을 선물할까? 연령별·취향별 베스트 선물 가이드',
    seoSectionBody:
      '생일 선물, 크리스마스, 기념일, 마니또 선물까지 높은 평점을 받은 아이템을 한눈에 비교하고 친구들과 실시간 투표로 결정하세요.',
    keywords: ['좋은 선물', '무엇을 선물할까', '선물 추천', '생일 선물 추천', '센스있는 선물'],
    faqItems: [
      {
        question: '달러($)와 유로(€) 통화를 어떻게 변경하나요?',
        answer: '상단 언어 및 통화 선택 메뉴에서 언제든지 달러($ USD)와 유로(€ EUR)를 전환할 수 있습니다.',
      },
    ],
  },
  hi: {
    slug: 'hi',
    hreflang: 'hi',
    ogLocale: 'hi_IN',
    langCode: 'hi',
    googleCode: 'hi',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇮🇳',
    nativeName: 'हिन्दी (USD $)',
    brandTranslation: 'एक अच्छा उपहार (A Good Gift)',
    title: 'एक अच्छा उपहार 【2026】 क्या गिफ्ट दें? बेस्ट गिफ्ट आइडियाज और ग्रुप वोटिंग',
    description:
      'समझ नहीं आ रहा कि क्या गिफ्ट दें? बच्चों, युवाओं और बड़ों के लिए उम्र और बजट ($ USD / € EUR) के अनुसार बेहतरीन गिफ्ट आइडियाज और व्हाट्सएप ग्रुप वोटिंग खोजें।',
    h1: 'बेस्ट गिफ्ट आइडियाज: 2026 में क्या गिफ्ट दें?',
    subtitle: 'उम्र, शौक या बजट के अनुसार खोजें और सेकंडों में सबसे बेहतरीन गिफ्ट आइडियाज पाएं।',
    searchPlaceholder: 'उदा.: गेमर दोस्त के लिए गिफ्ट, कॉफी लवर, 6 साल की बच्ची...',
    seoSectionTitle: 'क्या गिफ्ट दें? हर उम्र के लिए ओरिजिनल गिफ्ट आइडियाज गाइड',
    seoSectionBody:
      'जन्मदिन, सालगिरह, सीक्रेट सांता या त्योहारों के लिए टॉप-रेटेड उपहार चुनें और दोस्तों के साथ व्हाट्सएप पर ग्रुप वोटिंग करें।',
    keywords: ['एक अच्छा उपहार', 'क्या गिफ्ट दें', 'गिफ्ट आइडियाज', 'बर्थडे गिफ्ट', 'best gift ideas'],
    faqItems: [
      {
        question: 'व्हाट्सएप ग्रुप गिफ्ट वोटिंग कैसे काम करती है?',
        answer: 'अपनी पसंद के गिफ्ट्स को वोटिंग लिस्ट में जोड़ें और दोस्तों के साथ व्हाट्सएप पर लिंक शेयर करें।',
      },
    ],
  },
};

export function getHreflangAlternates(): Record<string, string> {
  const baseUrl = 'https://www.unbuenregalo.es';
  const languages: Record<string, string> = {
    es: baseUrl,
    'x-default': `${baseUrl}/en`,
  };

  for (const route of Object.values(I18N_SEO_ROUTES)) {
    languages[route.hreflang] = `${baseUrl}/${route.slug}`;
  }

  return languages;
}
