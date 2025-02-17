import ThemeToggleComponent from "../atoms/ThemeToggle";

const HeaderComponent = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1>T O D O</h1>
        <ThemeToggleComponent />
      </div>
    </>
  );
};

export default HeaderComponent;
