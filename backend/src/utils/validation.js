import validator from 'validator';

export const validateInput = (fields) => {
  const errors = {};
  let isValid = true;

  for (const [fieldName, fieldConfig] of Object.entries(fields)) {
    const { value, rules = [] } = fieldConfig;
    const fieldErrors = [];

    for (const rule of rules) {
      if (typeof rule === 'string') {
        // Simple rule without parameters
        const error = validateRule(value, rule, fieldName);
        if (error) {
          fieldErrors.push(error);
          isValid = false;
        }
      } else if (typeof rule === 'object') {
        // Rule with parameters
        const { name, params } = rule;
        const error = validateRule(value, name, fieldName, params);
        if (error) {
          fieldErrors.push(error);
          isValid = false;
        }
      }
    }

    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors;
    }
  }

  return { isValid, errors };
};

const validateRule = (value, rule, fieldName, params = []) => {
  // Handle rule with parameters (e.g., "min:8", "max:100")
  if (rule.includes(':')) {
    const [ruleName, ruleParam] = rule.split(':');
    return validateRule(value, ruleName, fieldName, [ruleParam]);
  }

  switch (rule) {
    case 'required':
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return `${fieldName} is required`;
      }
      break;

    case 'string':
      if (value && typeof value !== 'string') {
        return `${fieldName} must be a string`;
      }
      break;

    case 'number':
      if (value && !Number.isFinite(Number(value))) {
        return `${fieldName} must be a number`;
      }
      break;

    case 'email':
      if (value && !validator.isEmail(value)) {
        return `${fieldName} must be a valid email address`;
      }
      break;

    case 'phone':
      if (value && !isValidPhone(value)) {
        return `${fieldName} must be a valid phone number`;
      }
      break;

    case 'url':
      if (value && !validator.isURL(value)) {
        return `${fieldName} must be a valid URL`;
      }
      break;

    case 'min':
      const minLength = parseInt(params[0]);
      if (value && value.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters long`;
      }
      break;

    case 'max':
      const maxLength = parseInt(params[0]);
      if (value && value.length > maxLength) {
        return `${fieldName} must not exceed ${maxLength} characters`;
      }
      break;

    case 'length':
      const exactLength = parseInt(params[0]);
      if (value && value.length !== exactLength) {
        return `${fieldName} must be exactly ${exactLength} characters long`;
      }
      break;

    case 'in':
      const allowedValues = params[0].split(',');
      if (value && !allowedValues.includes(value)) {
        return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
      }
      break;

    case 'numeric':
      if (value && !/^\d+$/.test(value)) {
        return `${fieldName} must contain only numbers`;
      }
      break;

    case 'alpha':
      if (value && !/^[a-zA-Z]+$/.test(value)) {
        return `${fieldName} must contain only letters`;
      }
      break;

    case 'alphanumeric':
      if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
        return `${fieldName} must contain only letters and numbers`;
      }
      break;

    case 'date':
      if (value && !validator.isISO8601(value)) {
        return `${fieldName} must be a valid date`;
      }
      break;

    case 'boolean':
      if (value !== undefined && typeof value !== 'boolean') {
        return `${fieldName} must be a boolean`;
      }
      break;

    case 'array':
      if (value && !Array.isArray(value)) {
        return `${fieldName} must be an array`;
      }
      break;

    case 'object':
      if (value && (typeof value !== 'object' || Array.isArray(value))) {
        return `${fieldName} must be an object`;
      }
      break;

    default:
      // Unknown rule, skip validation
      break;
  }

  return null;
};

const isValidPhone = (phone) => {
  // Indian phone number validation
  const indianPhoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  
  // International phone number validation
  const internationalPhoneRegex = /^\+?[1-9]\d{1,14}$/;
  
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  return indianPhoneRegex.test(cleanPhone) || internationalPhoneRegex.test(cleanPhone);
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return validator.escape(input.trim());
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return input;
};

// Validate file upload
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  } = options;

  const errors = [];

  if (!file) {
    errors.push('File is required');
    return { isValid: false, errors };
  }

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must not exceed ${Math.round(maxSize / (1024 * 1024))}MB`);
  }

  // Check MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    errors.push(`File type not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`);
  }

  // Check file extension
  const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate coordinates
export const validateCoordinates = (lat, lng) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    return { isValid: false, error: 'Invalid latitude' };
  }

  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    return { isValid: false, error: 'Invalid longitude' };
  }

  return { isValid: true, latitude, longitude };
};

// Validate Indian Aadhaar number
export const validateAadhaar = (aadhaarNumber) => {
  if (!aadhaarNumber || typeof aadhaarNumber !== 'string') {
    return { isValid: false, error: 'Aadhaar number is required' };
  }

  // Remove spaces and dashes
  const cleanAadhaar = aadhaarNumber.replace(/[\s\-]/g, '');

  // Check if it's 12 digits
  if (!/^\d{12}$/.test(cleanAadhaar)) {
    return { isValid: false, error: 'Aadhaar number must be 12 digits' };
  }

  // Validate using Verhoeff algorithm (simplified)
  if (!isValidAadhaarChecksum(cleanAadhaar)) {
    return { isValid: false, error: 'Invalid Aadhaar number' };
  }

  return { isValid: true, aadhaar: cleanAadhaar };
};

// Simplified Aadhaar checksum validation
const isValidAadhaarChecksum = (aadhaar) => {
  // This is a simplified version. In production, implement the full Verhoeff algorithm
  const digits = aadhaar.split('').map(Number);
  const checksum = digits.pop();
  
  // Simple checksum validation (not the actual Verhoeff algorithm)
  const sum = digits.reduce((acc, digit, index) => acc + digit * (index + 1), 0);
  return (sum % 10) === checksum;
};

export default {
  validateInput,
  sanitizeInput,
  validateFile,
  validateCoordinates,
  validateAadhaar
};
