import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useAppStore } from './store/appStore';

function App() {
  const { darkMode } = useAppStore();

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="font-['Inter']">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
