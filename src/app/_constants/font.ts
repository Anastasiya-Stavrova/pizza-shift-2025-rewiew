import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../fonts/Inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Inter/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Inter/Inter-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Inter/Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});
