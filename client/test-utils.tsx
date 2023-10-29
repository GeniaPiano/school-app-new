import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { AllProviders } from "./src/providers/AllProviders";
import {ReactNode} from "react";

export const AllTheProviders = ({ children }: { children: ReactNode }): RenderResult => {
    return render (
        <AllProviders>
            {children}
        </AllProviders>
    );
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
