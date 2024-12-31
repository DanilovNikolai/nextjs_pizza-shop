'use client';

import { useEffect, useState } from 'react';
// api client
import { Api } from '../services/api-client';
//types
import { IStory } from '../services/stories';


interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  // Загружаем все stories
  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  // Ф-ция открывания story
  const handleStoryOpen = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return <></>;
};
