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
import { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <Modal isOpen={isOpen} onClose={onClose}  size={image?isMobile?'full':800:null}>
    <ModalOverlay />
    <ModalContent backgroundColor="#262626" borderRadius={15} w={image?'auto':'full'} h={image?isMobile?'auto':'auto':'400px'} m={'8'}   alignSelf={'center'} overflow={'auto'} >
      <ModalHeader borderBottom="1px solid #363636">
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          {image && <Icon as={FaArrowLeft} boxSize={6} cursor="pointer" onClick={() => {}} />}
          <Text fontSize="16px" textAlign="center" flex="1">
            {!image ? "Create new post" : "Edit"}
          </Text>
         {image &&  <Button backgroundColor={'transparent'} color={'blue.500'} _hover={{backgroundColor:"transparent",color:"white"}}>Next</Button>}

        </Flex>
      </ModalHeader>
  
      <ModalBody alignItems="center" justifyContent="center" display="flex" overflow="auto" >
        {!image ? (
          <UploadFile />
        ) : (
          <Flex flexDirection={isMobile?'column':null} alignItems={'center'}  overflow={'auto'}>
            <Box h={'auto'}>
              <Image alignSelf={'center'} h={isMobile?300:480} src={image} fit="contain" alt="Selected Image" className={selectedFilter} overflow={'auto'} />
            </Box>
         <Box h={400}>
         <Tabs fit='contain'>
              <TabList>
                <Tab>
                  <Box w={120}>Filters</Box>
                </Tab>
                <Tab>
                  <Box w={120}>Adjustments</Box>
                </Tab>
              </TabList>
  
              <TabPanels>
                <TabPanel>
               <Box overflow={'auto'} h={400}>
             {   <Grid w={300} templateColumns="repeat(3, 1fr)" gap={4} cursor={'pointer'} overflow={'auto'}  >
                    {filterValues.map((filter, index) => (
                      <Box onClick={()=>{setSelectedFilter(filter.class)}} key={index} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                        <Image h={100} src={image} className={filter.class} />
                        <Text color={'#A5A5A5'} fontSize={'small'}>
                          {filter.name}
                        </Text>
                      </Box>
                    ))}
                      </Grid>}
                
                
             
                
               </Box>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
         </Box>
          </Flex>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
  
  
  );
};

export default CreateModal;
