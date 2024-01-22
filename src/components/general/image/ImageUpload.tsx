'use client'
import {ChangeEvent, useState} from 'react';
import MyButton from "@/components/general/MyButton";
import Image from "next/image";

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // @ts-ignore
            setSelectedImage(file);
        }
    };

    return (
        <div className="mt-8">
            {selectedImage && <MyButton label={"Clear image"} onTap={() => setSelectedImage(null)}/>}
            <label className=" relative cursor-pointer block text-sm font-medium text-gray-700">
                {selectedImage ? (
                        <div className="mt-4">
                            <Image
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                width={600}
                                height={200}
                                className="mt-2 mx-[auto] h-[50%] border rounded-md"
                            />
                        </div>
                    ) :
                    <div className="w-[100%] h-[300px] flex items-center bg-white p-2 border rounded-md">
                        <p className={"mx-[auto]"}>Choose an image</p>
                    </div>
                }
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only" // This class hides the actual input
                />
            </label>


        </div>
    );
};

export default ImageUpload;
