import { zezLogo } from "@/lib/const";

export function qrCode() {
  if (typeof window !== "undefined") {
    const QRCodeStyling = require("qr-code-styling");
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      margin: 10,
      qrOptions: {
        typeNumber: "0",
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
      },
      dotsOptions: {
        type: "extra-rounded",
        color: "#000000",
        gradient: null,
      },
      backgroundOptions: { color: "#ffffff", gradient: null },
      image: zezLogo,
      dotsOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
          linear: true,
          radial: false,
          color1: "#6a1a4c",
          color2: "#6a1a4c",
          rotation: "0",
        },
      },
      cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
      cornersSquareOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
          linear: true,
          radial: false,
          color1: "#000000",
          color2: "#000000",
          rotation: "0",
        },
      },
      cornersDotOptions: { type: "", color: "#000000" },
      cornersDotOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
          linear: true,
          radial: false,
          color1: "#000000",
          color2: "#000000",
          rotation: "0",
        },
      },
      backgroundOptionsHelper: {
        colorType: { single: true, gradient: false },
        gradient: {
          linear: true,
          radial: false,
          color1: "#ffffff",
          color2: "#ffffff",
          rotation: "0",
        },
      },
    });
    return qrCode;
  }
  return null;
}
