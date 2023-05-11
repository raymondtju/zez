import { create } from 'zustand';

interface QRDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useQRDialog = create<QRDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useQRDialog;