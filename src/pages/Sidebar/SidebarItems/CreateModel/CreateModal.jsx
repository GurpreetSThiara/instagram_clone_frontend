import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  IconButton,
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
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import UploadFile from "./UploadFile";
import { FaArrowLeft, FaCrop } from 'react-icons/fa';
import useUploadFileStore from "../../../../store/uploadFileStore";
import { CloseIcon } from '@chakra-ui/icons';
import { filterValues } from "./ModalUtils";
import './filters.css';
import useAuthStore from "../../../../store/authStore";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import useShowToast from "../../../../hooks/useShowToast";
import useCreatePost from "../../../../hooks/useCreatePost";

const CreateModal = ({ isOpen, onClose }) => {
  const showToast = useShowToast();
  const fileInputRef = useRef(null);
  const [selecedFile, setSelectedFile] = useState(null);
  const [iSt, setISt] = useState(null);
  const image = useUploadFileStore(s=>s.image)
  const removeImage = useUploadFileStore(s=>s.removeImage)
  const [selectedFilter , setSelectedFilter] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [showForm , setShowForm] = useState(false);
  const user = useAuthStore(s=>s.user);
  const [aspectRatioModalOpen, setAspectRatioModalOpen] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const imgResultRef = useRef(null);
  const { isLoading, handleCreatePost } = useCreatePost();
  const [caption , setCaption] = useState("");


  // State for storing the selected aspect ratio
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(1);
  const handlePostCreation = async () => {
 
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imgResultRef.current;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = selectedFilter; // Apply the selected filter
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Get the modified image data as a data URL
    const modifiedImageDataUrl = canvas.toDataURL('image/jpeg');
    
		try {
			await handleCreatePost(modifiedImageDataUrl, caption);
			// onClose();
			// setCaption("");
			setSelectedFile(null);
      removeImage(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};
  

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
  const handleAspectRatioSelect = (aspectRatio) => {
    setSelectedAspectRatio(aspectRatio);
    setAspectRatioModalOpen(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}  size={image?isMobile?'full':800:null}>
    <ModalOverlay />
    <ModalContent backgroundColor="#262626" borderRadius={15} w={image?'auto':'full'} h={image?isMobile?'auto':'auto':'400px'} m={'8'}   alignSelf={'center'} overflow={'auto'} >
      <ModalHeader borderBottom="1px solid #363636">
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          {image && <Icon as={FaArrowLeft} boxSize={6} cursor="pointer" onClick={() => {
            showForm?setShowForm(false):removeImage(null)
          }} />}
          <Text fontSize="16px" textAlign="center" flex="1">
            {!image ? "Create new post" : "Edit"}
          </Text>
         {!showForm && image &&  <Button backgroundColor={'transparent'} color={'blue.500'} _hover={{backgroundColor:"transparent",color:"white"}} onClick={()=>{
          setShowForm(true)
         }}>Next</Button>}
            {showForm && image &&  <Button backgroundColor={'transparent'} color={'blue.500'} _hover={{backgroundColor:"transparent",color:"white"}} onClick={()=>{
         handlePostCreation();
         }}>Share</Button>}

        </Flex>
      </ModalHeader>
  
      <ModalBody alignItems="center" justifyContent="center" display="flex" overflow="auto" >
        {!image ? (
          <UploadFile />
        ) : (
          <Flex flexDirection={isMobile?'column':null} alignItems={showForm?null:'center'}  overflow={'auto'}>
            <Box h={'auto'}>
            {/* <ReactCrop
            src={image}
            crop={crop}
            onChange={(newCrop) =>{}}
            onComplete={(crop, pixelCrop) => {}}
          /> */}
              <img  ref={imgResultRef} height={400} width={400} style={{fit:"contain",aspectRatio:selectedAspectRatio}}     src={image}  alt="Selected Image" className={selectedFilter} overflow={'auto'} />
            </Box>
        {!showForm &&  <Box h={400}>
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
             {<Grid w={300} templateColumns="repeat(3, 1fr)" gap={4} cursor={'pointer'} overflow={'auto'}  >
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
         </Box>}
         {showForm && <Box justifyContent={'flex-start'} alignItems={'flex-start'} minW={'300px'}>
          <Flex justifyContent={'flex-start'} alignItems={'center'} gap={3} m={2}>
            <Avatar src={user.profilePicUrl} alt={user.username}/>
            <Text fontWeight={'bold'}>{user.username}</Text>
          </Flex>
          <Box>
            <Textarea onChange={(e) => setCaption(e.target.value)}  placeholder="Write a caption.." maxLength={200} border={'null'}/>
          </Box>
          </Box>}
          </Flex>
        )}
      </ModalBody>
      <ModalFooter>
      <IconButton
            icon={<FaCrop />}
            onClick={() => setAspectRatioModalOpen(true)}
            aria-label="Aspect Ratio"
            variant="ghost"
          />
             <Modal isOpen={aspectRatioModalOpen} onClose={() => setAspectRatioModalOpen(false)} size="xs">
        <ModalOverlay />
        <ModalContent backgroundColor="#262626" borderRadius={15} p={4}>
          <ModalHeader borderBottom="1px solid #363636">
            <Text fontSize="16px" textAlign="center" flex="1">
              Select Aspect Ratio
            </Text>
          </ModalHeader>
          <ModalBody>
            {/* Buttons for different aspect ratios */}
            <Flex justifyContent="space-around" flexDirection={'column'} gap={2}>
              <Button backgroundColor={'transparent'} onClick={() => handleAspectRatioSelect('')}>original</Button>
              <Button backgroundColor={'transparent'} onClick={() => handleAspectRatioSelect(1)}>1:1</Button>
              <Button backgroundColor={'transparent'} onClick={() => handleAspectRatioSelect(16/9)}>16:9</Button>
              <Button backgroundColor={'transparent'} onClick={() => handleAspectRatioSelect(4/3)}>4:3</Button>
              <Button backgroundColor={'transparent'} onClick={() => handleAspectRatioSelect(3/2)}>3:2</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      </ModalFooter>
    </ModalContent>
  </Modal>
  
  
  );
};

export default CreateModal;
