import Users from "./components/Users";
import "./index.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>MERN Error Handling</h1>
        <p>Centralized Error Handling & Standard API Responses</p>
      </header>

      <main>
        <Users />
      </main>
    </div>
  );
}

export default App;