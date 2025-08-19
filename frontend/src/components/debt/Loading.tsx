const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading debts...
          </p>
          <p className="text-gray-500">
            Please wait while we fetch the latest information
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingState;
