export const InfoCard = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={
        "flex flex-col justify-between gap-6 w-full border border-[#E3E5E5] " +
        "rounded-[24px] py-6 px-12"
      }
    >
      {children}
    </div>
  );
};
