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
import "../../css/TwinSpin.css";
const TwinSpin = (_a) => {
    var { className = "", color = "#0d6efd", width = "3em", height = "3em", style, duration = "0.6s" } = _a, others = __rest(_a, ["className", "color", "width", "height", "style", "duration"]);
    return (_jsx("div", Object.assign({}, others, { style: Object.assign(Object.assign({}, style), { ["--width"]: width, ["--height"]: height, ["--color"]: color, ["--duration"]: duration }), className: `cssfx-twin-spin ${className}` }), void 0));
};
export default TwinSpin;
//# sourceMappingURL=index.js.map