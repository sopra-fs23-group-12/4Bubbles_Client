import AppRouter from "components/routing/routers/AppRouter";
import { SocketProvider } from "components/context/socket";
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <SocketProvider>

      <div className="app-container background-gradient">
        <AppRouter />
      </div>
    </SocketProvider>

  );
};

export default App;
