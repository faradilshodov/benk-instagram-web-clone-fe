"use client";
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
  width: 50%;
  height: 35%;
  margin: auto;
  border-radius: 10px;
`;

const CustomFileInputContainer = styled.div``;

const SelectFileButton = styled.label``;

const FileNameDisplay = styled.span``;

const CustomTextInput = styled.input``;

const SubmitButton = styled.button``;

export default function UploadModal() {
  return (
    <>
      <ModalBackdrop>
        <UploadModalContent>
          <h1>Upload a video story or photo post</h1>
          <hr />

          <CustomFileInputContainer>
            <input type="file" id="file-upload" style={{ display: "none" }} />
            <SelectFileButton htmlFor="file-upload">
              Select from your computer
            </SelectFileButton>

            <FileNameDisplay>File name here</FileNameDisplay>

            <CustomTextInput
              type="text"
              placeholder="If photo, enter caption. If video, enter title."
            />

            <SubmitButton type="submit">Submit</SubmitButton>
          </CustomFileInputContainer>
        </UploadModalContent>
      </ModalBackdrop>
    </>
  );
}
