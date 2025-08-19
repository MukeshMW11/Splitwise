import Head from 'next/head';
import Header from './Header';
import MainContent from './MainContent';
import About from './About';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>SplitEasy - Simplify Your Expense Sharing</title>
        <meta
          name="description"
          content="SplitEasy makes tracking, splitting, and settling group expenses effortless. Perfect for friends, roommates, and family."
        />
        <meta name="keywords" content="expense sharing, bill splitting, group expenses, SplitEasy, money management" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="SplitEasy - Simplify Your Expense Sharing" />
        <meta
          property="og:description"
          content="Manage group expenses with ease using SplitEasy. Track, split, and settle bills in just a few clicks."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.spliteasy.com" />
        <meta property="og:image" content="/images/spliteasy-og-image.jpg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SplitEasy - Simplify Your Expense Sharing" />
        <meta
          name="twitter:description"
          content="Manage group expenses with ease using SplitEasy. Track, split, and settle bills in just a few clicks."
        />
        <meta name="twitter:image" content="/images/spliteasy-og-image.jpg" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainContent />
      <About />
      <Footer />
    </div>
  );
};

export default Home;