import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../pages/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Firebase";

const PageLayouts = ({ children }) => {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pathName = useLocation();
  const [user,loading,error] = useAuthState(auth);
  const canRenderSidebar= user && pathName !== "/auth"  ; 
  return (
    !isMobile?
    <Flex position={'relative'}>
      {canRenderSidebar? (
        <Box position="fixed" zIndex={2} >
          <Sidebar />
        </Box>
      ) : null}
      <Box  overflowY="auto" position={'absolute'} ml={{base:"70px",md:"240px"}} zIndex={1} flex={1} w={{base:"calc(100% - 70px)" , md:"calc(100% - 240px)"}}  >{children}</Box>
    </Flex>:


<>
<Box flex={1} w={"full"}  >{children}</Box>
  {pathName !== "/auth" ? (
      <Box w={"full"} position="fixed" bottom="0" left="0" width="100%">
    <Sidebar/>
      
    </Box>
  ) : null}
</>

  );
};

export default PageLayouts;
