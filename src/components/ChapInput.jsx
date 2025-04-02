export default function ChapInput(handleChange) {
  return (
    <textarea
      className="w-full h-[80vh] p-4 resize-none rounded-xl text-sm font-script border-2 border-stroke-brand bg-white focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all text-input-text-brand placeholder:text-gray-350"
      placeholder="Write something..."
      onChange={handleChange}
    ></textarea>
  );
}
