import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { useOrderStore } from "../orders/order.jsx";
import RealTimePnL from "../components/PnL.jsx";
import axios from "axios";
import History from "../components/History.jsx";

const Assets = () => {
  const [newOrder, setNewOrder] = useState({
    currency: "",
    pairAddress: "",
    entryPrice: "",
    amountInvested: "",
  });

  const [sellPrice, setSellPrice] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for closing
  const toast = useToast();
  const {
    createOrders,
    fetchOrders,
    orders,
    remainingBalance,
    fetchRemainingBalance,
  } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      fetchRemainingBalance();
    }
  }, [orders, fetchRemainingBalance]);

  // Add order Button
  const handleSubmitOrder = async () => {
    const { success, message } = await createOrders(newOrder);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: false,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 1500,
        isClosable: false,
      });

      setNewOrder({
        currency: "",
        pairAddress: "",
        entryPrice: "",
        amountInvested: "",
      });
      fetchOrders(); // Re-fetch updated orders
      onClose();
    }
  };

  // Sell Button
  const handleSellOrder = async () => {
    if (!selectedOrder || isNaN(parseFloat(sellPrice))) {
      toast({
        title: "Error",
        description: "Please enter the selling price",
        status: "error",
        duration: 1500,
        isClosable: false,
      });
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/sell/${selectedOrder._id}`,
        { sellPrice: parseFloat(sellPrice) } // Convert input to number
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      toast({
        title: "Success",
        description: "Order sold successfully!",
        status: "success",
        duration: 1500,
        isClosable: false,
      });

      fetchOrders(); // Refresh orders
      onCloseModalClose(); // Close modal
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to sell order",
        status: "error",
        duration: 1500,
        isClosable: false,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCloseModalOpen,
    onOpen: onCloseModalOpen,
    onClose: onCloseModalClose,
  } = useDisclosure();

  return (
    <Container maxW={"1400px"}>
      <Flex flexDirection={"column"}>
        <Flex
          justifyContent={"flex-end"}
          paddingTop={"15px"}
          paddingRight={"50px"}
          paddingLeft={"50px"}
        >
          <AddButton onClick={onOpen} />
        </Flex>
        <Flex mt={"10px"}>
          <Flex
            fontFamily={"Nunito, sans-serif"}
            fontSize={"15px"}
            alignItems={"start"}
            bg={"#10121d"}
            maxH={"440px"}
            minH={"440px"}
            maxW={"60%"}
            minW={"60%"}
            borderRadius={"20px"}
            border={"1px solid  rgb(80, 80, 80)"}
            shadow={"2px 2px 10px rgb(49, 49, 49)"}
          >
            <Box w={"full"} maxW={"100%"} maxH={"100%"}>
              <Text
                paddingLeft={"50px"}
                py={"10px"}
                fontSize={{ base: "12", sm: "20" }}
                fontFamily={"Montserrat, sans-serif"}
                fontWeight={"700"}
              >
                Assets
              </Text>
              <HStack width="full" pr={"80px"} pl={"50px"}>
                <Text w="12%" fontWeight="bold" marginRight={"70px"}>
                  Token
                </Text>
                <Text w="12%" fontWeight="bold" marginRight={"40px"}>
                  Invested
                </Text>
                <Text w="12%" fontWeight="bold" marginRight={"40px"}>
                  Sold
                </Text>
                <Text w="12%" fontWeight="bold" marginRight={"40px"}>
                  Remaining
                </Text>
                <Text w="12%" fontWeight="bold">
                  Total PnL
                </Text>
              </HStack>
              <Divider w={"88%"} ml="40px" mt="10px" borderColor="gray.700" />
              <Box
                maxH="354px" // Set max height for scrollability
                overflowY="auto"
                w="full"
                css={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "transparent transparent", // Fully transparent initially
                  "&:hover": {
                    scrollbarColor: "rgba(95, 92, 92, 0.5) transparent", // Visible on hover
                  },
                }}
              >
                <SimpleGrid
                  spacing={5}
                  width={"full"}
                  paddingTop={5}
                  px={"35px"}
                >
                  {orders.map((order, index) => (
                    <Box width="full" p={2}>
                      <HStack key={index} width="full" paddingY={1}>
                        {/* Token Image */}
                        <Box
                          w="12%"
                          display="flex"
                          alignItems="center"
                          gap="8px"
                        >
                          {order.tokenInfo?.info?.imageUrl ? (
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

                          <Text
                            w="full"
                            fontSize={13}
                            whiteSpace="nowrap"
                            letterSpacing="-0.5px"
                          >
                            {order.tokenInfo?.baseToken?.symbol ||
                              "Unknown Token"}
                          </Text>
                        </Box>
                        {/* Amount Invested */}
                        <Text w="10%" marginLeft={"80px"}>
                          ${parseFloat(order.amountInvested)}
                        </Text>
                        {/* Placeholder for Sold */}
                        <Text w="9%" marginLeft={"30px"}>
                          ${order.gains ? order.gains.toFixed(2) : "0"}
                        </Text>{" "}
                        {/* Placeholder for Remaining */}
                        <Text w="9%" marginLeft={"70px"}>
                          $
                          {Number.isInteger(
                            Number(remainingBalance[order.pairAddress])
                          )
                            ? Number(remainingBalance[order.pairAddress])
                            : Number(
                                remainingBalance[order.pairAddress] || 0
                              ).toFixed(2)}
                        </Text>
                        {/* Total PnL with color formatting */}
                        <RealTimePnL order={order} />
                        <Text
                          fontSize={"12px"}
                          color={"rgb(8, 252, 232)"}
                          _hover={{ color: "rgb(6, 190, 175)" }}
                          cursor={"pointer"}
                          onClick={() => {
                            setSelectedOrder(order);
                            onCloseModalOpen();
                          }}
                        >
                          Close
                        </Text>
                      </HStack>
                      <Divider borderColor="gray.700" py={2} />
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Flex>
          <History />
        </Flex>
      </Flex>

      {/* Add Order Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"#10121d"}
          color={"white"}
          border={"1px solid  rgb(80, 80, 80)"}
          borderRadius={"20px"}
        >
          <ModalHeader
            textAlign={"center"}
            fontFamily={"Montserrat, sans-serif"}
          >
            BEST OF LUCK!
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6} fontFamily={"Nunito, sans-serif"}>
            <FormControl>
              <FormLabel>Token</FormLabel>
              <Input
                color={"black"}
                bg={"gray.100"}
                placeholder="Token Name"
                _placeholder={{ fontSize: "14px" }}
                name="currency"
                type="string"
                value={newOrder.currency}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, currency: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Contract Address</FormLabel>
              <Input
                color={"black"}
                bg={"gray.100"}
                placeholder="CA e.g.0x727458212ca0be056d..."
                _placeholder={{ fontSize: "14px" }}
                name="pairAddress"
                type="string"
                value={newOrder.pairAddress}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, pairAddress: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Entry Price</FormLabel>
              <Input
                color={"black"}
                placeholder="Entry Price"
                _placeholder={{ fontSize: "14px" }}
                bg={"gray.100"}
                name="entrPrice"
                type="number"
                value={newOrder.entryPrice}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, entryPrice: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Margin</FormLabel>
              <Input
                color={"black"}
                placeholder="Margin"
                _placeholder={{ fontSize: "14px" }}
                bg={"gray.100"}
                name="margin"
                type="number"
                value={newOrder.amountInvested}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, amountInvested: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter fontFamily={"Nunito, sans-serif"}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setNewOrder({
                  currency: "",
                  pairAddress: "",
                  entryPrice: "",
                  amountInvested: "",
                });
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              bg={"white"}
              _hover={{ bg: "gray.300" }}
              border={"1px"}
              borderColor={"gray.300"}
              onClick={handleSubmitOrder}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* close button Modal */}
      <Modal isOpen={isCloseModalOpen} onClose={onCloseModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={"#10121d"}
          color={"white"}
          border={"1px solid  rgb(80, 80, 80)"}
          borderRadius={"20px"}
        >
          <ModalCloseButton />

          <ModalBody pb={6} fontFamily={"Nunito, sans-serif"} mt={10}>
            <FormControl>
              <FormLabel>Selling Price</FormLabel>
              <Input
                bg={"gray.100"}
                placeholder="Enter price"
                _placeholder={{ fontSize: "14px" }}
                name="sellPrice"
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter fontFamily={"Nunito, sans-serif"}>
            <Button colorScheme="blue" mr={3} onClick={onCloseModalClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              bg={"white"}
              _hover={{ bg: "gray.300" }}
              border={"1px"}
              borderColor={"gray.300"}
              onClick={handleSellOrder}
            >
              Sell
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
export default Assets;
