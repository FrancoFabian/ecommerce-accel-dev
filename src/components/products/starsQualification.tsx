import { StarsSvg } from "./StarsSvg";
interface Props {
    rating: number;
    maxValue?: number;
    gaps?: string;
}
export const StarsQualification = ({ rating, maxValue = 5 ,gaps}: Props) => {
    return (
        <div className={`flex ${gaps}`}>
            {Array.from({ length: maxValue }, (_, index) => (
                <StarsSvg
                    key={index}
                    isFilled={index < rating}
                    color={index < rating ? 'primary' : '#8d8c8e'}
                />
            ))}
        </div>
    )
}
