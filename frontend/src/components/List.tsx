type ListProps = {
  image: string;
  title: string;
  description: string;
  tags: string[];
};

const List: React.FC<ListProps> = ({ image, title, description, tags }) => {
  return (
    <div className="grid h-full grid-cols-4 gap-4 bg-white border-b border-black max-h-92">
      <div className="h-full">
        <img src={image} className="object-cover w-full h-full" />
      </div>

      {/* List Content */}
      <div className="flex flex-col col-span-3 gap-3">
        <h2 className="text-lg font-semibold text-black sm:text-xl line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex gap-2 overflow-y-auto flex-nowrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs text-white bg-black rounded-full text-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
