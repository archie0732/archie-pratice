'use client';

import { useEnWordStore, useErrorWord } from '@/store/enword';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { AddWordDialog } from '@/components/english/addword-dialog';
import type { SignalWord } from '@/app/api/_lib/apitypes';
import Image from 'next/image';

const generateOptions = (correctTranslation: string, allWords: SignalWord[]) => {
  const translations = allWords
    .map((item) => item.translate)
    .filter((t) => t !== correctTranslation);
  const shuffled = translations.sort(() => 0.5 - Math.random()).slice(0, 3);
  return [...shuffled, correctTranslation].sort(() => 0.5 - Math.random());
};

const generateQuestion = (wordData: SignalWord[], usedWords: Set<string>) => {
  const remainingWords = wordData.filter(
    (word) => !usedWords.has(word.word),
  );

  if (remainingWords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * remainingWords.length);
  const selectedWord = remainingWords[randomIndex];
  const options = generateOptions(selectedWord.translate, wordData);

  return {
    word: selectedWord.word,
    correct: selectedWord.translate,
    options,
  };
};

export function Question() {
  const wordStore = useEnWordStore();
  const errorWord = useErrorWord();
  const { toast } = useToast();

  const [question, setQuestion] = useState<{
    word: string;
    correct: string;
    options: string[];
  } | null>(null);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    void wordStore.fetch();
  }, []);

  useEffect(() => {
    if (wordStore.word.length > 0 && !isCompleted && !question) {
      const initialQuestion = generateQuestion(wordStore.word, usedWords);
      setQuestion(initialQuestion);
    }
  }, [wordStore.word, question, usedWords, isCompleted]);

  const handleSelect = (option: string) => {
    if (!question || isCompleted) return;

    setSelectedOption(option);

    const isCorrect = option === question.correct;

    if (isCorrect) {
      toast({
        title: '🎉回答正確!',
        description: 'good job!',
      });
      setScore((prev) => prev + 1);
    }
    else {
      toast({
        title: '回答錯誤',
        description: '沒事，下次再努力',
        variant: 'destructive',
      });
      errorWord.addWord(question.word, question.correct);
    }

    // 更新已使用的单词集合
    const newUsedWords = new Set(usedWords);
    newUsedWords.add(question.word);
    setUsedWords(newUsedWords);

    // 检查是否已完成所有题目
    if (newUsedWords.size >= wordStore.word.length) {
      setIsCompleted(true);
    }
    else {
      setTimeout(() => {
        setQuestionNumber((prev) => prev + 1);
        const newQuestion = generateQuestion(wordStore.word, newUsedWords);
        setQuestion(newQuestion);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const handleNextQuestion = () => {
    if (isCompleted) return;

    setSelectedOption(null);
    const newQuestion = generateQuestion(wordStore.word, usedWords);
    if (!newQuestion) {
      setIsCompleted(true);
    }
    else {
      setQuestion(newQuestion);
    }
  };

  const handleRestart = () => {
    setUsedWords(new Set());
    setScore(0);
    setSelectedOption(null);
    setIsCompleted(false);
    setQuestion(null);
    setQuestionNumber(1);
    void wordStore.fetch();
  };

  if (wordStore.word.length === 0) {
    return <p>載入中...</p>;
  }

  if (isCompleted) {
    return (
      <div className="backdrop-blur-sm">
        <p>題目已完成！</p>
        <p>
          最終分數：
          {score}
        </p>
        <Button onClick={handleRestart}>重新開始</Button>
      </div>
    );
  }

  if (!question) {
    return <p>載入中...</p>;
  }

  return (
    <div className="flex flex-col">
      <p>
        {questionNumber}
        {' '}
        /
        {' '}
        {wordStore.word.length}
      </p>

      <div className={`
        relative flex h-[100px] w-[280px] justify-center rounded-lg p-2
      `}
      >
        <Image
          src="/image/0106.jpg"
          alt="a"
          layout="fill"
          className="rounded-lg object-cover"
        />
        <strong className={`
          absolute bottom-0 w-full rounded-b-lg bg-gray-800/60 text-center
          text-xl
        `}
        >
          {question.word}
        </strong>
      </div>
      <div className="mt-2 rounded-md p-2 backdrop-blur-sm">
        <p>當前分數：</p>
        <span className="flex justify-center p-4 text-3xl">{score}</span>
      </div>
      <div className="m-2 grid grid-cols-2 gap-2">
        {question.options.map((option) => (
          <Button
            key={option}
            onClick={() => { handleSelect(option); }}
            disabled={!!selectedOption || isCompleted}
            className={
              selectedOption
                ? option === question.correct
                  ? 'bg-green-500/90 text-white backdrop-blur-md'
                  : option === selectedOption
                    ? 'bg-red-500/90 text-white backdrop-blur-md'
                    : ''
                : ''
            }
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <AddWordDialog />
        <Button onClick={handleRestart}>重新開始</Button>
        <Button
          onClick={handleNextQuestion}
          disabled={!!selectedOption || isCompleted}
        >
          下一題
        </Button>
      </div>
    </div>
  );
}
