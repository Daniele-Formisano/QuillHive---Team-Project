export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen space-x-2 bg-bg-brand">
      <div className="w-4 h-4 bg-secondary-brand rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-secondary-brand rounded-full animate-bounce [animation-delay:0.1s]"></div>
      <div className="w-4 h-4 bg-secondary-brand rounded-full animate-bounce [animation-delay:0.2s]"></div>
    </div>
  );
}
