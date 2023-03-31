import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div className="app-container background-gradient">
      <Header height="100" />
      <AppRouter />
    </div>
  );
};

export default App;
