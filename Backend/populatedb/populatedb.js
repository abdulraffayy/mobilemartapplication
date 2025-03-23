const iPhone = require('../models/IphoneModels'); // You need to create this model

const populatedb = async () => {
  const iphoneData = [
    { name: "iPhone 4", storage: "8GB", color: "Black", price: 99, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468795/iphone4_nvve3c.webp"},
    { name: "iPhone 4s", storage: "16GB", color: "White", price: 129, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468795/iphone4s_cp2axl.webp" },
    { name: "iPhone 4", storage: "8GB", color: "Black", price: 99, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468795/iphone4_nvve3c.webp"},
    { name: "iPhone 5S", storage: "32GB", color: "Gold", price: 249, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468795/iphone5c_rhb0dk.webp" },
    { name: "iPhone 6s", storage: "64GB", color: "Silver", price: 349, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468795/iphone6s_ruwjng.webp" },
    { name: "iPhone 7", storage: "128GB", color: "Jet Black", price: 449, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468775/IPhone_7_i3grm1.webp" },
    { name: "iPhone 8", storage: "256GB", color: "Red", price: 549, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468775/iphone_8_utfwlh.webp" },
    { name: "iPhone X", storage: "256GB", color: "Space Gray", price: 699, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468796/iphonex_insnis.webp" },
    { name: "iPhone 11", storage: "128GB", color: "Purple", price: 799, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468776/IPhone_11_wa43hf.webp" },
    { name: "iPhone 12", storage: "256GB", color: "Blue", price: 899, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468776/IPhone_12_msed9t.jpg" },
    { name: "iPhone 13", storage: "512GB", color: "Pink", price: 999, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468777/IPhone_13_mini_wpivmw.webp" },
    { name: "iPhone 14", storage: "1TB", color: "Midnight", price: 1099, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468776/IPhone_14_Pro_Max_djjpax.webp" },
    { name: "iPhone 15 Pro", storage: "1TB", color: "Titanium", price: 1199, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468776/IPhone_15_b3qzsm.webp" },
    { name: "iPhone 16 Pro Max", storage: "1TB", color: "Graphite", price: 1299, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468777/IPhone_16_Plus_slrcuw.webp" },
    { name: "iPhone 16 Pro 12", storage: "1TB", color: "Graphite", price: 1299, url: "https://res.cloudinary.com/dlyrxao7o/image/upload/v1742468777/IPhone_16_Plus_slrcuw.webp" }
  ];

  try {
    // First, clear existing data (optional)
    await iPhone.deleteMany({});
    
    // Insert all the iPhone data
    const result = await iPhone.insertMany(iphoneData);
    console.log(`${result.length} iPhones added to the database`);
    return result;
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

module.exports = populatedb;

