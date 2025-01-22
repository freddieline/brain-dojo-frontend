import { jsx as _jsx } from "react/jsx-runtime";
import { Size } from "../types/constants";
const Layout = ({ size, children, }) => {
    let className;
    if (size == Size.small) {
        className = `rounded-lg max-w-[280px] m-auto p-3`;
    }
    else if (size == Size.medium) {
        className = `rounded-lg max-w-[440px] m-auto p-3`;
    }
    else {
        className = `rounded-lg max-w-[570px] m-auto p-3`;
    }
    return _jsx("div", { className: className, children: children });
};
export default Layout;
