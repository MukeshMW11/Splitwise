import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">SplitEasy</h1>
        <nav className="flex space-x-4">
          <Link href="/auth/login">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105">
              Log In
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300 transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;