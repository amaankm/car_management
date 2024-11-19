import { useState } from "react";
import Card from "./Card";
import Filter from "./Filter";
import List from "./List";

interface ViewProps {
  cars: {
    id: number;
    image: string;
    title: string;
    description: string;
    tags: string[];
  }[];
}

const View: React.FC<ViewProps> = ({ cars }) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  return (
    <div className="container flex flex-col w-full max-w-screen-lg gap-10 p-5 mx-auto">
      <Filter
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
      />
      {view == "grid" && (
        <div className="grid w-full grid-cols-2 gap-5 mx-auto sm:grid-cols-3">
          {cars
            .filter(
              (car) =>
                car.title.toLowerCase().includes(search.toLowerCase()) ||
                car.description.toLowerCase().includes(search.toLowerCase()) ||
                car.tags.some((tag) =>
                  tag.toLowerCase().includes(search.toLowerCase())
                )
            )
            .map((car) => (
              <Card
                id={car.id}
                image={car.image}
                title={car.title}
                description={car.description}
                tags={car.tags}
              />
            ))}
        </div>
      )}
      {view == "list" && (
        <div className="flex flex-col w-full max-w-screen-lg gap-3 mx-auto">
          {cars
            .filter(
              (car) =>
                car.title.toLowerCase().includes(search.toLowerCase()) ||
                car.description.toLowerCase().includes(search.toLowerCase()) ||
                car.tags.some((tag) =>
                  tag.toLowerCase().includes(search.toLowerCase())
                )
            )
            .map((car) => (
              <List
                image={car.image}
                title={car.title}
                description={car.description}
                tags={car.tags}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default View;
