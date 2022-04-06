var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import "../../css/Spin.css";
const Spin = (_a) => {
    var { className = "", color = "#0d6efd", width = "2em", height = "2em", style, duration = "1s" } = _a, others = __rest(_a, ["className", "color", "width", "height", "style", "duration"]);
    return (_jsx("div", Object.assign({}, others, { style: Object.assign(Object.assign({}, style), { ["--width"]: width, ["--height"]: height, ["--color"]: color, ["--duration"]: duration, ["--border-color"]: /^\#......$/gm.test(color)
                ? `${color}33`
                : color }), className: `cssfx-spin ${className}` }), void 0));
};
export default Spin;
//# sourceMappingURL=index.js.map