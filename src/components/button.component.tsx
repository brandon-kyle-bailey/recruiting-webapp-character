export function ButtonComponent({ children, handleOnClick }) {
  return (
    <button
      className="rounded-lg bg-green-500 p-2 w-1/2 font-bold"
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
