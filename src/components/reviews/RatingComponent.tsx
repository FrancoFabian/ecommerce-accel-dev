import { HiMiniPencil } from "react-icons/hi2";
import { StarsSvg } from "../products/StarsSvg";
import { Rating , ProgressBar } from "./ProgressBar";

interface RatingComponentProps {
    averageRating: number;
    totalReviews: number;
    ratingsBreakdown: Rating[];
    onClick?: () => void;
  }
  
export const RatingComponent = ({
    averageRating,
    totalReviews,
    ratingsBreakdown,
    onClick
  }: RatingComponentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-medium bg-content1 p-6 shadow-small">
        <div className="flex items-center gap-2">
          <StarsSvg className="w-6 h-6" isFilled={true} color="#eda319"/>
          <span className="text-large font-semibold">{averageRating}</span>
          <span className="text-default-500">• (Basado en {totalReviews} reseñas)</span>
        </div>
        <div className="flex flex-col gap-2">
          {ratingsBreakdown.map((rating) => (
            <ProgressBar
              key={rating.stars}
              stars={rating.stars}
              percentage={rating.percentage}
            />
          ))}
        </div>
        <div className="mt-4 flex w-full flex-col gap-4">
          <button
            className="group relative inline-flex items-center justify-center px-4 min-w-20 h-10 text-sm gap-2 rounded-full border border-default bg-transparent text-foreground hover:opacity-90 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2"
            type="button"
            onClick={onClick}
          >
            <HiMiniPencil className="w-4 h-4 text-default-500" />
            Escribe una reseña
          </button>
          <p className="px-2 text-small text-default-500">
            Comparte tu experiencia con este producto
          </p>
        </div>
      </div>
    </div>
  )
}
