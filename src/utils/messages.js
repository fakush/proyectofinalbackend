const formatMessages = (data) => {
  const { username, text, time } = data;
  return {
    username,
    text,
    time
  };
};

export default formatMessages;
