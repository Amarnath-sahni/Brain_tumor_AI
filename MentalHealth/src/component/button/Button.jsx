export default function Button({ label, onClick }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
      >
        {label}
      </button>
    </div>
  );
}
