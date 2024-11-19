import { Link } from "react-router-dom";

type CardProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
};

const Card: React.FC<CardProps> = ({ id, image, title, description, tags }) => {
  return (
    <Link
      to={`/cars/${id}`}
      className="relative flex flex-col w-full max-w-md gap-2 overflow-hidden bg-white border-2 border-black aspect-square group"
    >
      <img src={image} className="object-cover w-full h-full" />

      {/* Card Content */}
      <h2 className="absolute p-2 text-lg font-bold text-white bg-black border-b border-r border-white sm:text-xl line-clamp-1">
        {title}
      </h2>
      <div className="absolute bottom-0 flex flex-col gap-4 p-3 transition-all bg-white translate-y-9 group-hover:translate-y-0">
        <p className="text-sm text-neutral-black line-clamp-5">{description}</p>

        {/* Tags */}
        <div className="flex gap-2 overflow-hidden flex-nowrap">
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
    </Link>
  );
};

export default Card;
