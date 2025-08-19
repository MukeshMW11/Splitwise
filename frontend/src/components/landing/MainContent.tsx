import Link from 'next/link';

const MainContent = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Split Expenses Effortlessly with SplitEasy
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Manage group expenses with ease. Track, split, and settle bills with friends, roommates, or family in just a few clicks.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/auth/signup">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Get Started Now
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300 transform hover:scale-105">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-16">Why SplitEasy Stands Out</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition duration-300">
              <div className="text-green-600 text-5xl mb-4">💸</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Effortless Splitting</h4>
              <p className="text-gray-600 leading-relaxed">
                Divide bills evenly or customize amounts with our user-friendly interface.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition duration-300">
              <div className="text-green-600 text-5xl mb-4">📊</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Expense Tracking</h4>
              <p className="text-gray-600 leading-relaxed">
                Monitor who paid what and who owes whom, all in one organized dashboard.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition duration-300">
              <div className="text-green-600 text-5xl mb-4">🔄</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Quick Settlements</h4>
              <p className="text-gray-600 leading-relaxed">
                Settle debts fast with built-in reminders and payment tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;