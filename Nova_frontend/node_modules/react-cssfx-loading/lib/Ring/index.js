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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../css/Ring.css";
const Ring = (_a) => {
    var { className = "", color = "#0d6efd", width = "3em", height = "3em", style, duration = "1s" } = _a, others = __rest(_a, ["className", "color", "width", "height", "style", "duration"]);
    return (_jsxs("svg", Object.assign({}, others, { crossOrigin: "anonymous", viewBox: "0 0 50 50", style: Object.assign(Object.assign({}, style), { ["--width"]: width, ["--height"]: height, ["--color"]: color, ["--duration"]: duration }), className: `cssfx-ring-svg ${className}` }, { children: [_jsx("circle", { className: "cssfx-ring", cx: "25", cy: "25", r: "20" }, void 0), _jsx("circle", { className: "cssfx-ring-ball", cx: "25", cy: "5", r: "3.5" }, void 0)] }), void 0));
};
export default Ring;
//# sourceMappingURL=index.js.map