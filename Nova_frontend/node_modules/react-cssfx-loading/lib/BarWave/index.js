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
import "../../css/BarWave.css";
const BarWave = (_a) => {
    var { className = "", color = "#0d6efd", width = "2em", height = "1em", style, duration = "1s" } = _a, others = __rest(_a, ["className", "color", "width", "height", "style", "duration"]);
    return (_jsxs("div", Object.assign({}, others, { style: Object.assign(Object.assign({}, style), { ["--width"]: width, ["--height"]: height, ["--color"]: color, ["--duration"]: duration }), className: `cssfx-bar-wave ${className}` }, { children: [_jsx("span", {}, void 0), _jsx("span", {}, void 0), _jsx("span", {}, void 0), _jsx("span", {}, void 0)] }), void 0));
};
export default BarWave;
//# sourceMappingURL=index.js.map