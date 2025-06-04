import { useState, useMemo, useEffect } from 'react';
import {
  fetchByProperty,
  fetchNullData,
  fetchCountryData
} from './middleware/middleware.ts';
import FilterForm from './components/filter-form.tsx';
import GalleryView from './components/gallery-view.tsx';
import type { Listing, Property } from './types.ts';
import './index.css';
import { groupDataByCountry } from './lib/utils.ts';

const primaryBg = 'bg-white';
const primaryText = 'text-black';

function App() {
  const [property, setProperty] = useState<Property>('color');
  const [value, setValue] = useState<string>('');
  const [groupByCountry, setGroupByCountry] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  const valueOptions = useMemo(() => {
    const allDataByCountry: Record<string, Listing[]> = fetchCountryData();
    const allData = Object.values(allDataByCountry).flat();
    return Array.from(new Set(
      allData.map((item) => item[property]).filter((v): v is string => !!v)
    ));
  }, [property]);
  const listings = useMemo(() => {
    if (showMissing) {
      return fetchNullData(property);
    } else if (value) {
      return fetchByProperty(property, value);
    } else {
      return [];
    }
  }, [property, value, showMissing]);
  const grouped = useMemo(() => {
    if (groupByCountry) {
      const groupedData = groupDataByCountry(listings);

      const unknownListings = groupedData['Unknown'] || [];
      delete groupedData['Unknown'];
      return {
        ...groupedData,
        'Unknown': unknownListings
      };
    } else {
      return {};
    }
  }, [groupByCountry, listings]);

  useEffect(() => {
    if (!valueOptions.includes(value)) {
      setValue(valueOptions[0] || '');
    }
  }, [property, valueOptions, value]);

  return (
    <div className={`min-h-screen ${primaryBg} ${primaryText} flex flex-col items-center py-10 px-2 font-sans`}>
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-center">Flexible List of Listings</h1>
          <span className="text-sm text-neutral-500">By <a href="https://github.com/ashwin776" target="_blank" rel="noopener noreferrer" className="underline">Ashwin Anil</a></span>
        </div>
        <FilterForm
          property={property}
          setProperty={setProperty}
          value={value}
          setValue={setValue}
          valueOptions={valueOptions}
          groupByCountry={groupByCountry}
          setGroupByCountry={setGroupByCountry}
          showMissing={showMissing}
          setShowMissing={setShowMissing}
        />
        <GalleryView
          listings={listings}
          grouped={grouped}
          groupByCountry={groupByCountry}
          showMissing={showMissing}
          property={property}
          value={value}
        />
      </div>
    </div>
  );
}

export default App;
