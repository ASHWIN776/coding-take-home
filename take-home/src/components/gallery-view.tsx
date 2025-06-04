import type { Listing, Property } from '../types';
import ListingCard from './listing-card';

interface Props {
  listings: Listing[];
  grouped: Record<string, Listing[]>;
  groupByCountry: boolean;
  showMissing: boolean;
  property: Property; 
}

export default function GalleryView({
  listings,
  grouped,
  groupByCountry,
  showMissing,
  property,
}: Props){
  const isGrouped = groupByCountry && Object.keys(grouped).length > 0;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-y-1">
        <span className="font-bold text-lg">
          {
          showMissing ? (
            <>
              Listings missing <span className="underline">{property}</span> ({listings.length})
            </>
            ) : (
              <>
                Listings ({listings.length})
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
      {
        isGrouped ? (
          Object.entries(grouped).map(([country, items]) => (
            <div key={country} className="mb-6">
              <div className="mb-2 text-md font-semibold underline">{country} ({items.length})</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ListingCard key={item.id} item={item} highlightMissing={property} />
                ))}
              </div>
            </div>
          ))
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
