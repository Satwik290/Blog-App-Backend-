const validator = require('validator');

// Validate Sign Up Data
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || firstName.trim().length < 3) {
    throw new Error('First name must be at least 3 characters long.');
  }
  if (!lastName || lastName.trim().length < 1) {
    throw new Error('Last name is required.');
  }
  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error('A valid email is required.');
  }
  if (!password || !validator.isStrongPassword(password, { minSymbols: 0 })) {
    throw new Error('Password is not strong enough.');
  }
};

// Validate Login Data
const validateLoginData = (req) => {
  const { emailId, password } = req.body;
  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error('Please enter a valid email.');
  }
  if (!password || password.length === 0) {
    throw new Error('Password is required.');
  }
};

// Validate Post Data
const validatePostData = (req) => {
  const { title, content } = req.body;
  if (!title || title.trim().length < 3) {
    throw new Error('Title must be at least 3 characters long.');
  }
  if (!content || content.trim().length < 10) {
    throw new Error('Content must be at least 10 characters long.');
  }
};

// Validate Editable Profile Fields
const validateEditProfileData = (req) => {
  const allowedFields = ['firstName', 'lastName', 'about', 'age', 'gender', 'photoUrl', 'skills'];
  const receivedFields = Object.keys(req.body);

  const isValid = receivedFields.every((field) => allowedFields.includes(field));

  if (!isValid) {
    const invalidFields = receivedFields.filter(field => !allowedFields.includes(field));
    throw new Error(`Invalid fields in profile update: ${invalidFields.join(', ')}.`);
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validatePostData,
  validateEditProfileData,
};