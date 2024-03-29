export const validateName = name => name.trim().length >= 5;

export const validateEmail = email => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email?.toLowerCase());

export const validatePassword = password => /\d/.test(password) && /[a-zA-Z]/.test(password);
