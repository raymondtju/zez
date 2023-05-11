"use client";

import { useRef, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { qrCode } from "@/components/qr-code";
import useQRDialog from "@/hooks/useQRDialog";

const DialogQR = ({ url }: { url: string }) => {
  const qr = qrCode();
  const ref = useRef(null);
  const qrDialog = useQRDialog();

  const id = url.split("/")[3];

  useEffect(() => {
    qr.update({ data: url });
    qr.append(ref.current);
  }, [qr, url]);
  
  useEffect(() => {
    qr.append(ref.current)
  }, [qr])

  const handleDownload = () => {
    qr.download({
      name: `QR-${id}`,
    });
  };

  return (
    <>
      <Dialog open={qrDialog.isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Your QR</DialogTitle>
          </DialogHeader>
          <div ref={ref} className="flex justify-center" />
          <span className="-mt-5 text-center text-sm">{url}</span>
          <div className="flex justify-center font-bold">
            <button
              className="mx-auto rounded-lg bg-zinc-900 px-4 py-1 text-zinc-100 hover:bg-zinc-600"
              onClick={() => handleDownload()}
            >
              Download
            </button>
            <button
              className="mx-auto rounded-lg border-2 border-zinc-900 px-4 py-1 text-center"
              onClick={() => {
                qrDialog.onClose();
              }}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogQR;
