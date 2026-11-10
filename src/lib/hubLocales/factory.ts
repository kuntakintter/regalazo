import { HubLocalePack } from './types';

export interface NativeLocaleSeed {
  common: HubLocalePack['common'];
  trustAmazon: string;
  trustPrime: string;
  trustReviews: string;
  // Category tabs labels shared
  tabAll: string;
  tabTech: string;
  tabGaming: string;
  tabGourmet: string;
  tabPerfume: string;
  tabExperiences: string;
  tabFashion: string;
  tabBooks: string;
  tabGames: string;
  tabBeauty: string;
  tabPokemon: string;
  tabLego: string;
  tabInstax: string;
  filterBudgetLabel: string;
  // Niche hub domain copy
  motoristas: {
    trustEce: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string]; // t1, b1, t2, b2, t3, b3
  };
  automovil: {
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
  };
  ciclismo: {
    trustRoad: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
  };
  cafe: {
    trustBarista: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
  };
  mascotas: {
    trustPets: string;
    filterQ: string;
    petTypeLabel: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
  };
  gaming: {
    trustBudget: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    bannerBadge: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerCta: string;
    verdictTitle: string;
    verdictSubtitle: string;
    vPicks: [string, string, string, string, string, string, string, string, string];
    guideTitle: string;
    cards: [string, string, string, string, string, string];
    faqs: [string, string, string, string]; // q1, a1, q2, a2
  };
  halloween: {
    trustCostumes: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
  };
  navidad: {
    trustTrains: string;
    trustSecretSanta: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    bannerBadge: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerCta: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
    faqs: [string, string, string, string];
  };
  gta: {
    trustNeon: string;
    filterQ: string;
    amzCat: string;
    amzBadge: string;
    loadBtn: string;
    loadingBtn: string;
    queryDef: string;
    guideTitle: string;
    cards: [string, string, string, string, string, string];
    faqs: [string, string, string, string];
  };
  personas: {
    relatedTitle: string;
    podiumHombre: string;
    podiumMujer: string;
    podiumNovio: string;
    podiumNovia: string;
    podiumUnder20: string;
    podiumTodo: string;
    hombreGuideTitle: string;
    mujerGuideTitle: string;
    novioGuideTitle: string;
    noviaGuideTitle: string;
    under20GuideTitle: string;
    todoGuideTitle: string;
    hombreFaqQ: string;
    hombreFaqA: string;
    mujerFaqQ: string;
    mujerFaqA: string;
    novioFaqQ: string;
    novioFaqA: string;
    noviaFaqQ: string;
    noviaFaqA: string;
    under20FaqQ: string;
    under20FaqA: string;
    todoFaqQ: string;
    todoFaqA: string;
    groupVoteFaqQ: string;
    groupVoteFaqA: string;
  };
  votar: HubLocalePack['votar'];
  carta: HubLocalePack['carta'];
  filterLanding: HubLocalePack['filterLanding'];
}

