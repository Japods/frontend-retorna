import { useEffect } from "react";
import HeaderComponent from "./components/layout/Header";
import TaskCreateComponent from "./components/molecules/TaskCreate";
import TaskListComponent from "./components/organisms/TaskList";

const App = () => {
  const body = document.body;

  if (!body.getAttribute("data-theme")) {
    body.setAttribute("data-theme", "dark");
  }

  useEffect(() => {
    // Función para aplicar clases según el atributo `data-theme`
    const applyThemeClasses = () => {
      const theme = body.getAttribute("data-theme") as "dark" | "light";
      document.body.classList.add(
        theme === "dark" ? "dark-theme" : "light-theme"
      );
    };

    // Aplicar tema inicial
    applyThemeClasses();

    // Observar cambios en `data-theme`
    const observer = new MutationObserver(() => applyThemeClasses());
    observer.observe(body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className="container">
        <HeaderComponent />
        <TaskCreateComponent />
        <TaskListComponent />
      </div>
    </>
  );
};

export default App;
