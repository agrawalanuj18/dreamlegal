import type { Metadata } from "next";
import { ClarityCity } from "@/utils/customFont";
import "../../../app/globals.css";
import { StepProvider } from "@/context/formContext";
import { FormProvider } from "@/context/formValueContext";

export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Generated by DreamLegal",
};
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ClarityCity.variable} `}>
        <FormProvider>
          <StepProvider>{children}</StepProvider>
        </FormProvider>
        <Toaster />
      </body>
    </html>
  );
}