export function buildHubPack(s: NativeLocaleSeed): HubLocalePack {
  return {
    common: s.common,
    motoristas: {
      trustBadges: [s.motoristas.trustEce, 'Alpinestars, Dainese, AGV, Cardo', s.trustPrime],
      filterQuestion: s.motoristas.filterQ,
      amazonCategoryLabel: s.motoristas.amzCat,
      amazonBadgeLabel: s.motoristas.amzBadge,
      loadMoreLiveBtn: s.motoristas.loadBtn,
      loadingLiveBtn: s.motoristas.loadingBtn,
      liveSearchDefaultQuery: s.motoristas.queryDef,
      liveSearchQueryPrefix: s.motoristas.queryDef,
      guideTitle: s.motoristas.guideTitle,
      guideCards: [
        { icon: '📏', title: s.motoristas.cards[0], body: s.motoristas.cards[1] },
        { icon: '⛑️', title: s.motoristas.cards[2], body: s.motoristas.cards[3] },
        { icon: '🧤', title: s.motoristas.cards[4], body: s.motoristas.cards[5] },
      ],
    },
    automovil: {
      trustBadges: [s.trustAmazon, 'NOCO, 70mai, Xiaomi, Meguiar’s', s.trustPrime],
      filterQuestion: s.automovil.filterQ,
      amazonCategoryLabel: s.automovil.amzCat,
      amazonBadgeLabel: s.automovil.amzBadge,
      loadMoreLiveBtn: s.automovil.loadBtn,
      loadingLiveBtn: s.automovil.loadingBtn,
      liveSearchDefaultQuery: s.automovil.queryDef,
      liveSearchQueryPrefix: s.automovil.queryDef,
      guideTitle: s.automovil.guideTitle,
      guideCards: [
        { icon: '⚡', title: s.automovil.cards[0], body: s.automovil.cards[1] },
        { icon: '📹', title: s.automovil.cards[2], body: s.automovil.cards[3] },
        { icon: '✨', title: s.automovil.cards[4], body: s.automovil.cards[5] },
      ],
    },
    ciclismo: {
      trustBadges: [s.ciclismo.trustRoad, 'Garmin, Topeak, Giro, Shimano', s.trustPrime],
      filterQuestion: s.ciclismo.filterQ,
      amazonCategoryLabel: s.ciclismo.amzCat,
      amazonBadgeLabel: s.ciclismo.amzBadge,
      loadMoreLiveBtn: s.ciclismo.loadBtn,
      loadingLiveBtn: s.ciclismo.loadingBtn,
      liveSearchDefaultQuery: s.ciclismo.queryDef,
      liveSearchQueryPrefix: s.ciclismo.queryDef,
      guideTitle: s.ciclismo.guideTitle,
      guideCards: [
        { icon: '📡', title: s.ciclismo.cards[0], body: s.ciclismo.cards[1] },
        { icon: '🧭', title: s.ciclismo.cards[2], body: s.ciclismo.cards[3] },
        { icon: '🔧', title: s.ciclismo.cards[4], body: s.ciclismo.cards[5] },
      ],
    },
    cafe: {
      trustBadges: [s.cafe.trustBarista, 'Bialetti, Timemore, Hario, Stanley', s.trustReviews],
      filterQuestion: s.cafe.filterQ,
      amazonCategoryLabel: s.cafe.amzCat,
      amazonBadgeLabel: s.cafe.amzBadge,
      loadMoreLiveBtn: s.cafe.loadBtn,
      loadingLiveBtn: s.cafe.loadingBtn,
      liveSearchDefaultQuery: s.cafe.queryDef,
      liveSearchQueryPrefix: s.cafe.queryDef,
      guideTitle: s.cafe.guideTitle,
      guideCards: [
        { icon: '⚙️', title: s.cafe.cards[0], body: s.cafe.cards[1] },
        { icon: '♨️', title: s.cafe.cards[2], body: s.cafe.cards[3] },
        { icon: '🌡️', title: s.cafe.cards[4], body: s.cafe.cards[5] },
      ],
    },
    mascotas: {
      trustBadges: [s.mascotas.trustPets, 'KONG, Tractive, Catit, Julius-K9', s.trustReviews],
      filterQuestion: s.mascotas.filterQ,
      petTypeLabel: s.mascotas.petTypeLabel,
      amazonCategoryLabel: s.mascotas.amzCat,
      amazonBadgeLabel: s.mascotas.amzBadge,
      loadMoreLiveBtn: s.mascotas.loadBtn,
      loadingLiveBtn: s.mascotas.loadingBtn,
      liveSearchDefaultQuery: s.mascotas.queryDef,
      liveSearchQueryPrefix: s.mascotas.queryDef,
      guideTitle: s.mascotas.guideTitle,
      guideCards: [
        { icon: '📍', title: s.mascotas.cards[0], body: s.mascotas.cards[1] },
        { icon: '🦴', title: s.mascotas.cards[2], body: s.mascotas.cards[3] },
        { icon: '💧', title: s.mascotas.cards[4], body: s.mascotas.cards[5] },
      ],
    },
    gaming: {
      trustBadges: [s.gaming.trustBudget, 'PC, PS5, Xbox & Nintendo Switch', 'Logitech G, HyperX, Razer'],
      filterQuestion: s.gaming.filterQ,
      amazonCategoryLabel: s.gaming.amzCat,
      amazonBadgeLabel: s.gaming.amzBadge,
      loadMoreLiveBtn: s.gaming.loadBtn,
      loadingLiveBtn: s.gaming.loadingBtn,
      liveSearchDefaultQuery: s.gaming.queryDef,
      liveSearchQueryPrefix: s.gaming.queryDef,
      extraBannerBadge: s.gaming.bannerBadge,
      extraBannerTitle: s.gaming.bannerTitle,
      extraBannerDesc: s.gaming.bannerDesc,
      extraBannerCta: s.gaming.bannerCta,
      verdictTitle: s.gaming.verdictTitle,
      verdictSubtitle: s.gaming.verdictSubtitle,
      verdictPicks: [
        { badge: s.gaming.vPicks[0], title: s.gaming.vPicks[1], summary: s.gaming.vPicks[2] },
        { badge: s.gaming.vPicks[3], title: s.gaming.vPicks[4], summary: s.gaming.vPicks[5] },
        { badge: s.gaming.vPicks[6], title: s.gaming.vPicks[7], summary: s.gaming.vPicks[8] },
      ],
      guideTitle: s.gaming.guideTitle,
      guideCards: [
        { icon: '💡', title: s.gaming.cards[0], body: s.gaming.cards[1] },
        { icon: '🎧', title: s.gaming.cards[2], body: s.gaming.cards[3] },
        { icon: '🖱️', title: s.gaming.cards[4], body: s.gaming.cards[5] },
      ],
      faqs: [
        { question: s.gaming.faqs[0], answer: s.gaming.faqs[1] },
        { question: s.gaming.faqs[2], answer: s.gaming.faqs[3] },
      ],
    },
    halloween: {
      trustBadges: [s.halloween.trustCostumes, s.trustAmazon, s.trustPrime],
      filterQuestion: s.halloween.filterQ,
      amazonCategoryLabel: s.halloween.amzCat,
      amazonBadgeLabel: s.halloween.amzBadge,
      loadMoreLiveBtn: s.halloween.loadBtn,
      loadingLiveBtn: s.halloween.loadingBtn,
      liveSearchDefaultQuery: s.halloween.queryDef,
      liveSearchQueryPrefix: s.halloween.queryDef,
      guideTitle: s.halloween.guideTitle,
      guideCards: [
        { icon: '🎭', title: s.halloween.cards[0], body: s.halloween.cards[1] },
        { icon: '🕷️', title: s.halloween.cards[2], body: s.halloween.cards[3] },
        { icon: '🕯️', title: s.halloween.cards[4], body: s.halloween.cards[5] },
      ],
    },
    navidad: {
      trustBadges: [s.navidad.trustTrains, s.navidad.trustSecretSanta, s.trustPrime],
      filterQuestion: s.navidad.filterQ,
      amazonCategoryLabel: s.navidad.amzCat,
      amazonBadgeLabel: s.navidad.amzBadge,
      loadMoreLiveBtn: s.navidad.loadBtn,
      loadingLiveBtn: s.navidad.loadingBtn,
      liveSearchDefaultQuery: s.navidad.queryDef,
      liveSearchQueryPrefix: s.navidad.queryDef,
      extraBannerBadge: s.navidad.bannerBadge,
      extraBannerTitle: s.navidad.bannerTitle,
      extraBannerDesc: s.navidad.bannerDesc,
      extraBannerCta: s.navidad.bannerCta,
      guideTitle: s.navidad.guideTitle,
      guideCards: [
        { icon: '🚂', title: s.navidad.cards[0], body: s.navidad.cards[1] },
        { icon: '🎁', title: s.navidad.cards[2], body: s.navidad.cards[3] },
        { icon: '🗳️', title: s.navidad.cards[4], body: s.navidad.cards[5] },
      ],
      faqs: [
        { question: s.navidad.faqs[0], answer: s.navidad.faqs[1] },
        { question: s.navidad.faqs[2], answer: s.navidad.faqs[3] },
      ],
    },
    gta: {
      trustBadges: [s.gta.trustNeon, 'DualSense PS5 · Neón · PSN/Xbox', s.trustPrime],
      filterQuestion: s.gta.filterQ,
      amazonCategoryLabel: s.gta.amzCat,
      amazonBadgeLabel: s.gta.amzBadge,
      loadMoreLiveBtn: s.gta.loadBtn,
      loadingLiveBtn: s.gta.loadingBtn,
      liveSearchDefaultQuery: s.gta.queryDef,
      liveSearchQueryPrefix: s.gta.queryDef,
      guideTitle: s.gta.guideTitle,
      guideCards: [
        { icon: '🌴', title: s.gta.cards[0], body: s.gta.cards[1] },
        { icon: '🎮', title: s.gta.cards[2], body: s.gta.cards[3] },
        { icon: '💳', title: s.gta.cards[4], body: s.gta.cards[5] },
      ],
      faqs: [
        { question: s.gta.faqs[0], answer: s.gta.faqs[1] },
        { question: s.gta.faqs[2], answer: s.gta.faqs[3] },
      ],
    },
    hombre: {
      trustBadges: [s.trustReviews, s.trustAmazon, s.trustPrime],
      categoryTabs: [
        { id: 'all', label: s.tabAll, icon: '👨' },
        { id: 'tech', label: s.tabTech, icon: '🎧' },
        { id: 'gaming', label: s.tabGaming, icon: '🎮' },
        { id: 'gourmet', label: s.tabGourmet, icon: '☕' },
        { id: 'perfume', label: s.tabPerfume, icon: '✨' },
        { id: 'experiences', label: s.tabExperiences, icon: '🎁' },
      ],
      budgetLabel: s.filterBudgetLabel,
      guideTitle: s.personas.hombreGuideTitle,
      guideCards: [
        { icon: '🛠️', title: s.automovil.cards[0], body: s.automovil.cards[1] },
        { icon: '☕', title: s.cafe.cards[0], body: s.cafe.cards[1] },
        { icon: '🎮', title: s.gaming.cards[2], body: s.gaming.cards[3] },
      ],
      relatedTitle: s.personas.relatedTitle,
      podiumLabel: s.personas.podiumHombre,
      faqs: [
        { question: s.personas.hombreFaqQ, answer: s.personas.hombreFaqA },
        { question: s.personas.groupVoteFaqQ, answer: s.personas.groupVoteFaqA },
      ],
    },
    mujer: {
      trustBadges: [s.trustReviews, s.trustAmazon, s.trustPrime],
      categoryTabs: [
        { id: 'all', label: s.tabAll, icon: '👩' },
        { id: 'perfume', label: s.tabPerfume, icon: '🧴' },
        { id: 'fashion', label: s.tabFashion, icon: '👜' },
        { id: 'experiences', label: s.tabExperiences, icon: '🧘‍♀️' },
        { id: 'tech', label: s.tabInstax, icon: '📸' },
        { id: 'books', label: s.tabBooks, icon: '📚' },
      ],
      budgetLabel: s.filterBudgetLabel,
      guideTitle: s.personas.mujerGuideTitle,
      guideCards: [
        { icon: '💆‍♀️', title: s.filterLanding.whyCards[0].title, body: s.personas.mujerFaqA },
        { icon: '📸', title: s.tabInstax, body: s.filterLanding.whyCards[1].body },
        { icon: '✨', title: s.tabExperiences, body: s.personas.todoFaqA },
      ],
      relatedTitle: s.personas.relatedTitle,
      podiumLabel: s.personas.podiumMujer,
      faqs: [
        { question: s.personas.mujerFaqQ, answer: s.personas.mujerFaqA },
        { question: s.personas.groupVoteFaqQ, answer: s.personas.groupVoteFaqA },
      ],
    },
    novio: {
      trustBadges: [s.trustReviews, s.trustAmazon, s.trustPrime],
      categoryTabs: [
        { id: 'all', label: s.tabAll, icon: '❤️' },
        { id: 'tech', label: s.tabTech, icon: '🎧' },
        { id: 'gaming', label: s.tabGaming, icon: '🎮' },
        { id: 'perfume', label: s.tabPerfume, icon: '🖤' },
        { id: 'gourmet', label: s.tabGourmet, icon: '🥃' },
        { id: 'experiences', label: s.tabExperiences, icon: '🥂' },
      ],
      budgetLabel: s.filterBudgetLabel,
      guideTitle: s.personas.novioGuideTitle,
      guideCards: [
        { icon: '🎧', title: s.tabTech, body: s.gaming.cards[3] },
        { icon: '☕', title: s.tabGourmet, body: s.cafe.cards[1] },
        { icon: '🥂', title: s.tabExperiences, body: s.personas.novioFaqA },
      ],
      relatedTitle: s.personas.relatedTitle,
      podiumLabel: s.personas.podiumNovio,
      faqs: [
        { question: s.personas.novioFaqQ, answer: s.personas.novioFaqA },
        { question: s.personas.groupVoteFaqQ, answer: s.personas.groupVoteFaqA },
      ],
    },
    novia: {
      trustBadges: [s.trustReviews, s.trustAmazon, s.trustPrime],
      categoryTabs: [
        { id: 'all', label: s.tabAll, icon: '💕' },
        { id: 'perfume', label: s.tabPerfume, icon: '🌸' },
        { id: 'fashion', label: s.tabFashion, icon: '💍' },
        { id: 'tech', label: s.tabInstax, icon: '📸' },
        { id: 'experiences', label: s.tabExperiences, icon: '🥂' },
        { id: 'books', label: s.tabBooks, icon: '🕯️' },
      ],
      budgetLabel: s.filterBudgetLabel,
      guideTitle: s.personas.noviaGuideTitle,
      guideCards: [
        { icon: '📷', title: s.tabInstax, body: s.personas.noviaFaqA },
        { icon: '🌸', title: s.tabPerfume, body: s.filterLanding.whyCards[0].body },
        { icon: '🥂', title: s.tabExperiences, body: s.personas.todoFaqA },
      ],
      relatedTitle: s.personas.relatedTitle,
      podiumLabel: s.personas.podiumNovia,
      faqs: [
        { question: s.personas.noviaFaqQ, answer: s.personas.noviaFaqA },
        { question: s.personas.groupVoteFaqQ, answer: s.personas.groupVoteFaqA },
      ],
    },
    under20: {
      trustBadges: [s.trustReviews, s.trustAmazon, s.trustPrime],
      categoryTabs: [
        { id: 'all', label: s.tabAll, icon: '🏷️' },
        { id: 'games', label: s.tabGames, icon: '🎲' },
        { id: 'books', label: s.tabBooks, icon: '📚' },
        { id: 'beauty', label: s.tabBeauty, icon: '🕯️' },
        { id: 'tech', label: s.tabGaming, icon: '🎮' },
        { id: 'pokemon', label: s.tabPokemon, icon: '⚡' },
      ],
      budgetLabel: s.filterBudgetLabel,
      guideTitle: s.personas.under20GuideTitle,
      guideCards: [
        { icon: '🎲', title: s.tabGames, body: s.personas.under20FaqA },
        { icon: '📚', title: s.tabBooks, body: s.filterLanding.whyCards[0].body },
        { icon: '⚡', title: s.tabPokemon, body: s.gaming.cards[1] },
      ],
      relatedTitle: s.personas.relatedTitle,
      podiumLabel: s.personas.podiumUnder20,
      faqs: [
        { question: s.personas.under20FaqQ, answer: s.personas.under20FaqA },
        { question: s.personas.groupVoteFaqQ, answer: s.personas.groupVoteFaqA },
      ],
    },
    tienenDeTodo: {
      trustBadges: [s.trustReviews, s.trustAmazon, s.trustPrime],
      categoryTabs: [
        { id: 'all', label: s.tabAll, icon: '✨' },
        { id: 'experiences', label: s.tabExperiences, icon: '🥂' },
        { id: 'gourmet', label: s.tabGourmet, icon: '☕' },
        { id: 'lego', label: s.tabLego, icon: '🧱' },
        { id: 'tech', label: s.tabTech, icon: '🛸' },
        { id: 'games', label: s.tabGames, icon: '🔐' },
      ],
      budgetLabel: s.filterBudgetLabel,
      guideTitle: s.personas.todoGuideTitle,
      guideCards: [
        { icon: '🎟️', title: s.tabExperiences, body: s.personas.todoFaqA },
        { icon: '🍸', title: s.tabGourmet, body: s.cafe.cards[1] },
        { icon: '🧱', title: s.tabLego, body: s.filterLanding.whyCards[2].body },
      ],
      relatedTitle: s.personas.relatedTitle,
      podiumLabel: s.personas.podiumTodo,
      faqs: [
        { question: s.personas.todoFaqQ, answer: s.personas.todoFaqA },
        { question: s.personas.groupVoteFaqQ, answer: s.personas.groupVoteFaqA },
      ],
    },
    votar: s.votar,
    carta: s.carta,
    filterLanding: s.filterLanding,
  };
}
