import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import UploadFile from "./UploadFile";
import { FaArrowLeft } from 'react-icons/fa';
import useUploadFileStore from "../../../../store/uploadFileStore";
import { CloseIcon } from '@chakra-ui/icons';
import { filterValues } from "./ModalUtils";
import './filters.css';

const CreateModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [selecedFile, setSelectedFile] = useState(null);
  const [iSt, setISt] = useState(null);
  const image = useUploadFileStore(s=>s.image)
  const [selectedFilter , setSelectedFilter] = useState("");

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
    <Modal isOpen={isOpen} onClose={onClose} size={'full'} h={'500px'}>
    <ModalOverlay />
    <ModalContent backgroundColor="#262626" borderRadius={15} w={'auto'} h={'520px'}>
      <ModalHeader borderBottom="1px solid #363636">
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          {image && <Icon as={FaArrowLeft} boxSize={6} cursor="pointer" onClick={() => {}} />}
          <Text fontSize="16px" textAlign="center" flex="1">
            {!image ? "Create new post" : "Edit"}
          </Text>
        </Flex>
      </ModalHeader>
  
      <ModalBody alignItems="center" justifyContent="center" display="flex" overflow="hidden">
        {!image ? (
          <UploadFile />
        ) : (
          <Flex>
            <Box>
              <Image h={520} src={image} fit="contain" alt="Selected Image" className={selectedFilter} />
            </Box>
            <Tabs>
              <TabList>
                <Tab>
                  <Box w={120}>Filters</Box>
                </Tab>
                <Tab>
                  <Box w={120}>Adjustments</Box>
                </Tab>
              </TabList>
  
              <TabPanels>
                <TabPanel overflow={'auto'}>
               <Box overflow={'auto'} h={500}>
               <Grid templateColumns="repeat(3, 1fr)" gap={4} cursor={'pointer'} overflow={'auto'}>
                    {filterValues.map((filter, index) => (
                      <Box onClick={()=>{setSelectedFilter(filter.class)}} key={index} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                        <Image boxSize="100px" src={image} className={filter.class} />
                        <Text color={'#A5A5A5'} fontSize={'small'}>
                          {filter.name}
                        </Text>
                      </Box>
                    ))}
                  </Grid>
               </Box>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
  
  
  );
};

export default CreateModal;
