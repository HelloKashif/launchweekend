const Spinner = (props) => {
  return (
    <div className="flex-center">
      <svg
        className={`spin ${props.className || "h-6 w-6"}`}
        viewBox="0 0 24 24"
      >
        <path
          className="text-gray-600"
          fill="currentColor"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"
        />
        <path
          className="text-gray-400"
          fill="currentColor"
          d="M12 3a9 9 0 010 18v-2a7 7 0 000-14V3z"
        />
      </svg>
    </div>
  );
};

export default Spinner;
