type InputProps = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  type = "text",
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded px-3 py-2"
      />
    </div>
  );
}
