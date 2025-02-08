"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { getOrderDetails } from "../_helpers";
import {
  mapOrderStatusToColor,
  mapOrderStatusToDescription,
} from "../_constants";
import { PartialOrderCardProps } from "./partial-order-card";

import {
  Button,
  InfoCard,
  Loader,
  QuestionModal,
  Typography,
} from "@/components";

type FullOrderCardProps = PartialOrderCardProps & {
  isSpecificOrder?: boolean;
};

export const FullOrderCard = ({
  id,
  address,
  pizzas,
  status,
  isSpecificOrder = false,
}: FullOrderCardProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { orderAddress, orderStructure, totalAmount } = getOrderDetails(
    address,
    pizzas,
    true
  );

  const router = useRouter();

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const cancelOrder = async () => {
    setSubmitting(true);

    /*  try {
      await Api.order.cancelOrder({ orderId: id });

      toast.success("Заказ успешно отменен!", {
        icon: "📦",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Не удалось отменить заказ", {
        icon: "❌",
      });
    } finally {
      setSubmitting(false);
      toggleDialog();
    } */
  };

  return (
    <>
      <InfoCard>
        <div className="flex flex-col gap-[2px]">
          <Typography text="Статус" size="xs" />

          <div className="flex gap-3 items-center">
            <div
              className="size-2 rounded-[50%]"
              style={{ background: mapOrderStatusToColor[status] }}
            />
            <Typography text={mapOrderStatusToDescription[status]} size="md" />
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Адрес доставки" size="xs" />
          <Typography text={orderAddress} size="md" />
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Состав заказа" size="xs" />

          {orderStructure.map((order, index) => (
            <p key={index} className="text-base">
              {order}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Сумма заказа" size="xs" />
          <Typography text={`${totalAmount} ₽`} size="md" />
        </div>

        {isSpecificOrder ? (
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="w-full max-w-[145px] hidden sm:block"
              onClick={() => {
                router.back();
              }}
            >
              Назад
            </Button>
            <Button
              className="w-full sm:max-w-[200px]" /*  onClick={onClickReorder} */
            >
              Повторить заказ
            </Button>
          </div>
        ) : (
          <Button className="w-full max-w-[328px]" onClick={toggleDialog}>
            Отменить заказ
          </Button>
        )}
      </InfoCard>

      <QuestionModal
        exitButtonText="Не отменять"
        question="Отменить заказ?"
        isOpen={isOpenDialog}
        onClickAgree={cancelOrder}
        onClickOpenChange={toggleDialog}
        onClickExit={toggleDialog}
      />

      {submitting && <Loader />}
    </>
  );
};
