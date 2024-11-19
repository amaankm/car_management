import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { TfiPencilAlt, TfiTrash } from "react-icons/tfi";

const cars = [
  {
    id: 0,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Honda Civic",
    description: "A reliable and efficient sedan perfect for daily commuting.",
    tags: ["Sedan", "Honda", "Dealer 1"],
  },
  {
    id: 1,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "BMW M3",
    description: "A high-performance sports sedan designed for thrill-seekers.",
    tags: ["Sports", "BMW", "Dealer 2"],
  },
  {
    id: 2,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Tesla Model S",
    description:
      "An electric luxury sedan that combines performance with sustainability.",
    tags: ["Electric", "Tesla", "Dealer 3"],
  },
  {
    id: 3,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Ford Mustang",
    description: "An iconic American muscle car with powerful engine options.",
    tags: ["Muscle", "Ford", "Dealer 4"],
  },
  {
    id: 4,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Toyota Corolla",
    description:
      "A compact sedan known for its reliability and fuel efficiency.",
    tags: ["Sedan", "Toyota", "Dealer 5"],
  },
  {
    id: 5,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Chevrolet Camaro",
    description:
      "A sleek, performance-oriented muscle car with aggressive styling.",
    tags: ["Muscle", "Chevrolet", "Dealer 6"],
  },
  {
    id: 6,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Audi Q5",
    description:
      "A luxurious and spacious SUV designed for comfort and versatility.",
    tags: ["SUV", "Audi", "Dealer 7"],
  },
  {
    id: 7,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Nissan Leaf",
    description:
      "An affordable and eco-friendly electric vehicle for everyday use.",
    tags: ["Electric", "Nissan", "Dealer 8"],
  },
  {
    id: 8,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Porsche 911",
    description:
      "A legendary sports car known for its handling and timeless design.",
    tags: ["Sports", "Porsche", "Dealer 9"],
  },
  {
    id: 9,
    image: "https://readymadeui.com/hotel-img.webp",
    title: "Toyota RAV4",
    description:
      "A compact crossover SUV with a focus on practicality and efficiency.",
    tags: ["SUV", "Toyota", "Dealer 10"],
  },
];

const Car = () => {
  const { id } = useParams();

  const car = cars.filter((car) => car.id === Number(id))[0];
  return (
    <div className="container flex flex-col gap-10 mx-auto">
      <NavBar />
      <div className="grid w-full max-w-screen-lg grid-cols-3 gap-10 p-5 mx-auto transition-all">
        <div className="col-span-2">
          <img src={car.image} className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold">{car.title}</h2>
            <p className="text-lg text-neutral-500">{car.description}</p>

            {/* Tags */}
            <div className="flex gap-2 overflow-hidden flex-nowrap">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-white bg-black rounded-full text-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-around gap-4 h-14">
            <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-lg font-bold text-black bg-white hover:text-white outline outline-2 hover:bg-black outline-black">
              <TfiTrash className="h-full py-1" />
              <span>DELETE</span>
            </button>
            <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-lg font-bold text-white bg-black ountline outline-2 outline-black">
              <TfiPencilAlt className="h-full py-1" />
              <span>UPDATE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
