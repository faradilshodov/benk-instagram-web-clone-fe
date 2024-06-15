"use client";
import { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 25;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const UploadModalContent = styled.div`
  max-width: 50%;
  max-height: 35%;
  background-color: #1e1e1e;
  margin: auto;
  border-radius: 10px;
  padding: 30px;

  h1 {
    color: white;
    text-align: center;
  }

  hr {
    border: none;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CustomFileInputContainer = styled.div`
  display: grid;
`;

const SelectFileButton = styled.label`
  background-color: #0095f6;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
`;

interface FileNameDisplayProps {
  isFileChosen: boolean;
}

const FileNameDisplay = styled.span<FileNameDisplayProps>`
  color: ${(props) => (props.isFileChosen ? "white" : "red")};
  font-size: 12px;
  margin-top: 5px;
  overflow: hidden;
`;

const CustomTextInput = styled.input`
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: green;
  border: none;
  border-radius: 3px;
  padding: 3px 5px;
  color: white;
`;

interface UploadModalProps {
  toggleUploadModal: () => void;
  isModalOpen: boolean;
  onUploadSuccess: () => void;
}

export default function UploadModal({
  toggleUploadModal,
  isModalOpen,
  onUploadSuccess,
}: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    // validate wether there is an actual file to upload
    if (!file) {
      alert("Please, select a video or image from your file system");
      return;
    }
    // add dynamic logic that builds one single fetch request rather than two

    let formField: string = "";
    let uploadEndpoint: string = "";

    const mimeType: string = file.type;

    if (mimeType.startsWith("image/")) {
      formField = "image";
      uploadEndpoint = "posts";
    } else if (mimeType.startsWith("video/")) {
      formField = "video";
      uploadEndpoint = "stories";
    } else {
      alert(
        "You can only select photos for the photo feed or videos for the stories grid"
      );
      return;
    }

    const formData: FormData = new FormData();
    formData.append(formField, file);
    formData.append(formField === "image" ? "caption" : "title", text);

    try {
      const response = await fetch(
        `https://jan24-jilhslxp5q-uc.a.run.app/api/${uploadEndpoint}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error uploading a file");
      }

      // hide the modal
      toggleUploadModal();
      // reload the respective component
      onUploadSuccess();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalBackdrop onClick={toggleUploadModal}>
          <UploadModalContent onClick={(e) => e.stopPropagation()}>
            <h1>Upload a video story or photo post</h1>
            <hr />

            <CustomFileInputContainer>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <SelectFileButton htmlFor="file-upload">
                Select from your computer
              </SelectFileButton>

              <FileNameDisplay isFileChosen={file !== null}>
                {file ? file.name : "No file chosen"}
              </FileNameDisplay>

              <CustomTextInput
                type="text"
                placeholder="If photo, enter caption. If video, enter title."
                onChange={handleTextChange}
              />

              <SubmitButton type="submit" onClick={handleSubmit}>
                Submit
              </SubmitButton>
            </CustomFileInputContainer>
          </UploadModalContent>
        </ModalBackdrop>
      )}
    </>
  );
}
