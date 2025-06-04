import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Listing, Property } from '../types';

interface Props {
  item: Listing;
  highlightMissing?: Property;
}

export default function ListingCard({ item, highlightMissing }: Props) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{item.first_name} {item.last_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 pt-0">
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-neutral-700">Email</span> 
          <span className="text-neutral-700">{item.email}</span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-neutral-700">Country</span> 
          <span className="text-neutral-700">{item.country || "-"}</span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-neutral-700">Language</span> 
          <span className={highlightMissing==='language' && !item.language ? 'italic text-red-600' : 'text-neutral-700'}>{item.language || (highlightMissing==='language' ? 'Missing' : '-')}</span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-neutral-700">Color</span> 
          <span className={highlightMissing==='color' && !item.color ? 'italic text-red-600' : 'text-neutral-700'}>{item.color || (highlightMissing==='color' ? 'Missing' : '-')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
