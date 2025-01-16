'use client';

import { useEffect, useState } from 'react';
// api client
import { Api } from '../services/api-client';
//types
import { IStory } from '../services/stories';
// components
import { Container } from './';
// cn
import { cn } from '../lib/utils';
// lucide
import { X } from 'lucide-react';
// react-insta-stories lib
import ReactStories from 'react-insta-stories';

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

    if (story?.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('my-10 mmd:justify-start', className)}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-nowrap">
          {stories.length === 0 && (
            <div className="flex gap-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse mmd:h-[125px] mmd:w-[100px]"
                />
              ))}
            </div>
          )}
        </div>

        {/* Горизонтальный скролл на маленьких экранах */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-nowrap">
          {stories.map((story) => (
            <img
              key={story.id}
              onClick={() => handleStoryOpen(story)}
              className="w-[200px] h-[250px] rounded-md cursor-pointer flex-shrink-0 mmd:h-[125px] mmd:w-[100px]"
              src={story.previewImageUrl}
            />
          ))}
        </div>

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative w-[520px]">
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
