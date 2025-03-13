import { Box, Button, Container, Divider, Flex, FormControl, HStack, Input, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddButton from "../components/Button.jsx";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useOrderStore } from "../orders/order.js";
import RealTimePnL from "../components/PnL.jsx";

const Assets = () => {
  const [newOrder, setNewOrder] = useState({
    currency:"",
    pairAddress:"",
    entryPrice:"",
    amountInvested:""
    
  });

  const toast = useToast();
  const { createOrders, fetchOrders, orders } = useOrderStore();

  useEffect(() => 
    {fetchOrders()}, [fetchOrders]);

  const handleSubmitOrder = async() => {
    const {success, message} = await createOrders(newOrder);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 1500,
        isClosable: false,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 1500,
        isClosable: false,
      });
    
      setNewOrder({ currency:"",pairAddress:"", entryPrice:"", amountInvested:"" });
      fetchOrders(); // Re-fetch updated orders
      onClose();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return <Container maxW={"1400px"} px={4}>
    <Flex
      flexDirection={"column"} 
    >
      <Flex
        justifyContent={'flex-end'}
        paddingTop={"15px"}
        paddingRight={"50px"}
        paddingLeft={"50px"}
      >
        <AddButton onClick={onOpen}/>
      </Flex>

      <Flex
        fontFamily={'Nunito, sans-serif'}
        fontSize={"15px"}
        flexDirection={"column"}
        alignItems={"start"}    
        bg={"#10121d"}
        maxH={'440px'}
        minH={'440px'}
        maxW={"60%"}
        borderRadius={'20px'}
        border={'1px solid  rgb(80, 80, 80)'}
        shadow={'2px 2px 10px rgb(49, 49, 49)'}
      >
        <Box w={"full"} maxW={"100%"} maxH={'100%'}>
          <Text
            paddingLeft={'50px'}
            py={'10px'}
            fontSize={{ base:"12", sm:"20"}}
            fontFamily={"Montserrat, sans-serif"}
            fontWeight={"700"}
          >
            Assets
          </Text>
          <HStack width="full" justifyContent="space-between" px={"50px"}>
            <Text w="12%" fontWeight="bold">Token</Text>
            <Text w="12%" fontWeight="bold">Invested</Text>
            <Text w="12%" fontWeight="bold">Sold</Text>
            <Text w="12%" fontWeight="bold">Remaining</Text>
            <Text w="12%" fontWeight="bold">Total PnL</Text>
          </HStack>
          <Divider w={"88%"} ml="40px" mt="10px" borderColor="gray.700" />
          <Box 
            maxH="354px"  // Set max height for scrollability
            overflowY="auto" 
            w="full"
            css={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'transparent transparent',  // Fully transparent initially
              '&:hover': {
              scrollbarColor: 'rgba(95, 92, 92, 0.5) transparent',  // Visible on hover
              },
            }}
          >
            <SimpleGrid spacing={5} width={"full"} paddingTop={5} px={"35px"}>
              {orders.map((order, index) => (
                <Box 
                  width="full"
                  p={2}
                  >
                  <HStack key={index} width="full" justifyContent="space-between" paddingY={1} >
                      {/* Token Image */}
                      <Box w="12%" display="flex" alignItems="center" gap="8px">
                          {order.tokenInfo?.info?.imageUrl? (
                          <img 
                          src={order.tokenInfo.info.imageUrl} 
                          alt={order.tokenInfo.info.imageUrl} 
                          width="40" 
                          height="40"
                          style={{ borderRadius: "50%" }}
                          />
                          ) : (
                          <Text>N/A</Text> // Show "N/A" if image is missing
                          )}

                        <Text w="full" fontSize={13}  whiteSpace="nowrap"  letterSpacing="-0.5px"> 
                          {order.tokenInfo?.baseToken?.symbol || "Unknown Token"}
                        </Text>
                      </Box>

                      {/* Amount Invested */}
                      <Text w="10%">
                      ${parseFloat(order.amountInvested)}
                      </Text>
                      <Text w="9%">0</Text>  {/* Placeholder for Sold */}
                      <Text w="8%">0</Text>  {/* Placeholder for Remaining */}
                      {/* Total PnL with color formatting */}
                      <RealTimePnL order={order} />
                  </HStack>
                   <Divider 
                    borderColor="gray.700" 
                    py={2} 
                    />
                </Box>
                ))}
              </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </Flex>

    {/* Modal */}
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <ModalContent 
          bg={"#10121d"} 
          color={'white'}
          border={'1px solid  rgb(80, 80, 80)'}
          borderRadius={'20px'}
          >
          <ModalHeader textAlign={"center"} fontFamily={'Montserrat, sans-serif'}>BEST OF LUCK!</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6} fontFamily={'Nunito, sans-serif'}>
            <FormControl>
              <Input
                bg={'gray.100'} 
                placeholder='Token Name'
                name = 'currency'
                type="string"
                value={newOrder.currency}
                onChange={(e) => setNewOrder({ ...newOrder, currency: e.target.value})}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input 
                bg={'gray.100'} 
                placeholder='CA e.g.0x727458212ca0be056d...'
                name = 'pairAddress'
                type="string"
                value={newOrder.pairAddress}
                onChange={(e) => setNewOrder({ ...newOrder, pairAddress: e.target.value})}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input placeholder='Entry Price'
                bg={'gray.100'} 
                name = 'entrPrice'
                type = 'number'
                value={newOrder.entryPrice}
                onChange={(e) => setNewOrder({ ...newOrder, entryPrice: e.target.value})}
              />
            </FormControl>


            <FormControl mt={4}>
              <Input placeholder='Margin'
                bg={'gray.100'} 
                name = 'margin'
                type = 'number'
                value={newOrder.amountInvested}
                onChange={(e) => setNewOrder({ ...newOrder, amountInvested: e.target.value})}
                />
            </FormControl>

          </ModalBody>
          <ModalFooter fontFamily={'Nunito, sans-serif'}>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' 
              bg={"white"}
              _hover={{ bg:'gray.300'}}
              border={"1px"} 
              borderColor={"gray.300"}
              onClick={handleSubmitOrder}
            >Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Container>
};
export default Assets