const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="max-w-[500px] m-auto mt-4 rounded-lg w-[255px]">
      {children}
    </div>
  );
};

export default Layout;
