"use client";

export const UserIcon = ({
  fill = "#141C24",
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  const activeFill = "#F4511E";

  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.57129C16 10.7804 14.2091 12.5713 12 12.5713C9.79086 12.5713 8 10.7804 8 8.57129C8 6.36215 9.79086 4.57129 12 4.57129C14.2091 4.57129 16 6.36215 16 8.57129ZM14.5 8.57129C14.5 9.952 13.3807 11.0713 12 11.0713C10.6193 11.0713 9.5 9.952 9.5 8.57129C9.5 7.19058 10.6193 6.07129 12 6.07129C13.3807 6.07129 14.5 7.19058 14.5 8.57129Z"
        fill={className ? activeFill : fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 18.3433V20.5713H20V18.3433C20 16.6759 18.9657 15.1834 17.4045 14.598L17.2669 14.5464C13.8711 13.2729 10.1289 13.2729 6.73315 14.5464L6.59551 14.598C5.03429 15.1834 4 16.6759 4 18.3433ZM7.25984 15.9509C10.316 14.8048 13.684 14.8048 16.7402 15.9509L16.8778 16.0025C17.8536 16.3684 18.5 17.3012 18.5 18.3433V19.0713H5.5V18.3433C5.5 17.3012 6.14643 16.3684 7.12219 16.0025L7.25984 15.9509Z"
        fill={className ? activeFill : fill}
      />
    </svg>
  );
};
