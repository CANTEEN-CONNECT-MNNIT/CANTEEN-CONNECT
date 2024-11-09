import React, { useState } from 'react';
import { FiSettings, FiEdit, FiSave, FiCamera } from 'react-icons/fi';

const ProfilePicture = ({ image, onImageChange, isEditing }) => (
  <div className="relative mb-6">
    <img
      src={image}
      alt="Profile"
      className="w-32 h-45 rounded-full border-4 border-white shadow-xl cursor-pointer"
      onClick={onImageChange}
    />
    {isEditing && (
      <div className="absolute bottom-0 right-0 bg-indigo-500 rounded-full p-2">
        <FiCamera size={20} className="text-white" />
      </div>
    )}
  </div>
);

const ProfileInfo = ({ userName, userEmail, userBio, isEditing, onNameChange, onEmailChange, onBioChange }) => (
  <div className="text-center mb-6">
    {isEditing ? (
      <input
        type="text"
        value={userName}
        onChange={(e) => onNameChange(e.target.value)}
        className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
      />
    ) : (
      <h2 className="text-2xl font-semibold text-gray-800">{userName}</h2>
    )}

    {isEditing ? (
      <input
        type="email"
        value={userEmail}
        onChange={(e) => onEmailChange(e.target.value)}
        className="text-sm text-gray-500 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
      />
    ) : (
      <p className="text-sm text-gray-500 mb-2">{userEmail}</p>
    )}

    {isEditing ? (
      <textarea
        value={userBio}
        onChange={(e) => onBioChange(e.target.value)}
        rows="3"
        className="text-sm text-gray-500 w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    ) : (
      <p className="text-sm text-gray-500 mt-2">{userBio}</p>
    )}
  </div>
);

const ProfileDetails = ({
  role,
  lastOrder,
  dietaryPreference,
  favoriteFood,
  isEditing,
  onRoleChange,
  onLastOrderChange,
  onDietaryPreferenceChange,
  onFavoriteFoodChange
}) => (
  <div className="w-full max-w-md mb-6">
    <div className="mb-4">
      <label htmlFor="role" className="block text-gray-700">Role</label>
      {isEditing ? (
        <select
          id="role"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Customer">Customer</option>
          <option value="Worker">Worker</option>
        </select>
      ) : (
        <p className="text-sm text-gray-500">{role}</p>
      )}
    </div>

    <div className="mb-4">
      <label htmlFor="lastOrder" className="block text-gray-700">Last Order</label>
      {isEditing ? (
        <input
          type="text"
          id="lastOrder"
          value={lastOrder}
          onChange={(e) => onLastOrderChange(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <p className="text-sm text-gray-500">{lastOrder}</p>
      )}
    </div>

    <div className="mb-4">
      <label htmlFor="dietaryPreference" className="block text-gray-700">Dietary Preference</label>
      {isEditing ? (
        <select
          id="dietaryPreference"
          value={dietaryPreference}
          onChange={(e) => onDietaryPreferenceChange(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      ) : (
        <p className="text-sm text-gray-500">{dietaryPreference}</p>
      )}
    </div>

    <div>
      <label htmlFor="favoriteFood" className="block text-gray-700">Favorite Food</label>
      {isEditing ? (
        <input
          type="text"
          id="favoriteFood"
          value={favoriteFood}
          onChange={(e) => onFavoriteFoodChange(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <p className="text-sm text-gray-500">{favoriteFood}</p>
      )}
    </div>
  </div>
);

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Daksh Dagwar");
  const [userEmail, setUserEmail] = useState("dakshdagwar@gmail.com");
  const [userBio, setUserBio] = useState("nothing");
  const [userImage, setUserImage] = useState("https://via.placeholder.com/150");
  const [dietaryPreference, setDietaryPreference] = useState("Vegetarian");
  const [favoriteFood, setFavoriteFood] = useState("Pizza");
  const [role, setRole] = useState("Customer");
  const [lastOrder, setLastOrder] = useState("Cheese Burger - 22nd Oct, 2024");

  const handleImageChange = () => {
    
    console.log("Change profile image");
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
       
        <div className="bg-indigo-600 p-6 text-center text-white">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>

      
        <div className="p-6 flex flex-col items-center">
        
          <ProfilePicture image={userImage} onImageChange={handleImageChange} isEditing={isEditing} />
          
          
          <ProfileInfo
            userName={userName}
            userEmail={userEmail}
            userBio={userBio}
            isEditing={isEditing}
            onNameChange={setUserName}
            onEmailChange={setUserEmail}
            onBioChange={setUserBio}
          />

         
          <ProfileDetails
            role={role}
            lastOrder={lastOrder}
            dietaryPreference={dietaryPreference}
            favoriteFood={favoriteFood}
            isEditing={isEditing}
            onRoleChange={setRole}
            onLastOrderChange={setLastOrder}
            onDietaryPreferenceChange={setDietaryPreference}
            onFavoriteFoodChange={setFavoriteFood}
          />

         
          <div className="w-full max-w-md text-center">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                <FiSave className="inline mr-2" size={20} /> Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                <FiEdit className="inline mr-2" size={20} /> Edit Profile
              </button>
            )}
          </div>
        </div>

     
        {/* <div className="bg-gray-100 p-4 text-center text-gray-600">
          <p>&copy; 2024 Canteen Connect. All rights reserved.</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
