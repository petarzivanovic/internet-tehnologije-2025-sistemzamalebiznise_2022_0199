type ButtonProps = {
  label: string; 
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "success"; 
};

export default function Button({
  label,
  onClick,
  type = "button",
  variant = "primary" 
}: ButtonProps) {
  
  const bgColors = {
    primary: "bg-black hover:bg-gray-800",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white rounded transition ${bgColors[variant]}`}
    >
      {label}
    </button>
  );
}