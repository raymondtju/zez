// export type QRCodeOptions = {
//   type: "svg" | "canvas";
//   width: number;
//   height: number;
//   margin: number;
//   qrOptions: {
//     typeNumber: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
//     mode: "Byte" | "AlphaNumeric" | "Numeric";
//     errorCorrectionLevel: "L" | "M" | "Q" | "H";
//   };
//   imageOptions: {
//     hideBackgroundDots: boolean;

//     imageSize: number;
//     margin: number;
//   };
//   dotsOptions: {
//     type: "rounded" | "extra-rounded" | "square";
//     color: string;
//     gradient: null;
//   };
//   backgroundOptions: {
//     color: string;
//     gradient: null;
//   };
//   image: string;
//   dotsOptionsHelper: any;

//   cornersSquareOptions: any;
//   cornersSquareOptionsHelper: any;
//   cornersDotOptions: any;
//   cornersDotOptionsHelper: any;
//   backgroundOptionsHelper: any;
// };
export function useQrCode(): any {
  if (typeof window !== "undefined") {
    const QRCodeStyling = require("qr-code-styling");
    const qrCode = new QRCodeStyling({
      type: "svg",
      width: 200,
      height: 200,
      margin: 10,
      qrOptions: {
        typeNumber: "0",
        mode: "Byte",
        errorCorrectionLevel: "L",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 1,
        margin: 0,
      },
      dotsOptions: {
        type: "extra-rounded",
        color: "#000000",
        gradient: null,
      },
      backgroundOptions: { color: "#ffffff", gradient: null },
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA0MCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNzE2IDlMMS45NjggNy4zOTJMMi45NzYgNi40NjhMNC4xMTYgOUg1LjYyOEw0LjA2OCA1LjUzMkw2LjY5NiAzLjA3Mkg0LjkwOEwyLjI2OCA1LjU0NEwzLjEzMiAwLjA3MTk5OThIMS43MTZMMC4zMTIgOUgxLjcxNlpNMTEuMTY0NCAzLjAzNkMxMC45NjA0IDIuOTg4IDEwLjczMjQgMi45NjQgMTAuNTE2NCAyLjk2NEM5Ljc0ODQxIDIuOTY0IDkuMTI0NDEgMy4zNiA4LjgwMDQxIDMuOTg0TDguODQ4NDEgMy4wNzJINy41NDA0MUw2LjYwNDQxIDlIOC4wMDg0MUw4LjQ3NjQxIDYuMDcyQzguNjU2NDEgNC45MzIgOS40MDA0MSA0LjM1NiAxMC40MjA0IDQuMzU2SDEwLjk0ODRMMTEuMTY0NCAzLjAzNlpNMTIuNzUxNSA5LjE1NkMxMy42Mzk1IDkuMTU2IDE0LjQ0MzUgOC43NDggMTQuNzc5NSA4LjExMkwxNC43NDM1IDlIMTUuOTc5NUwxNi41NTU1IDUuMzg4QzE2Ljc5NTUgMy44NjQgMTUuOTA3NSAyLjkwNCAxNC4yNTE1IDIuOTA0QzEyLjcwMzUgMi45MDQgMTEuNzA3NSAzLjY3MiAxMS41MDM1IDUuMDE2SDEyLjc2MzVDMTIuODU5NSA0LjM0NCAxMy4zMTU1IDQuMDA4IDE0LjEwNzUgNC4wMDhDMTQuOTIzNSA0LjAwOCAxNS4zMTk1IDQuNDE2IDE1LjE5OTUgNS4xNkwxNS4xODc1IDUuMjkyTDEzLjQyMzUgNS40NDhDMTEuODUxNSA1LjU2OCAxMC45NjM1IDYuMzEyIDEwLjk2MzUgNy41MzZDMTAuOTYzNSA4LjQ5NiAxMS42ODM1IDkuMTU2IDEyLjc1MTUgOS4xNTZaTTEzLjI5MTUgOC4wNzZDMTIuNzI3NSA4LjA3NiAxMi4zOTE1IDcuODEyIDEyLjM5MTUgNy4zOEMxMi4zOTE1IDYuNzkyIDEyLjgyMzUgNi40NDQgMTMuNzk1NSA2LjM3MkwxNS4wNDM1IDYuMjY0TDE0Ljk5NTUgNi41ODhDMTQuODYzNSA3LjUgMTQuMjAzNSA4LjA3NiAxMy4yOTE1IDguMDc2Wk0xOS4yMDg1IDkuMTU2QzIwLjA5NjUgOS4xNTYgMjAuOTAwNSA4Ljc0OCAyMS4yMzY1IDguMTEyTDIxLjIwMDUgOUgyMi40MzY1TDIzLjAxMjUgNS4zODhDMjMuMjUyNSAzLjg2NCAyMi4zNjQ1IDIuOTA0IDIwLjcwODUgMi45MDRDMTkuMTYwNSAyLjkwNCAxOC4xNjQ1IDMuNjcyIDE3Ljk2MDUgNS4wMTZIMTkuMjIwNUMxOS4zMTY1IDQuMzQ0IDE5Ljc3MjUgNC4wMDggMjAuNTY0NSA0LjAwOEMyMS4zODA1IDQuMDA4IDIxLjc3NjUgNC40MTYgMjEuNjU2NSA1LjE2TDIxLjY0NDUgNS4yOTJMMTkuODgwNSA1LjQ0OEMxOC4zMDg1IDUuNTY4IDE3LjQyMDUgNi4zMTIgMTcuNDIwNSA3LjUzNkMxNy40MjA1IDguNDk2IDE4LjE0MDUgOS4xNTYgMTkuMjA4NSA5LjE1NlpNMTkuNzQ4NSA4LjA3NkMxOS4xODQ1IDguMDc2IDE4Ljg0ODUgNy44MTIgMTguODQ4NSA3LjM4QzE4Ljg0ODUgNi43OTIgMTkuMjgwNSA2LjQ0NCAyMC4yNTI1IDYuMzcyTDIxLjUwMDUgNi4yNjRMMjEuNDUyNSA2LjU4OEMyMS4zMjA1IDcuNSAyMC42NjA1IDguMDc2IDE5Ljc0ODUgOC4wNzZaTTI0LjgxMzYgOS4xNDRDMjUuNDAxNiA5LjE0NCAyNS45MTc2IDguNjQgMjUuOTE3NiA4LjA2NEMyNS45MTc2IDcuNTg0IDI1LjYwNTYgNy4yNiAyNS4xMTM2IDcuMjZDMjQuNTI1NiA3LjI2IDI0LjAyMTYgNy43NzYgMjQuMDIxNiA4LjM1MkMyNC4wMjE2IDguODMyIDI0LjMzMzYgOS4xNDQgMjQuODEzNiA5LjE0NFpNMjYuOTAzIDYuNDkyQzI2LjkwMyA4LjEzNiAyNy45MzUgOS4xNDQgMjkuNTkxIDkuMTQ0QzMxLjAxOSA5LjE0NCAzMi4xODMgOC4yMzIgMzIuNTU1IDYuODI4SDMxLjExNUMzMC44NzUgNy40ODggMzAuMzIzIDcuODk2IDI5LjY2MyA3Ljg5NkMyOC44MzUgNy44OTYgMjguMzQzIDcuMzMyIDI4LjM0MyA2LjQwOEMyOC4zNDMgNS4xMzYgMjkuMTExIDQuMTY0IDMwLjEzMSA0LjE2NEMzMC44NTEgNC4xNjQgMzEuMjk1IDQuNTQ4IDMxLjM0MyA1LjIySDMyLjc3MUMzMi43MjMgMy43NjggMzEuNzc1IDIuOTE2IDMwLjIxNSAyLjkxNkMyOC4zNDMgMi45MTYgMjYuOTAzIDQuNDY0IDI2LjkwMyA2LjQ5MlpNMzMuMzcxNyA2LjQ5MkMzMy4zNzE3IDguMTM2IDM0LjQwMzcgOS4xNDQgMzYuMDU5NyA5LjE0NEMzNy40ODc3IDkuMTQ0IDM4LjY1MTcgOC4yMzIgMzkuMDIzNyA2LjgyOEgzNy41ODM3QzM3LjM0MzcgNy40ODggMzYuNzkxNyA3Ljg5NiAzNi4xMzE3IDcuODk2QzM1LjMwMzcgNy44OTYgMzQuODExNyA3LjMzMiAzNC44MTE3IDYuNDA4QzM0LjgxMTcgNS4xMzYgMzUuNTc5NyA0LjE2NCAzNi41OTk3IDQuMTY0QzM3LjMxOTcgNC4xNjQgMzcuNzYzNyA0LjU0OCAzNy44MTE3IDUuMjJIMzkuMjM5N0MzOS4xOTE3IDMuNzY4IDM4LjI0MzcgMi45MTYgMzYuNjgzNyAyLjkxNkMzNC44MTE3IDIuOTE2IDMzLjM3MTcgNC40NjQgMzMuMzcxNyA2LjQ5MloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=",
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
