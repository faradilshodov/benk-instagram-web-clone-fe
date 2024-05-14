"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileStoriesModal from "./ProfileStoriesModal";

const StoriesGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 2fr 1fr;

  p {
    text-align: center;
  }

  gap: 5px 40px;
  padding: 10px;
`;

interface StoryThumbnailProps {
  imageurl: string;
}

const StoryThumbnail = styled.div<StoryThumbnailProps>`
  width: 77px;
  height: 77px;
  border-radius: 50%;

  background: url(${(props) => props.imageurl}) no-repeat center center;
  background-size: 150%;

  margin: auto;
  border: 2px solid rgba(153, 150, 172, 0.593);
  padding: 5px;

  cursor: pointer;
`;

export interface Story {
  story_id: number;
  user_id: number;
  video_url: string;
  thumbnail_url: string;
  title: string;
}

export default function ProfileStoriesGrid() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          "https://jan24-jilhslxp5q-uc.a.run.app/api/stories"
        );

        if (!response.ok) {
          throw new Error("Errir in retrieving stories");
        }

        const data = await response.json();

        // console.log(data.result.rows);
        setStories(data.result.rows);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchStories();
  }, []);

  const openModal = (story: Story) => {
    setIsModalOpen(true);

    const index = stories.findIndex((s) => s.story_id === story.story_id);

    if (index !== -1) {
      setCurrentStoryIndex(index);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StoriesGrid>
        {stories.map((story) => (
          <>
            <StoryThumbnail
              imageurl={story.thumbnail_url}
              onClick={() => openModal(story)}
            />
            <p>{story.title}</p>
          </>
        ))}
      </StoriesGrid>
      {isModalOpen && (
        <ProfileStoriesModal
          closeModal={closeModal}
          stories={stories}
          currentStoryIndex={currentStoryIndex}
        />
      )}
    </>
  );
}
