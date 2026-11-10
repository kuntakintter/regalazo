import { Currency } from '@/context/CurrencyContext';

export type NativeLangKey =
  | 'en'
  | 'de'
  | 'fr'
  | 'it'
  | 'pt'
  | 'ru'
  | 'nl'
  | 'pl'
  | 'zh'
  | 'ja'
  | 'ar'
  | 'uk'
  | 'sv'
  | 'no'
  | 'da'
  | 'fi'
  | 'el'
  | 'tr'
  | 'ro'
  | 'bg'
  | 'cs'
  | 'hu'
  | 'ko'
  | 'hi';

export type LocaleKey = 'es' | 'en-gb' | 'es-us' | NativeLangKey;

export interface UiStrings {
  brandName: string;
  brandAgesSubtitle: string;
  logoAlt: string;
  amazonStoreBadge: string;

  // Navigation & Header
  navHome: string;
  navAges: string;
  navThemes: string;
  navRecipients: string;
  navFilters: string;
  navVoting: string;
  navLetter: string;
  navAllIdeas: string;
  navMenu: string;
  navClose: string;
  navBackHome: string;
  headerSearchPlaceholder: string;
  headerSearchButton: string;
  headerClearSearch: string;
  searchRecommendedCatalog: string;
  searchLiveFrom: string;
  searchLivePrices: string;
  searchLoadingAmazon: string;
  searchNoLocalMatches: string;
  searchDirectOn: string;
  searchBuyBtn: string;
  productsUnit: string;
  ideasUnit: string;

  // GTA Promo Banner
  bannerGtaBadge: string;
  bannerGtaTitle: string;
  bannerGtaDesc: string;
  bannerGtaCta: string;

  // Badges
  badgePopular: string;
  badgeNew: string;
  badgeTop: string;
  badgeFree: string;
  badgeUpdated2026: string;

  // Language & Currency Modal
  langButtonAria: string;
  langModalTitle: string;
  langModalSubtitle: string;
  langCurrencyLabel: string;
  langStoreLabel: string;
  langStoreEs: string;
  langStoreIntl: string;
  langSearchPlaceholder: string;
  langPopularTitle: string;
  langMoreTitle: string;
  langNoResults: string;
  langFooterNote: string;
  langCloseLabel: string;

  // FilterBar & Home
  quickAgesHeading: string;
  ageSelectLabel: string;
  ageAllLabel: string;
  ageAllShort: string;
  genderLabel: string;
  genderAll: string;
  genderBoy: string;
  genderGirl: string;
  categoryLabel: string;
  categoryAll: string;
  clothingSubfilterLabel: string;
  animeSubfilterLabel: string;
  wheelsSubfilterLabel: string;
  maxBudgetLabel: string;
  budgetAnyUnlimited: string;
  budgetUpToPrefix: string;
  budgetBetweenWord: string;
  budgetAndWord: string;
  budgetMoreThanPrefix: string;
  budgetNoLimitSuffix: string;
  sortLabel: string;
  sortFeatured: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortRating: string;
  clearFilters: string;
  resetFiltersBtn: string;
  showMoreFilters: string;
  hideFilters: string;
  aiWizardOpenBtn: string;

  // Home Showcase Wings & Results
  leftWingTitle: string;
  leftWingSubtitle: string;
  leftWingAria: string;
  rightWingTitle: string;
  rightWingSubtitle: string;
  rightWingAria: string;
  showcaseViewOffer: string;
  slideIndicatorAria: string;
  pauseRotationAria: string;
  resumeRotationAria: string;
  showingResults: string;
  showingAllCatalog: string;
  noResultsTitle: string;
  noResultsBody: string;
  liveSearchBtn: string;
  loadingLiveTitle: string;
  loadingLiveDesc: string;
  liveResultsTitle: string;
  liveResultsSubtitle: string;
  seoGuideLinksTitle: string;

  // Product Cards & Top Podium
  viewOnAmazon: string;
  addToVote: string;
  inVoteList: string;
  removeFromVote: string;
  verifiedReviews: string;
  amazonPrimeFast: string;
  idealForLabel: string;
  prosLabel: string;
  liveBadge: string;
  freeShippingPrime: string;
  podiumEyebrow: string;
  podiumTitlePrefix: string;
  podiumSubtitle: string;
  podiumScoreLabel: string;
  podiumReviewsWord: string;
  podiumPriceLabel: string;
  podiumCheckPriceBtn: string;
  podiumCountdownLabel: string;
  podiumQuickTableTitle: string;
  podiumColRank: string;
  podiumColProduct: string;
  podiumColRating: string;
  podiumColPrice: string;
  podiumColAction: string;
  podiumWinnerBadge: string;
  podiumSilverBadge: string;
  podiumBronzeBadge: string;
  podiumAwards: [string, string, string];

