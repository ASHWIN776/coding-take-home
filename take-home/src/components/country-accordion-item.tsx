import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import ListingCard from "./listing-card";
import type { Listing, Property } from "../types";

interface CountryAccordionItemProps {
  country: string;
  items: Listing[];
  property: Property;
}

const CountryAccordionItem: React.FC<CountryAccordionItemProps> = ({ country, items, property }) => (
  <AccordionItem value={country}>
    <AccordionTrigger>
      <span className="text-md font-semibold">{country} ({items.length})</span>
    </AccordionTrigger>
    <AccordionContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <ListingCard key={item.id} item={item} highlightMissing={property} />
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default CountryAccordionItem;
