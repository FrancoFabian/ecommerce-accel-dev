import { ExpandableSection } from "./ExpandableButton";

export const ProductDetails = () => {
    return (
      <div className="px-2 w-full -mx-1 mt-2" data-orientation="vertical">
        <ExpandableSection
          title="Size & Fit"
          content={
            <ul className="list-inside list-disc">
              <li className="text-default-500">Fits small; we recommend ordering a half size up</li>
              <li className="text-default-500">Mid-weight, non-stretchy fabric</li>
              <li className="text-default-500">Designed for a mini length</li>
            </ul>
          }
        />
        <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
        <ExpandableSection title="Shipping & Returns" content={<p>Information about shipping and returns.</p>} />
        <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
        <ExpandableSection title="Designer Notes" content={<p>Additional notes from the designer.</p>} />
      </div>
    );
  };