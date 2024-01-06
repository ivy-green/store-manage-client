import React, {ChangeEventHandler} from "react";

//css
import MyButton from "@/components/general/MyButton";

interface InputProps {
    label?: string;
    placeholder?: string;
    type?: string;
    width?: string;
    height?: string;
    isBorder?: boolean;
    boxShadow?: string;
    icon?: string | React.ReactNode | null;
    value: string;
    className?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    setDisabled?: boolean;
}

export function Input({
                          label = "",
                          placeholder = "",
                          type = "text",
                          width = "100%",
                          height = "50px",
                          isBorder = false,
                          boxShadow = "0 0 5px var(--box-shadow-color)",
                          icon,
                          value = "",
                          className = "",
                          onChange = function (v) {
                          },
                          setDisabled = false,
                      }: InputProps) {
    let style = {
        width: width,
        borderRadius: "10px",
    };
    let inputStyle = {
        width: width,
        height: height,
        border: isBorder ? "solid 1px #d3d3d3" : "",
        borderRadius: "10px",
        boxShadow: boxShadow,
    };

    return (
        <div
            className={"input_container flex-direction-column bg-white " + className}
            style={style}
        >
            {label && <label className="text_dark text_gray">{label}</label>}
            <div className="flex input_content m-0" style={inputStyle}>
                {icon && (
                    <MyButton
                        label=""
                        bgColor="transparent"
                        onTap={() => {
                        }}
                        prefix={icon}
                        fontColor={"text-default"}
                    />
                )}
                <input
                    className="text_dark w-[100%] focus:outline-none"
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    defaultValue={value}
                    onChange={onChange}
                    disabled={setDisabled}
                />
            </div>
        </div>
    );
}
