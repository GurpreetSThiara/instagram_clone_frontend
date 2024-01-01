import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../pages/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
  return (
    !isMobile?
    <Flex>
      {pathName !== "/auth" ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      <Box flex={1} w={{base:"calc(100% - 70px)" , md:"calc(100% - 240px)"}}  >{children}</Box>
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
