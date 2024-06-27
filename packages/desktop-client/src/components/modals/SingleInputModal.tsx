// @ts-strict-ignore
import React, {
  useState,
  type ComponentType,
  type ComponentPropsWithoutRef,
} from 'react';

import { styles } from '../../style';
import { Button } from '../common/Button';
import { FormError } from '../common/FormError';
import { InitialFocus } from '../common/InitialFocus';
import { Modal, ModalCloseButton, type ModalHeader } from '../common/Modal2';
import { View } from '../common/View';
import { InputField } from '../mobile/MobileForms';
import { type CommonModalProps } from '../Modals';

type SingleInputModalProps = {
  modalProps: Partial<CommonModalProps>;
  Header: ComponentType<ComponentPropsWithoutRef<typeof ModalHeader>>;
  buttonText: string;
  onSubmit: (value: string) => void;
  onValidate?: (value: string) => string[];
  inputPlaceholder?: string;
};

export function SingleInputModal({
  modalProps,
  Header,
  buttonText,
  onSubmit,
  onValidate,
  inputPlaceholder,
}: SingleInputModalProps) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const _onSubmit = value => {
    const error = onValidate?.(value);
    if (error) {
      setErrorMessage(error);
      return;
    }

    onSubmit?.(value);
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      {({ close }) => (
        <>
          <Header rightContent={<ModalCloseButton onClick={close} />} />
          <View>
            <InitialFocus>
              <InputField
                placeholder={inputPlaceholder}
                defaultValue={value}
                onUpdate={setValue}
                onEnter={e => _onSubmit(e.currentTarget.value)}
              />
            </InitialFocus>
            {errorMessage && (
              <FormError
                style={{
                  paddingTop: 5,
                  marginLeft: styles.mobileEditingPadding,
                  marginRight: styles.mobileEditingPadding,
                }}
              >
                * {errorMessage}
              </FormError>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}
          >
            <Button
              type="primary"
              style={{
                height: styles.mobileMinHeight,
                marginLeft: styles.mobileEditingPadding,
                marginRight: styles.mobileEditingPadding,
              }}
              onClick={() => _onSubmit(value)}
            >
              {buttonText}
            </Button>
          </View>
        </>
      )}
    </Modal>
  );
}
