import type { Property } from '../types';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface Props {
  property: Property;
  setProperty: (p: Property) => void;
  value: string;
  setValue: (v: string) => void;
  valueOptions: string[];
  groupByCountry: boolean;
  setGroupByCountry: (v: boolean) => void;
  showMissing: boolean;
  setShowMissing: (v: boolean) => void;
}

export default function FilterForm({
  property,
  setProperty,
  value,
  setValue,
  valueOptions,
  groupByCountry,
  setGroupByCountry,
  showMissing,
  setShowMissing
}: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-">
      <h3 className="text-lg font-bold">Filter Listings</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
        <div className="flex-1 flex flex-col justify-between">
          <Label htmlFor="property-select" className="mb-1 font-semibold text-sm text-neutral-700">Property</Label>
          <Select
            value={property}
            onValueChange={val => setProperty(val as Property)}
          >
            <SelectTrigger id="property-select" className="w-full">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="color">Color</SelectItem>
              <SelectItem value="language">Language</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <Label htmlFor="value-select" className="mb-1 font-semibold text-sm text-neutral-700">Value</Label>
          <Select
            value={value}
            onValueChange={val => setValue(val)}
            disabled={valueOptions.length === 0}
          >
            <SelectTrigger id="value-select" className="w-full">
              <SelectValue placeholder={valueOptions.length === 0 ? 'No values' : 'Select value'} />
            </SelectTrigger>
            <SelectContent>
              {valueOptions.length === 0 ? (
                <SelectItem value="" disabled>No values</SelectItem>
              ) : (
                valueOptions.map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Label className="flex items-center cursor-pointer gap-2">
          <Checkbox
            checked={groupByCountry}
            onCheckedChange={setGroupByCountry}
            className="accent-black h-4 w-4 rounded"
          />
          <span className="text-sm">Group by Country</span>
        </Label>
        <Label className="flex items-center cursor-pointer gap-2">
          <Checkbox
            checked={showMissing}
            onCheckedChange={setShowMissing}
            className="accent-black h-4 w-4 rounded"
          />
          <span className="text-sm">Show Missing Values</span>
        </Label>
      </div>
    </div>
  );
};
