interface CheckmarkIconProps {
    isChecked: boolean;
  }
  
  const CheckmarkIcon = ({ isChecked }: CheckmarkIconProps) => {
    return (
      <svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 17 18"
        className={`z-10 w-3 h-3 transition-opacity duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
      >
        <polyline
          fill="none"
          points="1 9 7 14 15 4"
          stroke="white"
          strokeDasharray="22"
          strokeDashoffset={isChecked ? "0" : "22"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{
            transition: "stroke-dashoffset 200ms ease-in-out",
          }}
        />
      </svg>
    );
  };
  
  export default CheckmarkIcon;
  