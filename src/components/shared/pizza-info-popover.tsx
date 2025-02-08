import { ICONS } from "@/constants";

import { Popover, PopoverContent, PopoverTrigger } from "..";

interface PizzaInfoPopoverProps {
  calories: number;
  protein: string;
  totalFat: string;
  carbohydrates: string;
}

export const PizzaInfoPopover = ({
  calories,
  protein,
  totalFat,
  carbohydrates,
}: PizzaInfoPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <img
          src={ICONS.HELP}
          alt="Pizza Info"
          className="size-6 hover:cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[250px] flex flex-col gap-3">
        <p className="text-xs text-white font-medium opacity-50">
          Пищевая ценность на 100 г
        </p>
        <div className="help-text-container">
          <p className="help-text">Энерг. ценность</p>
          <p className="help-text">{`${calories} ккал`}</p>
        </div>
        <div className="help-text-container">
          <p className="help-text">Белки</p>
          <p className="help-text">{protein}</p>
        </div>
        <div className="help-text-container">
          <p className="help-text">Жиры</p>
          <p className="help-text">{totalFat}</p>
        </div>
        <div className="help-text-container">
          <p className="help-text">Углеводы</p>
          <p className="help-text">{carbohydrates}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
