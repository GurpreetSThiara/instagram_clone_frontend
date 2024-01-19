import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import UploadFile from "./UploadFile";
import useUploadFileStore from "../../../../store/uploadFileStore";

const CreateModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [selecedFile, setSelectedFile] = useState(null);
  const [iSt, setISt] = useState(null);
  const image = useUploadFileStore(s=>s.image)

  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const inputFile = event.target.files[0];

    // Pass the selected file to the parent component or handle it as needed
    if (inputFile) {
        const reader = new FileReader();
        reader.onload = () => {
          // Update the state with the data URL
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(inputFile);
        setISt(true)
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent
        height={"431px"}
        backgroundColor={"#262626"}
        borderRadius={15}
      >
        <ModalHeader borderBottom={"1px solid #363636"}>
          <Text
            fontSize={"16px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            Create new post
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          {!image ? (
           <UploadFile/>
          ) : (
            <Box>
              <img
                src={image}
                alt="Selected Image"
              />
            </Box>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
