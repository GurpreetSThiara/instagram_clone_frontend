import { Toast } from "@chakra-ui/react";

const useShowToast = () => {
  const showToast = (title, description, status) => {
    Toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToast;
