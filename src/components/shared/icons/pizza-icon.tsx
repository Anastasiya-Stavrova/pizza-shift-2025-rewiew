export const PizzaIcon = ({
  fill = "#141C24",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.9998 13.9998L10.9998 14.9998M13.7498 18.2498L12.4998 19.6698M17.7748 5.65376C14.7961 6.27954 12.0639 7.75874 9.91154 9.91089C7.75921 12.063 6.27979 14.7951 5.65376 17.7738M18.7998 9.29976C17.7787 9.57824 16.91 10.2509 16.3849 11.1699C15.8598 12.0888 15.7213 13.1787 15.9998 14.1998C16.2782 15.2208 16.9509 16.0895 17.8699 16.6146C18.7888 17.1397 19.8787 17.2782 20.8998 16.9998M21.9638 20.7318C22.0114 20.9025 22.0128 21.0829 21.9678 21.2544C21.9228 21.4259 21.833 21.5823 21.7077 21.7077C21.5823 21.833 21.4259 21.9228 21.2544 21.9678C21.0829 22.0128 20.9025 22.0114 20.7318 21.9638L2.73176 16.9638C2.60522 16.9285 2.48686 16.8687 2.38344 16.7877C2.28002 16.7067 2.19357 16.6062 2.12903 16.4917C2.06449 16.3773 2.02312 16.2513 2.00729 16.1209C1.99146 15.9905 2.00147 15.8583 2.03676 15.7318C2.94501 12.462 4.68335 9.4826 7.08298 7.08298C9.4826 4.68335 12.462 2.94501 15.7318 2.03676C15.8583 2.00147 15.9905 1.99146 16.1209 2.00729C16.2513 2.02312 16.3773 2.06449 16.4917 2.12903C16.6062 2.19357 16.7067 2.28002 16.7877 2.38344C16.8687 2.48686 16.9285 2.60522 16.9638 2.73176L21.9638 20.7318Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
