import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let res;

    if (isFavorite) {
      res = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      res = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = res?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const FavoriteIcon = isHovered ? AiOutlineCheck : AiOutlinePlus;
  const UnFavoriteIcon = isHovered ? AiOutlineClose : AiOutlineCheck;

  return (
    <div
      onClick={toggleFavorites}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer 
        group/item
        w-6 h-6 
        lg:w-10 
        lg:h-10
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
        "
    >
      {!isFavorite ? (
        <FavoriteIcon className="text-white" size={25} />
      ) : (
        <UnFavoriteIcon className="text-white" size={25} />
      )}
    </div>
  );
};

export default FavoriteButton;