  // Age, Subcategory & Filter Landing Shared Chrome
  breadcrumbHome: string;
  exploreThemesTitle: string;
  exploreThemesSubtitle: string;
  themesCountWord: string;
  verifiedCatalogNote: string;
  analyzedWord: string;
  trustGuarantee: string;
  trustRatings: string;
  trustStock: string;
  trustFreeReturns: string;
  trustPrimeShipping: string;
  recommendedProductsTitle: string;
  viewAllAges: string;
  viewAllLink: string;
  otherThemesIn: string;
  moreAlternatives: string;
  siblingFiltersHeading: string;
  popularFiltersHeading: string;
  emptyFallbackDesc: string;
  emptyFallbackBtn: string;
  updatedBadge2026: string;

  // SEO Patterns
  top10Prefix: string;
  top10Suffix: string;
  ageTitleSuffix: string;
  ageDescTemplate: string; // uses {label}, {tagline}
  subcatTitleTemplate: string; // uses {sub}, {year}
  subcatH1Template: string; // uses {sub}, {year}
  subcatDescTemplate: string; // uses {sub}, {age}
  filterTitleTemplate: string; // uses {label}, {year}
  filterH1Template: string; // uses {label}
  filterDescTemplate: string; // uses {label}, {tagline}

  // Footer & Directory
  footerTagline: string;
  footerLoveNote: string;
  footerDisclosureTitle: string;
  footerDisclosureText: string;
  footerColOccasions: string;
  footerColPassions: string;
  footerColAges: string;
  footerColFilters: string;
  footerLegalNotice: string;
  footerPrivacy: string;
  footerCookies: string;
  footerCookiePrefs: string;
  footerRights: string;
  footerEditionsTitle: string;
  directoryTitle: string;
  directoryBadge: string;
  directorySubtitle: string;
  directoryToggleOpen: string;
  directoryToggleClose: string;
  directoryFiltersTitle: string;
  directoryHubsTitle: string;

  // Widgets
  faqEyebrow: string;
  faqTitle: string;
  tipsTitle: string;
  tipsSubtitle: string;
  tipsCards: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string }
  ];
  interlinkTitle: string;
  interlinkSubtitle: string;
  amazonLiveTitle: string;
  amazonLiveSubtitle: string;
  amazonLivePlaceholder: string;
  amazonLiveButton: string;
  amazonGridTitle: string;
  amazonGridDesc: string;
  amazonGridBtn: string;
  cookieText: string;
  cookieAccept: string;
  cookieConfigure: string;
  christmasDaysLabel: string;
  christmasHoursLabel: string;
  christmasMinsLabel: string;
  christmasToday: string;
  votingDrawerTitle: string;
  votingDrawerSubtitle: string;
  votingDrawerEmpty: string;
  votingDrawerEmptyHint: string;
  votingRecipientLabel: string;
  votingRecipientPlaceholder: string;
  votingWhatsAppBtn: string;
  votingOpenPollBtn: string;
  votingCopyBtn: string;
  votingCopiedBtn: string;
  votingClearBtn: string;
  floatingBarCandidates: string;
  floatingBarOpenBtn: string;
  onboardingTitle: string;
  onboardingBody: string;
  onboardingDismiss: string;
  sharePromptTitle: string;
  sharePromptSubtitle: string;
  shareBtnWhatsApp: string;
  shareBtnCopy: string;
  shareBtnCopied: string;

  // GiftWizard
  wizardTitle: string;
  wizardSubtitle: string;
  wizardStepLabel: string;
  wizardBack: string;
  wizardNext: string;
  wizardSeeResults: string;
  wizardClose: string;
  wizardAgeQuestion: string;
  wizardThemeQuestion: string;
  wizardBudgetQuestion: string;
  wizardInterestPlaceholder: string;
}

export interface HubCopy {
  title: string;
  socialTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  breadcrumbLabel: string;
  keywords: string[];
  faqs?: Array<{ question: string; answer: string }>;
}

export interface LangPack {
  ui: UiStrings;
  terms: Record<string, string>;
  hubs: Record<string, HubCopy>;
}

export interface LocalizedMeta {
  title: string;
  socialTitle: string;
  description: string;
  h1: string;
  subtitle: string;
  tagline: string;
  keywords: string[];
  currency: Currency;
  currencySymbol: string;
}
