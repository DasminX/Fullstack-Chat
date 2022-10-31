import { Flex, Input } from "@chakra-ui/react";
import React from "react";
import { AuthFormInputFCRefType } from "../../types/componentsTypes";

export const AuthFormInput: AuthFormInputFCRefType = React.forwardRef(
  ({ inputName, inputType }, forwardedRef) => (
    <Flex my="4" direction="column" textAlign="center">
      <label className="basis-1/4 w-full" htmlFor={inputName}>
        {inputName}
      </label>
      <Input
        ref={forwardedRef}
        type={inputType}
        id={inputName}
        flexBasis="50%"
        w="75%"
        mx="auto"
        px="2"
        py="1"
        rounded="md"
        variant={"filled"}
        errorBorderColor="red.300"
        className="bg-gray-100 text-black focus-within:text-white"
      />
    </Flex>
  )
);
