'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent, Dialog, DialogTrigger, DialogTitle,
  DialogDescription, DialogClose, DialogHeader, DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function AddWordDialog() {
  const { toast } = useToast();
  const [englishWord, setEnglishWord] = useState<string>('');
  const [chineseWord, setChineseWord] = useState<string>('');
  const [Ex, setEx] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddWord = async () => {
    if (!englishWord.trim() || !chineseWord.trim()) {
      toast({
        title: '錯誤',
        description: '單字或翻譯不可以為空',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const res = await fetch('/api/english/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: englishWord,
        translate: chineseWord,
        ex: Ex,
      }),
    });

    if (!res.ok) {
      toast({
        title: '新增錯誤時發生錯誤',
        description: '未知錯誤',
        variant: 'destructive',
      });
      setIsLoading(true);
      return;
    }

    toast({
      title: '新增成功',
      description: '朝成功更進一步',
    });

    setChineseWord('');
    setEnglishWord('');
    setEx('');
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          新增單字
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增單字</DialogTitle>
          <DialogDescription>新增單字至儲存庫</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="English" className="text-right">
              英文
            </Label>
            <Input
              id="English"
              value={englishWord}
              onChange={(e) => { setEnglishWord(e.target.value); }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Translate" className="text-right">
              中文
            </Label>
            <Input
              id="Translate"
              value={chineseWord}
              onChange={(e) => { setChineseWord(e.target.value); }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Ex" className="text-right">
              例句
            </Label>
            <Input
              id="Ex"
              value={Ex}
              onChange={(e) => { setEx(e.target.value); }}
              className="col-span-3"
            />
          </div>

        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">close</Button>
          </DialogClose>
          <Button onClick={() => void handleAddWord()} disabled={isLoading}>
            {isLoading ? '加入中...' : 'add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
