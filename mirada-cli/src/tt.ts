//@ts-ignore
import {ImAccnpxess, ImGui} from "imgui-js";
// ```
// Individual exports can be imported as well.
// ```typescript
// import { ImVec2 } from "imgui-js";
// ```

// In general, functions that take an address of a variable in C++ have been changed to take an access function in JavaScript.  Calling the access function with no arguments returns the variable, calling with a value sets the variable.

// ```typescript
type ImAccess<T> = (value?: T) => T;

let show: boolean = true;

const _show: ImAccnpxess<boolean> = (_: boolean = show): boolean => show = _;

// get the value of show
console.log(_show()); // true

// set the value of show to false (also returns the updated value)
console.log(_show(false)); // false

  show = true;
function draw(): void {
    if (ImGui.Button("Toggle")) { show = !show; }
    if (show) {
        ImGui.Begin("My Window", (_:any = show) => show = _, ImGui.WindowFlags.AlwaysAutoResize);
        ImGui.Text("Hello, World!");
        ImGui.End();
    }
}