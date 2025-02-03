import "./App.css";
import Footer from "./components/Footer.js/Footer";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="app">
      <Header />
      <Input />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
