'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface VotingContextType {
  voteItems: Product[];
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
  const [voteItems, setVoteItems] = useState<Product[]>([]);
  const [recipientName, setRecipientNameState] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  // Sync to localStorage
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
  };

  const addItem = (product: Product): { success: boolean; message?: string } => {
    if (voteItems.some((item) => item.id === product.id)) {
      return { success: false, message: 'El producto ya está en tu lista de votación' };
    }
    if (voteItems.length >= MAX_VOTE_ITEMS) {
      return {
        success: false,
        message: `Máximo ${MAX_VOTE_ITEMS} productos por votación para que tus amigos elijan fácilmente`,
      };
    }
    setVoteItems((prev) => [...prev, product]);
    return { success: true };
  };

  const removeItem = (productId: string) => {
    setVoteItems((prev) => prev.filter((item) => item.id !== productId));
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
    setRecipientName('');
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
      localStorage.removeItem(STORAGE_KEY_RECIPIENT);
    } catch {
      // ignore
    }
  };

  const generateShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    const ids = voteItems.map((item) => item.id).join(',');
    const nameParam = recipientName.trim() ? `&para=${encodeURIComponent(recipientName.trim())}` : '';
    return `${baseUrl}/votar?ids=${encodeURIComponent(ids)}${nameParam}`;
  };

  return (
    <VotingContext.Provider
      value={{
        voteItems,
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