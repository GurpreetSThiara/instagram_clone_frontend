import { Box, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react"


const TagPopUpMenu = ({isOpen , onClose}) => {
  return (
  
    <Popover
    isOpen={isOpen}
    onClose={onClose}
    >
     

    <Portal>
        
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Button colorScheme='blue'>Button</Button>
        </PopoverBody>
        <PopoverFooter>This is the footer</PopoverFooter>
      </PopoverContent>
    </Portal>
  </Popover>
   
  )
}

export default TagPopUpMenu
