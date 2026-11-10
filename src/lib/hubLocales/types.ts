export interface HubFaqItem {
  question: string;
  answer: string;
}

export interface EditorialCard {
  title: string;
  body: string;
  icon?: string;
}

export interface CommonHubLabels {
  ideasUnit: string;
  brandLabel: string;
  allBrands: string;
  priceRangeLabel: string;
  allPrices: string;
  styleLabel: string;
  allStyles: string;
  styleIntegral: string;
  styleModular: string;
  styleCordura: string;
  styleSummer: string;
  styleWinter: string;
  sortLabel: string;
  sortFeatured: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortRating: string;
  activeFiltersNote: string;
  clearAllFilters: string;
  resetFilters: string;
  showingLiveFrom: string;
  liveSubnote: string;
  noLocalTitle: string;
  noLocalDesc: string;
  searchLiveAmazonBtn: string;
  loadingLiveTitle: string;
  loadingMoreOffers: string;
  loadMoreOptions: string;
  searchingOn: string;
  loadingRealtimeNote: string;
  viewOnAmazon: string;
  amazonOfferBadge: string;
  officialWarranty: string;
  primeShipping: string;
  dailyOffers: string;
  budgetAll: string;
  relatedGuidesTitle: string;
  editorialGuideEyebrow: string;
}

export interface NicheHubCopy {
  trustBadges: [string, string, string];
  filterQuestion: string;
  amazonCategoryLabel: string;
  amazonBadgeLabel: string;
  loadMoreLiveBtn: string;
  loadingLiveBtn: string;
  liveSearchDefaultQuery: string;
  liveSearchQueryPrefix: string;
  guideTitle: string;
  guideCards: [EditorialCard, EditorialCard, EditorialCard];
  petTypeLabel?: string;
  extraBannerBadge?: string;
  extraBannerTitle?: string;
  extraBannerDesc?: string;
  extraBannerCta?: string;
  verdictTitle?: string;
  verdictSubtitle?: string;
  verdictPicks?: [
    { badge: string; title: string; summary: string },
    { badge: string; title: string; summary: string },
    { badge: string; title: string; summary: string }
  ];
  faqs?: HubFaqItem[];
}

export interface PersonaHubCopy {
  trustBadges: [string, string, string];
  categoryTabs: Array<{ id: string; label: string; icon: string }>;
  budgetLabel: string;
  guideTitle: string;
  guideCards: [EditorialCard, EditorialCard, EditorialCard];
  relatedTitle: string;
  faqs: HubFaqItem[];
  podiumLabel: string;
}

export interface VotarHubCopy {
  modeCreatorBadge: string;
  modeVoterBadge: string;
  titlePrefixFor: string;
  recipientPlaceholder: string;
  addFromCatalogBtn: string;
  pickMinHint: string;
  shareWhatsAppBtn: string;
  copyLinkBtn: string;
  copiedBtn: string;
  clearPollBtn: string;
  emptyTitle: string;
  emptyDesc: string;
  emptyCta: string;
  voteBtn: string;
  votedBtn: string;
  votesWord: string;
  leaderBadge: string;
  buyBtn: string;
  totalVotesLabel: string;
  createYourOwnBtn: string;
  whatsappInviteTemplate: string; // {recipient} {url}
  guideTitle: string;
  guideCards: [EditorialCard, EditorialCard, EditorialCard];
  faqs: HubFaqItem[];
}

export interface CartaHubCopy {
  mailboxBadge: string;
  step1Title: string;
  step1Subtitle: string;
  searchPlaceholder: string;
  wheelSubfilterTitle: string;
  ageSelectLabel: string;
  addToyBtn: string;
  addedToyBtn: string;
  maxReachedLabel: string;
  selectedCounterTemplate: string; // {count}/6
  emptyToysTitle: string;
  resetToysBtn: string;
  step2Title: string;
  childNameLabel: string;
  childNamePlaceholder: string;
  childAgeLabel: string;
  childCityLabel: string;
  childCityPlaceholder: string;
  behaviorLabel: string;
  behaviorOptions: Array<{ value: string; label: string }>;
  wishesLabel: string;
  wishesPlaceholder: string;
  generateBtn: string;
  printBtn: string;
  shareWhatsAppBtn: string;
  copyLinkBtn: string;
  copiedLinkBtn: string;
  newLetterBtn: string;
  letterHeading: string;
  letterSalutation: string;
  letterIntroTemplate: string; // {name}, {age}, {city}, {behavior}
  letterWishesHeading: string;
  letterExtraNoteHeading: string;
  letterClosing: string;
  letterSignedBy: string;
  maxToysAlert: string;
  missingNameAlert: string;
  missingToysAlert: string;
  safetyBannerTitle: string;
  safetyBannerDesc: string;
  viewToyOnAmazon: string;
  whatsappLetterTemplate: string; // {name} {toys} {url}
  guideTitle: string;
  guideCards: [EditorialCard, EditorialCard, EditorialCard];
  faqs: HubFaqItem[];
}

export interface FilterLandingCopy {
  catalogHeading: string;
  whyTitlePrefix: string;
  whyCards: [EditorialCard, EditorialCard, EditorialCard];
  noStrictProductsNote: string;
  relatedFiltersTitle: string;
  allAgesCta: string;
}

export interface HubLocalePack {
  common: CommonHubLabels;
  motoristas: NicheHubCopy;
  automovil: NicheHubCopy;
  ciclismo: NicheHubCopy;
  cafe: NicheHubCopy;
  mascotas: NicheHubCopy;
  gaming: NicheHubCopy;
  halloween: NicheHubCopy;
  navidad: NicheHubCopy;
  gta: NicheHubCopy;
  hombre: PersonaHubCopy;
  mujer: PersonaHubCopy;
  novio: PersonaHubCopy;
  novia: PersonaHubCopy;
  under20: PersonaHubCopy;
  tienenDeTodo: PersonaHubCopy;
  votar: VotarHubCopy;
  carta: CartaHubCopy;
  filterLanding: FilterLandingCopy;
}
