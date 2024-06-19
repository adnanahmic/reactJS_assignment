import React from "react";
import { Flower } from "../../redux/reducers/flowerReducer";
import { FlowerStar } from "../../assets";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface props {
  flower: Flower;
}

const FlowerCard = (props: props) => {
  const { flower } = props;

  const { token } = useTypedSelector((state) => state.auth);

  return (
    <div className="flowerCard relative">
      <img
        className="w-full h-full object-cover"
        src={flower.profile_picture}
        alt={flower.name}
      />
      <div className="absolute top-[20px] right-[20px] flex flex-row justify-end flower_start_section">
        {token && (
          <button className="flower_star_btn h-[30px] w-[30px] flex flex-row  justify-center items-center  bg-white rounded-full ">
            <FlowerStar />
          </button>
        )}
      </div>
      <div className="absolute flower_content w-full text-white bottom-0">
        <h3 className="flower_name">{flower.name}</h3>
        <span className="mb-5 flower_caption">{flower.latin_name}</span>

        <span className="flower_sightings mb-5 p-3">
          {flower.sightings} sightings
        </span>
      </div>
    </div>
  );
};

export default FlowerCard;
