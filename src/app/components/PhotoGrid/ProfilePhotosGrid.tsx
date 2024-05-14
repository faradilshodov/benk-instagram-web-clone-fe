"use client";

// Importing libraries
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

// Importing Components
import ProfilePhotosGridModal from "./ProfilePhotosGridModal";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
`;

const PhotoItem = styled.div`
  position: relative;
  padding-bottom: 100%;
`;

const apiLink = "https://jan24-jilhslxp5q-uc.a.run.app/api/posts";

export interface PostObject {
  post_id: number;
  user_id: number;
  media_url: string;
  caption: string;
}

// Create a type called CommmentsObj
export interface CommmentsObj {
  id: number;
  comment: string;
}

const commentsArray: CommmentsObj[] = [
  {
    id: 1,
    comment: "This is so informative, thanks for sharing!",
  },
  {
    id: 2,
    comment: "Great job on this one!",
  },
  {
    id: 3,
    comment: "This didn't really make sense to me.",
  },
  {
    id: 4,
    comment: "This is exactly what I needed to hear today.",
  },
  {
    id: 5,
    comment: "What an interesting perspective!",
  },
  {
    id: 6,
    comment: "This didn't really make sense to me.",
  },
  {
    id: 7,
    comment: "This is exactly what I needed to hear today.",
  },
  {
    id: 8,
    comment: "Great job on this one!",
  },
  {
    id: 9,
    comment: "What an interesting perspective!",
  },
  {
    id: 10,
    comment: "This is exactly what I needed to hear today.",
  },
];

export default function ProfilePhotosGrid() {
  const [posts, setPosts] = useState<PostObject[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostObject | null>(null);
  // Store dummy comments
  const [comments, setComments] = useState<CommmentsObj[]>(commentsArray);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: Response = await fetch(apiLink);
        if (!response.ok) {
          throw new Error("Error fetching posts");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const openModal = (post: PostObject) => {
    setIsModalOpen(true);
    setSelectedPost(post);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GridContainer>
        {posts?.map((postObject: PostObject) => (
          <PhotoItem
            key={postObject.post_id}
            onClick={() => openModal(postObject)}
          >
            <Image
              src={postObject.media_url}
              alt="Post Photo"
              fill
              objectFit="cover"
            />
          </PhotoItem>
        ))}
      </GridContainer>
      {isModalOpen && (
        <ProfilePhotosGridModal
          closeModal={closeModal}
          selectedPost={selectedPost}
          dummyComments={comments}
        />
      )}
    </>
  );
}
