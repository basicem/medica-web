const convertToBase64 = (file) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    resolve(fileReader.result);
  };
  fileReader.onerror = (error) => {
    reject(error);
  };
});

const parseErrorRespons = (err, defaultMessage) => {
  if (err.response) {
    const responseData = err.response.data;
    return responseData?.error || defaultMessage;
  }
  return defaultMessage;
};

module.exports = { convertToBase64, parseErrorRespons };
