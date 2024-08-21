export interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}