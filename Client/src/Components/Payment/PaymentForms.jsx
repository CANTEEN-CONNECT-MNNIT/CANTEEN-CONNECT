import React, { useState } from 'react';
import { FaInfoCircle, FaSpinner, FaChevronDown, FaWallet, FaQrcode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

export default function PaymentForms({ selectedMethod, total, darkMode, setCurrentPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Payment Successful!', {
        duration: 1500,
      });
      setTimeout(() => {
        setCurrentPage("OrderPage");
        navigate("/OrderPage");
      }, 1500);
    }, 1500);
  };

  const renderCardForm = () => (
    <div className={`space-y-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>CVV</label>
          <input
            type="text"
            placeholder="123"
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cardholder Name</label>
        <input
          type="text"
          placeholder="Name on card"
          className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
        />
      </div>
    </div>
  );

  const renderUpiForm = () => (
    <div className={`space-y-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>UPI ID</label>
        <div className="relative">
          <input
            type="text"
            placeholder="username@bank"
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <FaInfoCircle className={`absolute right-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <FaQrcode className="w-32 h-32 mx-auto text-orange-600" />
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Scan QR code to pay</p>
        </div>
      </div>
    </div>
  );

  const renderNetBankingForm = () => (
    <div className={`space-y-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Bank</label>
        <div className="relative">
          <select className={`w-full px-4 py-2 border rounded-lg appearance-none ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}>
            <option>Select your bank</option>
            <option>State Bank of India</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
          </select>
          <FaChevronDown className={`absolute right-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        </div>
      </div>
    </div>
  );

  const renderWalletForm = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {['Google Pay', 'Paytm', 'PhonePe'].map((wallet) => (
        <button
          key={wallet}
          className={`flex items-center justify-center p-4 border-2 rounded-lg hover:border-orange-200 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
        >
          <FaWallet className={`w-6 h-6 ${darkMode ? 'text-orange-500' : 'text-orange-600'} mr-2`} />
          <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{wallet}</span>
        </button>
      ))}
    </div>
  );

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return renderCardForm();
      case 'upi':
        return renderUpiForm();
      case 'netbanking':
        return renderNetBankingForm();
      case 'wallet':
        return renderWalletForm();
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Toaster position="top-center" reverseOrder={false} />
      {renderPaymentForm()}
      <button
        onClick={handlePayment}
        className={`w-full mt-8 py-3 px-4 rounded-lg font-medium ${darkMode ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-orange-500 text-white hover:bg-orange-700'}`}
      >
        Pay ₹{total}
        {isLoading && (
          <span className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-4xl text-gray-600" />
          </span>
        )}
      </button>
    </div>
  );
}
