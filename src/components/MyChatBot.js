import ChatBot from "react-chatbotify";

const flow = {
  start: {
    message: "Hello there!",
    path: "end"
  },
  end: {
    message: "See you, goodbye!"
  }
};

const settings = {
  general: {
    primaryColor: "#4a90e2",
    secondaryColor: "#50e3c2"
  }
};

const styles = {
  chatContainer: {
    borderRadius: "10px"
  }
};

const MyComponent = () => {
  return (
    <ChatBot
      flow={flow}
      settings={settings}
      styles={styles}
    />
  );
};
