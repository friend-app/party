export function checkValidity(value, rules) {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (!value) {
    return false;
  }

  if (value instanceof File) {
      let valid = false; 
      switch (value.type) {
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
          valid = true;
          break;
        default:
          valid = false; // Or you can use the blob.type as fallback
          break;
      }
      isValid = value.size < rules.fileSize && valid && isValid;
  } else {
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isDate) {
      isValid = value instanceof Date && isValid;
    }
    // console.log("ebat", isValid);
  }
  return isValid;
}
