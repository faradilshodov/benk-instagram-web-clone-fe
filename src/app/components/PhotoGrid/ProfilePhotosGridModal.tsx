import Image from "next/image";
import styled from "styled-components";
import { PostObject } from "./ProfilePhotosGrid";



const ModalBackdrop = styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.7);
    display: grid;
    place-items: center;
    z-index: 12;
`;

const ModalContent = styled.div`
    background-color: white;
    width: 80%;
    height: 80%;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 60% 40%;
    max-width: 900px;

    .image-container {
        background-color: red;
        position: relative;
    }

    .comments-container {
        background-color: black;
        padding: 10px;
    }

        p {
            color: white;
        }
`;

const PostCaption =  styled.p`
    font-size: 20px;
    font-weight: 700;
`

interface ProfilePhotosGridModalPropsType {
    closeModal: () => void;
    selectedPost: PostObject | null;
}

export default function ProfilePhotosGridModal({closeModal, selectedPost} : ProfilePhotosGridModalPropsType) {
    return (
        <>
            <ModalBackdrop onClick={closeModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <div className="image-container">
                        <Image 
                            src={selectedPost ? selectedPost.media_url : ""} alt="Modal Image"
                            fill
                            objectFit="cover" 
                        />
                    </div>
                    <div className="comments-container">
                        <div>
                            <PostCaption>{selectedPost?.caption}</PostCaption>
                        </div>
                        <div>
                            <p>comments go here</p>
                        </div>
                    </div>
                </ModalContent>
            </ModalBackdrop>
        </>
    )
}