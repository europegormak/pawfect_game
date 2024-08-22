export interface ModalProps {
    isSuccessful: boolean;
    isOpen: boolean;
    message: JSX.Element;
    onClose: () => void;
}