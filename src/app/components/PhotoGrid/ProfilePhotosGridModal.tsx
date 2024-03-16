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
        background-color: gray;
        padding: 10px;
    }

        p {
            color: black;
        }
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
                        <p>comments</p>
                    </div>
                </ModalContent>
            </ModalBackdrop>
        </>
    )
}