export function NoDataMessage({ message }) {
  return (
    <div className="w-full p-4 rounded-full bg-gray/50 mt-4">
      <p className="text-center">{message}</p>
    </div>
  );
}
