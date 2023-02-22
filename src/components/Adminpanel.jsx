import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const AdminPanel = () => {
  const [prices, setPrices] = useState({});
  const [cryptoName, setCryptoName] = useState('');
  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch latest crypto prices
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano&vs_currencies=usd')
      .then(response => response.json())
      .then(data => setPrices(data));

    // Fetch latest crypto news
    fetch(``)
      .then(response => response.json())
      .then(data => setNews(data.articles));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const crypto = { id: cryptoName.toLowerCase(), name: cryptoName, symbol: cryptoSymbol, amount: parseFloat(cryptoAmount) };
    handleAddCrypto(crypto);
    setCryptoName('');
    setCryptoSymbol('');
    setCryptoAmount('');
  };

  const handleAddCrypto = (crypto) => {
    setPortfolio([...portfolio, crypto]);
  };

  const handleDeleteCrypto = (index) => {
    const updatedPortfolio = [...portfolio];
    updatedPortfolio.splice(index, 1);
    setPortfolio(updatedPortfolio);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <nav className="bg-gray-800 sm:w-1/5">
          <ul className="text-white">
            <li className="p-4 hover:bg-gray-700">Dashboard</li>
            <li className="p-4 hover:bg-gray-700">Users</li>
            <li className="p-4 hover:bg-gray-700">Crypto</li>
            <li className="p-4 hover:bg-gray-700">Settings</li>
          </ul>
        </nav>
        <main className="sm:w-4/5 p-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-4"
          >
            Crypto Dashboard
          </motion.h1>
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between">
              <motion.div variants={cardVariants} whileHover="hover" whileTap="tap">
                <div className="relative overflow-hidden rounded-lg w-72 h-40">
                  <img src="https://picsum.photos/200/300" alt="" className="absolute object-cover w-full h-full" />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white px-4 py-2">
                    <p className="text-lg font-bold">Bitcoin</p>
                    <p className="text-gray-400">${prices.bitcoin?.usd}</p>
                    </div>
                </div>
              </motion.div>
              <motion.div variants={cardVariants} whileHover="hover" whileTap="tap">
                <div className="relative overflow-hidden rounded-lg w-72 h-40">
                  <img src="https://picsum.photos/200/300" alt="" className="absolute object-cover w-full h-full" />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white px-4 py-2">
                    <p className="text-lg font-bold">Ethereum</p>
                    <p className="text-gray-400">${prices.ethereum?.usd}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={cardVariants} whileHover="hover" whileTap="tap">
                <div className="relative overflow-hidden rounded-lg w-72 h-40">
                  <img src="https://picsum.photos/200/300" alt="" className="absolute object-cover w-full h-full" />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white px-4 py-2">
                    <p className="text-lg font-bold">Ripple</p>
                    <p className="text-gray-400">${prices.ripple?.usd}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={cardVariants} whileHover="hover" whileTap="tap">
                <div className="relative overflow-hidden rounded-lg w-72 h-40">
                  <img src="https://picsum.photos/200/300" alt="" className="absolute object-cover w-full h-full" />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white px-4 py-2">
                    <p className="text-lg font-bold">Cardano</p>
                    <p className="text-gray-400">${prices.cardano?.usd}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-lg font-bold mb-4">My Crypto Portfolio</h2>
            <ul>
              {portfolio.map((crypto, index) => (
                <li key={index} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded-lg">
                  <div>
                    <p className="text-md font-bold">{crypto.name}</p>
                    <p className="text-gray-600">{crypto.symbol}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{crypto.amount} {crypto.symbol}</p>
                    <p className="text-gray-600">${(crypto.amount * prices[crypto.id]?.usd).toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleDeleteCrypto(index)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="flex items-end mt-4">
              <input type="text" placeholder="Crypto Name" value={cryptoName} onChange={(e) => setCryptoName(e.target.value)} className="border border-gray-400 p-2 mr-2" />
              <input type="text" placeholder="Crypto Symbol" value={cryptoSymbol} onChange={(e) => setCryptoSymbol(e.target.value)} className="border border-gray-400 p-2 mr-2" />
              <input type="number" placeholder="Amount" value={cryptoAmount} onChange={(e) => setCryptoAmount(e.target.value)} className="border border-gray-400 p-2 mr-2" />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Add Crypto</button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-bold mb-4">Crypto News Feed</h2>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-400 p-2 mb-2" />
            <ul>
              {news.filter(article => article.title.toLowerCase().includes(search.toLowerCase())).map((article, index) => (
                <li key={index} className="mb-4">
                  <a href={article.url} target="_blank" rel="noreferrer" className="text-lg font-bold hover:underline">{article.title}</a>
                  <p className="text-gray-600">{article.description}</p>
                  <p className="text-gray-500">{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;