import React from "react";

const CustomLegend =({payload}) =>{
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
            {payload.map((entry: { color: any; value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: any) => (
                <div key={`legend-${index}`} className="flex items-center space-x-2">
                    <div
                        className="w-2.5 h-3 rounded-full"
                        style={{backgroundColor: entry.color}}
                    ></div>

                    <span className="tex-sm text-gray-700 font-medium">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default CustomLegend;