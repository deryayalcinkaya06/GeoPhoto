import React, { useCallback } from "react";

type ShowModalParams = {
  text?: string;
  buttonTitle?: string;
  showCancelButton?: boolean;
  onCancelPress?: () => void;
  onBackdropPress?: () => void;
  onButtonPress?: () => void;
  defaultError?: boolean;
};

export const useModalState = () => {
  const [modalState, setModalState] = React.useState({
    isVisible: false,
    text: "",
    buttonTitle: "",
    showCancelButton: false,
    onCancelPress: () => {},
    onBackdropPress: () => {},
    onButtonPress: () => {},
  });

  const setVisibility = useCallback((visible: boolean) => {
    setModalState((state) => ({ ...state, isVisible: visible }));
  }, []);

  const showModal = useCallback(
    (params: ShowModalParams) => {
      let {
        text,
        buttonTitle,
        onBackdropPress,
        onButtonPress,
        defaultError,
        onCancelPress,
        showCancelButton,
      } = params;

      if (defaultError) {
        text = "İşlem Hatalı";
      }

      setModalState((prevState) => ({
        ...prevState,
        isVisible: true,
        text: text || "Başarılı",
        buttonTitle: buttonTitle ||  "tamam",
        onCancelPress: onCancelPress || (() => setVisibility(false)),
        showCancelButton: showCancelButton || false,
        onButtonPress:
          onButtonPress ||
          (() => {
            setVisibility(false);
          }),
        onBackdropPress:
          onBackdropPress ||
          (() => {
            setVisibility(false);
          }),
      }));
    },
    [setVisibility],
  );

  const hideModal = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  return {
    modalState,
    setVisibility,
    showModal,
    hideModal,
  } as const;
};
