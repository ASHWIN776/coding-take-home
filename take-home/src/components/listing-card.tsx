import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, AlertCircle } from 'lucide-react';
import type { Listing, Property } from '../types';

interface Props {
  item: Listing;
  highlightMissing?: Property;
}

export default function ListingCard({ item, highlightMissing }: Props) {
  return (
    <Card className="flex flex-col justify-between gap-y-6 overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-xl">{item.first_name} {item.last_name}</CardTitle>
        <CardDescription>{item.country}</CardDescription>
        <div className="flex items-center gap-2 bg-neutral-50 rounded px-2 py-1 text-sm w-fit">
          <Mail className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <span className="text-neutral-800 font-medium select-all">{item.email}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-y-5 pt-0">
        <div className="flex flex-col gap-y-2 text-sm text-neutral-700">
          {item.language ? (
            <span>{item.language}</span>
          ) : (
            <span className="italic text-neutral-400 flex items-center gap-1">
              {highlightMissing === 'language' ? (
                <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
              ) : null}
              {highlightMissing === 'language' ? 'Missing Language' : '-'}
            </span>
          )}
          {item.color ? (
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full border border-neutral-200" style={{ backgroundColor: item.color }}></span>
              <span>{item.color}</span>
            </span>
          ) : (
            <span className="italic text-neutral-400 flex items-center gap-1">
              {highlightMissing === 'color' ? (
                <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
              ) : null}
              {highlightMissing === 'color' ? 'Missing Color' : '-'}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
