export const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg mx-auto max-w-md"></div>
          <div className="flex justify-center gap-6">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl p-6 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
