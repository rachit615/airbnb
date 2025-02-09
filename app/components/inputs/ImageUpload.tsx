import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (response: any) => {
      const uploadedImageUrl = response?.info?.url;
      if (uploadedImageUrl) {
        onChange(uploadedImageUrl);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      uploadPreset="sgq16zyq"
      onUpload={handleUpload}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="relative flex flex-col items-center justify-center cursor-pointer
             gap-4 border-dashed border-neutral-300 hover:opacity-70 text-neutral-600
             border-2 p-16"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="w-full h-full">
                <Image
                  src={value}
                  alt="upload"
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
