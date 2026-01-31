type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      {children}
    </button>
  );
}
