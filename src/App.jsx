import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Outlet />
    </div>
  );
}



export default App;
