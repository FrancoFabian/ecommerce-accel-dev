
interface ToggleSwitchProps {
    isEnabled: boolean;
    onToggle: () => void;
  }
  
  export const ToggleSwitch = ({ isEnabled, onToggle }: ToggleSwitchProps) => {
    return (
      <label
        className={`px-1 relative inline-flex items-center justify-start
          flex-shrink-0 overflow-hidden rounded-full outline-none transition-background w-12 h-7 cursor-pointer
          ${isEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={onToggle}
          className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
        />
        <span
          className={`z-10 flex items-center justify-center bg-white shadow-lg rounded-full transition-transform
            ${isEnabled ? 'translate-x-5' : 'translate-x-0'} w-5 h-5`}
        ></span>
      </label>
    );
  };