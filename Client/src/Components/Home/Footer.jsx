import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setactiveMenu } from '../../Redux/Slices/pageSlice';

export const Footer = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  return (
    <footer ref={ref} className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Canteen Connect Description */}
          <div>
            <h3 className='text-white text-xl font-semibold mb-4'>
              Canteen Connect
            </h3>
            <p className='text-sm'>
              Enjoy fresh meals, pre-order, and skip the lines at MNNIT's
              favorite canteens!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white text-xl font-semibold mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/dashboard'
                  onClick={() => dispatch(setactiveMenu('Dashboard'))}
                  className='hover:text-orange-500 transition-colors duration-200'
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href='/Orderpage'
                  onClick={() => dispatch(setactiveMenu('Track Order'))}
                  className='hover:text-orange-500 transition-colors duration-200'
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href=''
                  onClick={() => dispatch(setactiveMenu(''))}
                  className='hover:text-orange-500 transition-colors duration-200'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-white text-xl font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li className='flex items-center space-x-2'>
                <FaMapMarkerAlt className='w-4 h-4 text-orange-500' />
                <span>MNNIT College Campus</span>
              </li>
              <li className='flex items-center space-x-2'>
                <FaPhoneAlt className='w-4 h-4 text-orange-500' />
                <span>+91 1234567890</span>
              </li>
              <li className='flex items-center space-x-2'>
                <FaEnvelope className='w-4 h-4 text-orange-500' />
                <span>canteenconnect@email.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className='text-white text-xl font-semibold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                aria-label='Facebook'
                className='hover:text-orange-500 transition-colors duration-200'
              >
                <FaFacebook className='w-6 h-6' />
              </a>
              <a
                href='https://twitter.com'
                aria-label='Twitter'
                className='hover:text-orange-500 transition-colors duration-200'
              >
                <FaTwitter className='w-6 h-6' />
              </a>
              <a
                href='https://instagram.com'
                aria-label='Instagram'
                className='hover:text-orange-500 transition-colors duration-200'
              >
                <FaInstagram className='w-6 h-6' />
              </a>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-4 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Canteen Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});
