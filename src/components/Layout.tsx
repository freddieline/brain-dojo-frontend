import { Size } from "../types/constants";

const Layout: React.FC<any> = ({
  size,
  children,
}: {
  size: Size;
  children: any;
}) => {
  let className;
  if (size == Size.small) {
    className = `mt-4 rounded-lg max-w-[280px] m-auto p-3`;
  } else if (size == Size.medium) {
    className = `mt-4 rounded-lg max-w-[440px] m-auto p-3`;
  } else {
    className = `mt-4 rounded-lg max-w-[570px] m-auto p-3`;
  }

  return <div className={className}>{children}</div>;
};

export default Layout;
