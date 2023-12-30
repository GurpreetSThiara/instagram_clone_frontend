import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../pages/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const PageLayouts = ({ children }) => {
  const pathName = useLocation();
  return (
    <Flex>
      {pathName !== "/auth" ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      <Box flex={1} w={{base:"calc(100% - 70px)" , md:"calc(100% - 240px)"}}  >{children}</Box>
    </Flex>
  );
};

export default PageLayouts;
