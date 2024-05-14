import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Plus = () => {
  return (
    <Link
      to="/create"
      className="bg-teal-600 p-2 text-white rounded-full w-50 h-50 fixed bottom-20 right-28 cursor-pointer max-sm:hidden"
    >
      <PlusIcon width={30} height={30} />
    </Link>
  );
};

export default Plus;
