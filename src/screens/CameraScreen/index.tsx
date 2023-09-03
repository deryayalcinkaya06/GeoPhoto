import Box from "../../shared-component/base/box";
import CloseButtonIcon from "../../assets/common/closeButton";
import BaseTouchable from "../../shared-component/base/touchable";
import BaseModal from "../../shared-component/modal/BaseModal";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image, Linking, PermissionsAndroid, Platform,

} from "react-native";
import ImageView from "react-native-image-viewing";
import { useModalState } from "../../store/useModalState";
import Text from "../../shared-component/base/text";
import Button from "../../shared-component/Button";
import DocumentScanner, {
  ScanDocumentOptions,
  ScanDocumentResponseStatus,
} from "react-native-document-scanner-plugin";
import { Divider } from "../../shared-component/Divider";
import { checkMultiple, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'
import { useTypeSafeMutation } from "@/shared-hooks/useTypeSafeMutation";
import { AxiosResponse } from "axios";
import Loading from "@/shared-component/Loading";

export const IMAGE_QUALITY_VALUE = 100;
export const MAX_NUM_PHOTOS = 20;

const CameraScreen = () => {
  const { showModal, modalState } = useModalState();
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [scannedImages, setScannedImages] = useState<string[]>([]);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const {
    mutate: sendLocationToServerMutation,
    isLoading: isLoading,
  } = useTypeSafeMutation("sendLocationToServer", {});

  const SCAN_PHOTO_OPTIONS: ScanDocumentOptions = {
    croppedImageQuality: IMAGE_QUALITY_VALUE,
    maxNumDocuments: MAX_NUM_PHOTOS,
  };

  const checkLocationInfo = async () => {
    let res = null
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      res = await checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
      ])
    } else {
      Geolocation.requestAuthorization();
      res = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      ])
    }
    setLocationPermissionGranted(Object.values(res).some(
      e => e === 'granted' || e === 'limited'
    ));

    if (locationPermissionGranted) {
      senLocationInfoHandler();
    }
  }

  const senLocationInfoHandler = () => {
    Geolocation.getCurrentPosition(
      async (info: any) => {
        console.log('GEOLOCATION', info)
        if (info?.coords) {
          sendLocationToServerMutation(info.coords, {
            onSuccess: () => {
              showModal({
                text: "Transaction success.",
                onButtonPress() {
                },
              });
            },
            onError: (error: AxiosResponse) => {
              if (error.status === 404) {
                showModal({
                  text: "NOT FOUND",
                });
              } else {
                showModal({
                  text: error?.data?.message + "Internal Server Error",
                });
              }
            },
          });
        }
      },
      async () => {
        await fetch('https://ipapi.co/json/')
          .then((response: any) => response.json())
          .then(async (data: any) => {
            const locationInfo = {
              latitude: data.latitude.toString(),
              longitude: data.longitude.toString()
            };
            sendLocationToServerMutation(locationInfo, {
              onSuccess: () => {
                showModal({
                  text: "Transaction success.",
                  onButtonPress() {
                  },
                });
              },
              onError: (error: AxiosResponse) => {
                if (error.status === 404) {
                  showModal({
                    text: "NOT FOUND",
                  });
                } else {
                  showModal({
                    text: error?.data?.message + "Internal Server Error",
                  });
                }
              },
            });
          })
      },
      { enableHighAccuracy: true }
    )
  }

  const scanPhotoHandler = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs access to your camera",
            buttonNeutral: "Ask me later",
            buttonNegative: "Cancel",
            buttonPositive: "Ok",
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const { scannedImages: images } = await DocumentScanner.scanDocument(
            SCAN_PHOTO_OPTIONS,
          );

          // get back an array with scanned image file paths
          if (images) {
            // set the img src, so we can view the first scanned image
            setScannedImages((prevState) => [...prevState, ...images]);
            checkLocationInfo();
          }
        } else {
          showModal({
            text: "Camera permission denied",
          });
        }
      } else {
        const { scannedImages: images, status } =
          await DocumentScanner.scanDocument(SCAN_PHOTO_OPTIONS);
        if (status === ScanDocumentResponseStatus.Success) {
          // get back an array with scanned image file paths
          if (images) {
            // set the img src, so we can view the first scanned image
            setScannedImages((prevState) => [...prevState, ...images]);
            checkLocationInfo();
          }
        }
      }
    } catch (err: any) {
      showModal({
        text: "Something went wrong when starting scanner. Make sure you have given camera permission.",
        buttonTitle: "Go to settings",
        onButtonPress() {
          Linking.openSettings();
        },
        showCancelButton: true,
      });
    }
  };
  const visibleImagesList = scannedImages.map((image) => ({
    uri: image,
  }));
  const onDeleteImage = (index: number) => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            setScannedImages((prevState) =>
              prevState.filter((_, i) => i !== index),
            );
          },
        },
      ],
    );
  };
  return (
    <Box flex={1} bg="backgroundGray">
      <Box flex={1} p="md" marginTop={"lg"}>
        <Box mt="xxl" mx="md" justifyContent={"center"} alignItems={"center"}>
          <Text variant={"h4"} fontWeight={"bold"}>
            {"Take a photo"}
          </Text>
          <Text textAlign={"center"} fontSize={16}>
            {"If you want to take a photo , press the button"}
          </Text>
          {isLoading && <Loading />}
          <Box
            mt="md"
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}>
            <Button
              width={"80%"}
              height={45}
              onPress={scanPhotoHandler}
              label={"New Photo"}
            />
          </Box>
        </Box>

        {scannedImages.length > 0 && (
          <Box flex={0.8} mt="md">
            <Text variant={"h4"} fontWeight={"bold"}>
              {"Taken Photos"}
            </Text>

            <Divider my="sm" width={2} />

            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
              }}
              data={scannedImages}
              renderItem={({ item, index }) => {
                return (
                  <BaseTouchable
                    onPress={() => {
                      setImageViewVisible(true);
                      setVisibleImageIndex(index);
                    }}
                    m="sm"
                    key={index}>
                    <BaseTouchable
                      position={"absolute"}
                      top={-10}
                      right={-10}
                      zIndex={999}
                      width={30}
                      height={30}
                      backgroundColor={"white"}
                      padding={"sm"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      onPress={() => onDeleteImage(index)}
                      borderRadius={"lg"}>
                      <CloseButtonIcon width={15} height={15} />
                    </BaseTouchable>
                    <Image
                      source={{ uri: item }}
                      style={{ width: 100, height: 100, borderRadius: 4 }}
                    />
                  </BaseTouchable>
                );
              }}
              keyExtractor={(_item, index) => index.toString()}
              numColumns={3}
            />
          </Box>
        )}
      </Box>

      <ImageView
        images={visibleImagesList}
        imageIndex={visibleImageIndex}
        visible={imageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
        keyExtractor={(_item, index) => index.toString()}
      />

      <Box flex={0}>
        <BaseModal {...modalState} />
      </Box>
    </Box>
  );
};

export default CameraScreen;
