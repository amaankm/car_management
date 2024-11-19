import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiFileImageLight } from "react-icons/pi";

type FormValues = {
  title: string;
  description: string;
  tags: string[];
  images: File[];
};

const ProductForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      images: [],
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files);
    if (images.length + newImages.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setImages((prev) => [...prev, ...newImages]);
    setValue("images", [...images, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue("images", updatedImages);
  };

  const handleSetThumbnail = (index: number) => {
    const newImages = [...images];
    const [thumbnailImage] = newImages.splice(index, 1); // Remove the selected image
    newImages.unshift(thumbnailImage); // Add it to the front
    setImages(newImages);
    setValue("images", newImages); // Update the form value
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const updatedTags = [...tags, tagInput.trim()];
      setTags(updatedTags);
      setValue("tags", updatedTags);
      setTagInput("");
    }
  };

  const handleTagRemove = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
    // Handle API submission here
  };

  return (
    <div className="flex flex-col justify-center min-h-screen gap-10 py-5">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Create a New Car Listing
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-screen-lg grid-cols-3 gap-10 p-5 mx-auto transition-all sm:grid"
      >
        {/* Images */}
        <div className="col-span-2">
          <div className="grid grid-cols-4 gap-4">
            <div className="relative flex flex-col items-center justify-center cursor-pointer outline-dashed outline-1 aspect-square">
              <PiFileImageLight className="w-8 h-8" />
              <label className="text-lg font-medium text-gray-700">
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="object-cover w-full h-full aspect-square"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute px-1 text-sm text-white bg-red-500 rounded-full top-1 right-1"
                >
                  ×
                </button>
                <button
                  type="button"
                  onClick={() => handleSetThumbnail(index)}
                  className={`absolute px-2 py-1 text-sm font-medium rounded bottom-1 left-1 ${
                    index === 0
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {index === 0 ? "Thumbnail" : "Set as Thumbnail"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          {/* Title */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full p-3 border border-black focus:outline"
                placeholder="Enter car title"
              />
              {errors.title && (
                <p className="mt-2 text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="">
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full p-3 border border-black focus:outline"
                rows={4}
                placeholder="Enter car description"
              ></textarea>
              {errors.description && (
                <p className="mt-2 text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Tags
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 p-3 border border-black focus:outline"
                  placeholder="Add a tag : Car type, Company, Dealer"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-4 py-2 font-semibold text-white bg-black"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 text-white bg-black rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(index)}
                      className="font-bold text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-around gap-4 h-14">
            <button
              type="button"
              className="w-full px-6 py-3 font-semibold text-black bg-white hover:text-white outline outline-2 hover:bg-black outline-black"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="w-full px-6 py-3 font-semibold text-white bg-black ountline outline-2 outline-black"
            >
              SAVE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
