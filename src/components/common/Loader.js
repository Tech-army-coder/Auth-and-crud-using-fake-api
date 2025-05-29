const Loader = ({ loading }) => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "relative",
  };

  const fadeInKeyframes = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;

  return (
    <>
      <style>{fadeInKeyframes}</style>{" "}
      {!loading && (
        <div id="preloader" style={loaderContainerStyle}>
          <img src="/spinner.gif" alt="Loading..." />
        </div>
      )}
    </>
  );
};

export default Loader;
