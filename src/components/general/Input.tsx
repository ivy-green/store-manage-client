import React, {ChangeEventHandler, useState} from "react";

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
    onChange: (input: string) => void;
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
                          onChange,
                          setDisabled = false,
                      }: InputProps) {
    const [text, setText] = useState(value);
    let style = {
        width: width,
        borderRadius: "10px",
    };
    let inputStyle = {
        width: width,
        height: height,
        // border: isBorder ? "solid 1px #d3d3d3" : "",
        // borderRadius: "10px",
        boxShadow: boxShadow,
    };

    return (
        <div
            className={`input_container flex-direction-column bg-white ` + className}
            style={style}
        >
            {label && <label className="text_dark text_gray">{label}</label>}
            <div
                className={`flex input_content m-0 border-2 rounded-[5px] ${setDisabled ? 'bg-grey' : 'bg-white'}`}
                style={inputStyle}>
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
                    className="text_dark w-[100%] ms-3 focus:outline-none rounded-[10px] bg-[transparent]"
                    placeholder={placeholder}
                    value={value != "" ? text : value}
                    type={type}
                    // defaultValue={value}
                    onChange={(e) => {
                        setText(e.target.value);
                        onChange(e.target.value)
                    }}
                    disabled={setDisabled}
                />
            </div>
        </div>
    );
}
