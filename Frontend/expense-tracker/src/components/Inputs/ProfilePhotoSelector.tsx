import React, { ChangeEvent } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

interface ProfilePhotoSelectorProps {
    image: File | null;
    setImage: (file: File | null) => void;
}

const ProfilePhotoSelector = ({ image, setImage }: ProfilePhotoSelectorProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewURL, setPreviewURL] = React.useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement | null;
        const file = target && target.files ? target.files[0] : null;
        if (file){
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    const RemoveImage = () => {
        setImage(null);
        setPreviewURL(null);
    };
    const ChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }
    return(
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ?(
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <LuUser className="text-4xl text-primary"/>
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={ChooseFile}
                    >
                    <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img 
                        src={previewURL ?? undefined}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={RemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}
export default ProfilePhotoSelector;