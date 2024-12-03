const Layout: React.FC<any> = ({ width = "600", children }) => {
  const className = `mt-4 rounded-lg w-[${width}px] m-auto`;
  return <div className={className}>{children}</div>;
};

export default Layout;
