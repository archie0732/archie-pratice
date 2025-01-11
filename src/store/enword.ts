import { SaveWordData, SignalWord } from '@/app/api/_lib/apitypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EnWordData {
  word: SignalWord[];
  fetch(): Promise<void>;
}

interface ErrorWordData {
  word: {
    word: string;
    definition: string;
    time: string;
  }[];
  addWord(word: string, definition: string): void;
  rmWord(word: string): void;
}

export const useEnWordStore = create<EnWordData>(
  (set) => ({
    word: [],
    async fetch() {
      const resp = await fetch('/api/english');

      if (!resp.ok) {
        throw new Error(`Request failed with status ${resp.status.toString()}: ${await resp.text()}`);
      }

      const word = await resp.json() as SaveWordData;

      set({ word: word.public_word });
    },
  }),
);

export const useErrorWord = create(persist<ErrorWordData>((set) => ({
  word: [],
  addWord(word, definition) {
    const time = new Date();
    const now = `${time.getFullYear().toString()} - ${(time.getMonth() + 1).toString()} - ${time.getDate().toString()}`;
    set((state) => ({ word: [...state.word, { word, definition, time: now }] }));
  },
  rmWord(word) {
    set((state) => ({
      word: state.word.filter((item) => item.word !== word),
    }));
  } }
), {
  name: 'error-word-storage',
}));
