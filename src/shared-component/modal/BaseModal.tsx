import React, { Fragment } from "react";
// import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import Box from "../base/box";
import Text from "../base/text";
import Button from "../Button/index";
import Center from "../base/center";

export type BaseModalProps = {
  isVisible: boolean;
  text?: string;
  showCancelButton?: boolean;
  onCancelPress?: () => void;
  onButtonPress?: () => void;
  onBackdropPress?: () => void;
  buttonTitle?: string;
};

// const { height } = Dimensions.get("window");

const BaseModal: React.FC<BaseModalProps> = ({
  onBackdropPress,
  onButtonPress,
  isVisible,
  text: title,
  buttonTitle,
  showCancelButton,
  onCancelPress,
}) => {
  return (
    <Box>
      <Modal
        style={{
          margin: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        // onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackdropPress}
        isVisible={isVisible}>
        <Box
          bg={"white"}
          style={{}}
          borderRadius={"xs"}
          px="md"
          height={"auto"}
          minHeight={150}
          flexDirection={"column"}
          width={"85%"}>
          <Box
            style={{
              marginVertical: 18,
              minHeight: 60,
            }}
            paddingHorizontal="sm"
            justifyContent="center"
            alignItems={"center"}>
            <Text
              textAlign={"center"}
              lineHeight={20}
              fontWeight={"500"}
              color={"textBase"}
              testID="modalText">
              {title ? title : "Transaction success"}
            </Text>
          </Box>

          <Box
            justifyContent={"flex-end"}
            flexDirection={"row"}
            alignItems="flex-end"
            style={{
              marginBottom: 16,
            }}
            width={"100%"}>
            {showCancelButton ? (
              <Fragment>
                <Center flex={1}>

                  <Button
                    width={"90%"}
                    variant={"secondary"}
                    label={"Cancel"}
                    onPress={onCancelPress}
                    height={35}
                    labelProps={{ fontSize: 14 }}
                    testID="modalCancelButton"
                  />
                </Center>
                <Center flex={1}>

                  <Button
                    ml="sm"
                    width={"90%"}
                    variant={"primary"}
                    label={buttonTitle ? buttonTitle : "Ok"}
                    onPress={onButtonPress}
                    height={35}
                    labelProps={{ fontSize: 14 }}
                    testID="modalOkButton"
                  />
                </Center>
              </Fragment>
            ) : (
              <Center flex={1}>

                <Button
                  width={"80%"}
                  variant={"primary"}
                  label={buttonTitle ? buttonTitle : "Ok"}
                  onPress={onButtonPress}
                  height={35}
                  labelProps={{ fontSize: 14 }}
                  testID="modalOkButton"
                />
              </Center>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BaseModal;
