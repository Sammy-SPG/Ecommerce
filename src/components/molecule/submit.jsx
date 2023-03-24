export const Submit = ({ title }) => {
  return (
    <div className="my-3 flex items-center justify-center">
      <button type="submit" className="px-6 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {title}
      </button>
    </div>
  );
};