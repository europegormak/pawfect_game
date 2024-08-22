export interface ModalProps {
    isOpen: boolean;
    message: JSX.Element;
    onClose: () => void;
}