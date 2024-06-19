import React, { useEffect } from "react";
import FlowerCard from "../components/flowerCard/FlowerCard";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getFlowers } from "../redux/actionCreators/flower";
import { useAppDispatch } from "../hooks/hooks";
import Loader from "../components/Loader";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { flowers, loading } = useTypedSelector((state) => state.flowers);

  useEffect(() => {
    dispatch(getFlowers());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full px-5">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {flowers.map((flower, index) => {
          return <FlowerCard key={index} flower={flower} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
