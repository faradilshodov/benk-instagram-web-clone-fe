"use client";

import styled from "styled-components";
import { Story } from "./ProfileStoriesGrid";

const StoriesBackdrop = styled.div`
  position: fixed;
  background-color: black;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 20;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  justify-items: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 30;
`;

const StyledVideo = styled.video`
  height: 70%;
  width: 70%;
  object-fit: cover;
  border-radius: 10px;
  max-width: 300px;
`;

const NavigationThumbnail = styled.img`
  height: 35%;
  width: 70%;
  border-radius: 10px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  cursor: pointer;
  max-width: 150px;
`;

interface ProfileStoriesModalPropTypes {
  closeModal: () => void;
  stories: Story[];
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
}

export default function ProfileStoriesModal({
  closeModal,
  stories,
  currentStoryIndex,
  setCurrentStoryIndex,
}: ProfileStoriesModalPropTypes) {
  const hasNext: boolean = currentStoryIndex < stories.length - 1;
  const hasPrevious: boolean = currentStoryIndex > 0;

  const goToPreviousStory = () => {
    if (hasPrevious) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const goToNextStory = () => {
    if (hasNext) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  return (
    <StoriesBackdrop>
      <CloseButton onClick={closeModal}>X</CloseButton>

      {hasPrevious && (
        <NavigationThumbnail
          src={stories[currentStoryIndex - 1].thumbnail_url}
          onClick={goToPreviousStory}
        />
      )}

      {!hasPrevious && <div></div>}

      <StyledVideo
        src={stories[currentStoryIndex].video_url}
        autoPlay
        muted={true}
        loop
      />

      {hasNext && (
        <NavigationThumbnail
          src={stories[currentStoryIndex + 1].thumbnail_url}
          onClick={goToNextStory}
        />
      )}
    </StoriesBackdrop>
  );
}
