export const Loader = () => {
  return (
    <div className="loader w-12 h-12 fixed top-2 right-2 z-[200]">
      <svg className="circular-loader" viewBox="25 25 50 50">
        <circle
          className="loader-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
        ></circle>
      </svg>
    </div>
  );
};
