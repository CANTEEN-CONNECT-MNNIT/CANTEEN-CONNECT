import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCreditCard, FaWallet, FaUniversity, FaQrcode } from 'react-icons/fa';
import PaymentMethodButton from './PaymentMethodButton';
import OrderSummary from './OrderSummary';
import PaymentForms from './PaymentForms';
function Payment({ showPayment, setShowPayment }) {

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [expanded, setExpanded] = useState(true);

  const cartItems = useSelector((state) => state.cart.cart);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = 0.2*subtotal; 
  const total = subtotal - discount;

  const paymentMethods = [
    { id: 'card', icon: FaCreditCard, label: 'Card' },
    { id: 'upi', icon: FaQrcode, label: 'UPI' },
    { id: 'netbanking', icon: FaUniversity, label: 'Net Banking' },
    { id: 'wallet', icon: FaWallet, label: 'Wallet' },
  ];

  const handleCancelPayment = () => {
    setShowPayment(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className={`w-full h-20 mb-12 ${darkMode ? 'bg-gray-800' : 'bg-stone-800'}`}></div>
      <header className={`shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-20">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-orange-500'}`}>
            Secure Payment
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Choose your preferred payment method
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {showPayment ? (
              <>
                <div className={`rounded-xl shadow-md p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <PaymentMethodButton
                        key={method.id}
                        selected={selectedMethod === method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        icon={method.icon}
                        label={method.label}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                </div>
                <PaymentForms selectedMethod={selectedMethod} total={total} darkMode={darkMode}  />
              </>
            ) : ""}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              items={cartItems}           
              subtotal={subtotal}         
              discount={discount}        
              total={total}             
              expanded={expanded}
              onToggleExpand={() => setExpanded(!expanded)}
              darkMode={darkMode}
            />
          </div>
        </div>

        {showPayment && (
          <div className="text-center mt-6">
            <button
              onClick={handleCancelPayment}
              className={`py-2 px-4 rounded-xl font-semibold ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-700'}`}
            >
              Cancel Payment
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Payment;
