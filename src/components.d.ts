/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CpExample {
    }
}
declare global {
    interface HTMLCpExampleElement extends Components.CpExample, HTMLStencilElement {
    }
    var HTMLCpExampleElement: {
        prototype: HTMLCpExampleElement;
        new (): HTMLCpExampleElement;
    };
    interface HTMLElementTagNameMap {
        "cp-example": HTMLCpExampleElement;
    }
}
declare namespace LocalJSX {
    interface CpExample {
    }
    interface IntrinsicElements {
        "cp-example": CpExample;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cp-example": LocalJSX.CpExample & JSXBase.HTMLAttributes<HTMLCpExampleElement>;
        }
    }
}
