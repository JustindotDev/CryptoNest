import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const showToast = ({
  description,
  status = "info",
  duration = 2000,
}) => {
  toast({
    description,
    status,
    duration,
    isClosable: false,
    position: "top",
  });
};
