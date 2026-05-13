import logo from "../../assets/logo.png"

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <img
        src={logo}
        alt="Federal Youth Parliament"
        className="w-44 animate-scalePulse"
      />
    </div>
  );
}

export default LoadingScreen;
