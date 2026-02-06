import { FaSpinner } from "react-icons/fa6";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Loading lessons...</p>
    </div>
  );
};

export default LoadingSpinner;
