import { useQuery } from "@tanstack/react-query";
import View from "../components/View";

// const cars = [
//   {
//     id: 0,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Honda Civic",
//     description: "A reliable and efficient sedan perfect for daily commuting.",
//     tags: ["Sedan", "Honda", "Dealer 1"],
//   },
//   {
//     id: 1,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "BMW M3",
//     description: "A high-performance sports sedan designed for thrill-seekers.",
//     tags: ["Sports", "BMW", "Dealer 2"],
//   },
//   {
//     id: 2,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Tesla Model S",
//     description:
//       "An electric luxury sedan that combines performance with sustainability.",
//     tags: ["Electric", "Tesla", "Dealer 3"],
//   },
//   {
//     id: 3,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Ford Mustang",
//     description: "An iconic American muscle car with powerful engine options.",
//     tags: ["Muscle", "Ford", "Dealer 4"],
//   },
//   {
//     id: 4,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Toyota Corolla",
//     description:
//       "A compact sedan known for its reliability and fuel efficiency.",
//     tags: ["Sedan", "Toyota", "Dealer 5"],
//   },
//   {
//     id: 5,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Chevrolet Camaro",
//     description:
//       "A sleek, performance-oriented muscle car with aggressive styling.",
//     tags: ["Muscle", "Chevrolet", "Dealer 6"],
//   },
//   {
//     id: 6,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Audi Q5",
//     description:
//       "A luxurious and spacious SUV designed for comfort and versatility.",
//     tags: ["SUV", "Audi", "Dealer 7"],
//   },
//   {
//     id: 7,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Nissan Leaf",
//     description:
//       "An affordable and eco-friendly electric vehicle for everyday use.",
//     tags: ["Electric", "Nissan", "Dealer 8"],
//   },
//   {
//     id: 8,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Porsche 911",
//     description:
//       "A legendary sports car known for its handling and timeless design.",
//     tags: ["Sports", "Porsche", "Dealer 9"],
//   },
//   {
//     id: 9,
//     image: "https://readymadeui.com/hotel-img.webp",
//     title: "Toyota RAV4",
//     description:
//       "A compact crossover SUV with a focus on practicality and efficiency.",
//     tags: ["SUV", "Toyota", "Dealer 10"],
//   },
// ];

const Home = () => {
  const {
    data: Cars,
    // isLoading,
    // refetch,
    // isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/cars");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message); // Safely access the error message
        } else {
          throw new Error(String(error)); // Convert unknown types to a string
        }
      }
    },
  });

  return (
    <div className="container flex flex-col gap-10 mx-auto">
      <View cars={Cars} />
    </div>
  );
};

export default Home;
