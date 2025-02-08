"use client";

import Image from "next/image";
import { useMedia } from "react-use";

import { ICONS } from "@/constants";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerTitle,
  Typography,
} from "..";

interface QuestionModalProps {
  exitButtonText: string;
  question: string;
  isOpen: boolean;
  submitting?: boolean;
  onClickAgree: () => void;
  onClickExit: () => void;
  onClickOpenChange: () => void;
}

export const QuestionModal = ({
  exitButtonText,
  question,
  isOpen,
  submitting = false,
  onClickAgree,
  onClickExit,
  onClickOpenChange,
}: QuestionModalProps) => {
  const isSmallDevice = useMedia("(max-width: 640px)", true);

  if (isSmallDevice) {
    return (
      <Drawer open={isOpen} onOpenChange={onClickOpenChange}>
        <DrawerTitle className="hidden" />
        <DrawerContent className="w-full">
          <div className="w-full h-full flex flex-col gap-[40px] items-center justify-between p-[40px] pt-0">
            <div className="flex flex-col items-center justify-between gap-[16px]">
              <Image
                src={ICONS.QUESTION}
                alt="Question"
                width={80}
                height={80}
              />
              <Typography
                text={question}
                size="lg"
                className="text-[#3E3E3E]"
              />
            </div>

            <div className="w-full max-w-[328px] flex flex-col items-center justify-between gap-[16px]">
              <Button
                variant="secondary"
                disabled={submitting}
                onClick={onClickAgree}
              >
                Отменить
              </Button>
              <Button disabled={submitting} onClick={onClickExit}>
                {exitButtonText}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClickOpenChange}>
      <DialogTitle className="hidden" />
      <DialogContent className="w-full h-full max-w-[544px] max-h-[400px] p-0 pt-10">
        <div className="w-full h-full flex flex-col gap-[40px] items-center justify-between p-[72px] pt-0">
          <div className="flex flex-col items-center justify-between gap-[16px]">
            <Image src={ICONS.QUESTION} alt="Question" width={80} height={80} />
            <Typography text={question} size="lg" className="text-[#3E3E3E]" />
          </div>

          <div className="w-full max-w-[328px] flex flex-col items-center justify-between gap-[16px]">
            <Button
              variant="secondary"
              disabled={submitting}
              onClick={onClickAgree}
            >
              Отменить
            </Button>
            <Button disabled={submitting} onClick={onClickExit}>
              {exitButtonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
