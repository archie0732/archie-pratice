export interface SaveWordData {
  public_word: {
    word: string;
    translate: string;
    definition?: string;
    relate?: string[];
    ex?: string;
  }[];
}

export interface SignalWord {
  word: string;
  translate: string;
  definition?: string;
  relate?: string[];
  ex?: string;
}
