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
    className = `mt-4 rounded-lg w-[255px] m-auto`;
  } else if (size == Size.medium) {
    className = `mt-4 rounded-lg w-[400px] m-auto`;
  } else {
    className = `mt-4 rounded-lg w-[600px] m-auto`;
  }

  return <div className={className}>{children}</div>;
};

export default Layout;
