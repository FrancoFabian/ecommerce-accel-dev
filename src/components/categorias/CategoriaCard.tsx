
interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode | undefined;
  onClick: () => void;
  gradient?: string;
}

export const CategoryCard = ({ title, description, icon, onClick }: CategoryCardProps) => {
  return (
    <div
      className={`group cursor-pointer
       ${icon !== undefined ? 'bg-white' : 'bg-gray-100/30 text-gray-600'} rounded-lg border border-gray-200 p-6
        transition-all duration-300 flex flex-col items-start 
        lg:items-center md:items-center sm:items-center justify-center
        hover:shadow-lg hover:scale-[1.02] animate-fade-in`}
      onClick={onClick}
    >
      <div className="flex justify-start lg:justify-center md:justify-center sm:justify-center">
        <div className="flex flex-row lg:flex-col md:flex-col 
        sm:flex-col items-center justify-center 
        gap-4
        transition-all ease-in-out">
          {icon !== undefined ? <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div> : null}
          <div className="text-left">
            <h3 className="font-semibold text-sm text-balance">{title}</h3>
            {description.length !== 0 ?<p className="text-[0.7600rem] text-gray-500 mt-1">{description}</p>:null}
          </div>
        </div>
      </div>
    </div>
  );
};