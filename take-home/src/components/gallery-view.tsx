import type { Listing, Property } from '../types';
import ListingCard from './listing-card';
import { Accordion } from './ui/accordion';
import CountryAccordionItem from './country-accordion-item';

interface Props {
  listings: Listing[];
  grouped: Record<string, Listing[]>;
  groupByCountry: boolean;
  showMissing: boolean;
  property: Property; 
  value: string;
}

export default function GalleryView({
  listings,
  grouped,
  groupByCountry,
  showMissing,
  property,
  value,
}: Props){
  const isGrouped = groupByCountry && Object.keys(grouped).length > 0;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-y-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="font-bold text-lg">
              {
              showMissing ? (
                <>
                  Listings missing <span className="underline">{property}</span>
                </>
                ) : (
                  <>
                    Listings for {value} ({property})
                  </>
                )
              }
            </span>
            {
              isGrouped && (
                <span className="text-sm text-neutral-500">Grouped by Country</span>
              )
            }
          </div>
          <span className="text-sm text-neutral-500">{listings.length} results</span>
        </div>
      </div>
      {
        isGrouped ? (
          <Accordion type="multiple">
            {Object.entries(grouped).map(([country, items]) => (
              <CountryAccordionItem key={country} country={country} items={items} property={property} />
            ))}
          </Accordion>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listings.map((item) => (
              <ListingCard key={item.id} item={item} highlightMissing={property} />
            ))}
          </div>
        )
      }
    </div>
  );
};
