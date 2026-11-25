'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Product } from '@/data/products';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { getLocaleHref, normalizeLocaleKey } from '@/lib/i18nContent';

interface VotingContextType {
  voteItems: Product[];
  isLoaded: boolean;
  recipientName: string;
  setRecipientName: (name: string) => void;
  addItem: (product: Product) => { success: boolean; message?: string };
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isItemInList: (productId: string) => boolean;
  clearList: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  generateShareUrl: () => string;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

const MAX_VOTE_ITEMS = 6;
const STORAGE_KEY_ITEMS = 'regalazo_vote_items_v1';
const STORAGE_KEY_RECIPIENT = 'regalazo_vote_recipient_v1';

export function VotingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [voteItems, setVoteItems] = useState<Product[]>([]);
  const [recipientName, setRecipientNameState] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const firstSeg = (pathname || '/').replace(/^\/+/, '').split('/')[0]?.toLowerCase() || '';
  const activeLocaleKey =
    firstSeg && firstSeg in I18N_SEO_ROUTES ? normalizeLocaleKey(firstSeg) : 'es';

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (savedItems) {
        setVoteItems(JSON.parse(savedItems));
      }
      const savedRecipient = localStorage.getItem(STORAGE_KEY_RECIPIENT);
      if (savedRecipient) {
        setRecipientNameState(savedRecipient);
      }
    } catch {
      // fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage & keep /votar URL query string in sync when items or recipient change
  const syncVotarUrlIfOnPollPage = (nextItems: Product[], nextRecipient: string) => {
    if (typeof window === 'undefined') return;
    if (!window.location.pathname.endsWith('/votar')) return;
    const pollPath = getLocaleHref(activeLocaleKey, '/votar');
    if (nextItems.length === 0) {
      window.history.replaceState(null, '', pollPath);
      window.dispatchEvent(new CustomEvent('voting-url-sync', { detail: { ids: '', para: '' } }));
      return;
    }
    const ids = nextItems.map((item) => item.id).join(',');
    const nameTrim = nextRecipient.trim();
    const nameParam = nameTrim ? `&para=${encodeURIComponent(nameTrim)}` : '';
    const nextUrl = `${pollPath}?ids=${encodeURIComponent(ids)}${nameParam}`;
    window.history.replaceState(null, '', nextUrl);
    window.dispatchEvent(
      new CustomEvent('voting-url-sync', { detail: { ids, para: nameTrim } })
    );
  };

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(voteItems));
    } catch {
      // ignore quota errors
    }
  }, [voteItems, isLoaded]);

  const setRecipientName = (name: string) => {
    setRecipientNameState(name);
    try {
      localStorage.setItem(STORAGE_KEY_RECIPIENT, name);
    } catch {
      // ignore
    }
    if (voteItems.length > 0) {
      syncVotarUrlIfOnPollPage(voteItems, name);
    }
  };

  const addItem = (product: Product): { success: boolean; message?: string } => {
    if (voteItems.some((item) => item.id === product.id)) {
      return {
        success: false,
        message:
          activeLocaleKey === 'es' || activeLocaleKey === 'es-us'
            ? 'El producto ya está en tu lista de votación'
            : 'Already added to your poll list',
      };
    }
    if (voteItems.length >= MAX_VOTE_ITEMS) {
      return {
        success: false,
        message:
          activeLocaleKey === 'es' || activeLocaleKey === 'es-us'
            ? `Máximo ${MAX_VOTE_ITEMS} productos por votación para que tus amigos elijan fácilmente`
            : `Max ${MAX_VOTE_ITEMS} items per group poll`,
      };
    }
    const next = [...voteItems, product];
    setVoteItems(next);
    syncVotarUrlIfOnPollPage(next, recipientName);
    return { success: true };
  };

  const removeItem = (productId: string) => {
    const next = voteItems.filter((item) => item.id !== productId);
    setVoteItems(next);
    syncVotarUrlIfOnPollPage(next, recipientName);
  };

  const isItemInList = (productId: string) => {
    return voteItems.some((item) => item.id === productId);
  };

  const toggleItem = (product: Product) => {
    if (isItemInList(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const clearList = () => {
    setVoteItems([]);
    setRecipientNameState('');
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
      localStorage.removeItem(STORAGE_KEY_RECIPIENT);
    } catch {
      // ignore
    }
    syncVotarUrlIfOnPollPage([], '');
  };

  const generateShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    const ids = voteItems.map((item) => item.id).join(',');
    const nameParam = recipientName.trim() ? `&para=${encodeURIComponent(recipientName.trim())}` : '';
    const pollPath = getLocaleHref(activeLocaleKey, '/votar');
    return `${baseUrl}${pollPath}?ids=${encodeURIComponent(ids)}${nameParam}`;
  };

  return (
    <VotingContext.Provider
      value={{
        voteItems,
        isLoaded,
        recipientName,
        setRecipientName,
        addItem,
        removeItem,
        toggleItem,
        isItemInList,
        clearList,
        isDrawerOpen,
        setIsDrawerOpen,
        generateShareUrl,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
}

export function useVoting() {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
}
