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
  height: 35%;
  width: 50%;
`;

interface ProfileStoriesModalPropTypes {
  closeModal: () => void;
  stories: Story[];
  currentStoryIndex: number;
}

export default function ProfileStoriesModal({
  closeModal,
  stories,
  currentStoryIndex,
}: ProfileStoriesModalPropTypes) {
  return (
    <StoriesBackdrop>
      <CloseButton onClick={closeModal}>X</CloseButton>

      <StyledVideo
        src={stories[currentStoryIndex].video_url}
        autoPlay
        muted={true}
      />
    </StoriesBackdrop>
  );
}
