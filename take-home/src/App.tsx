import { useEffect, useState } from 'react';
import {
  fetchData,
  fetchByProperty,
  fetchNullData
} from './middleware/middleware.ts';
import FilterForm from './components/filter-form.tsx';
import GalleryView from './components/gallery-view.tsx';
import type { Listing, Property } from './types.ts';
import './index.css';

const primaryBg = 'bg-white';
const primaryText = 'text-black';

function App() {
  const [property, setProperty] = useState<Property>('color');
  const [value, setValue] = useState<string>('');
  const [valueOptions, setValueOptions] = useState<string[]>([]);
  const [groupByCountry, setGroupByCountry] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Listing[]>>({});

  useEffect(() => {
    const allData: Listing[] = fetchData();
    const values = Array.from(new Set(
      allData.map((item) => item[property]).filter((v): v is string => !!v)
    ));
    setValueOptions(values);
    setValue(values[0] || '');
  }, [property]);

  useEffect(() => {
  if (showMissing) {
    const missing = fetchNullData(property);
    setListings(missing);
  } else if (value) {
    const filtered = fetchByProperty(property, value);
    setListings(filtered);
  } else {
    setListings([]);
  }
}, [property, value, showMissing]);

useEffect(() => {
  if (groupByCountry) {
    const groupedData = listings.reduce((acc, item) => {
      if (item.country) {
        acc[item.country] = acc[item.country] || [];
        acc[item.country].push(item);
      }
      return acc;
    }, {} as Record<string, Listing[]>);
    setGrouped(groupedData);
  } else {
    setGrouped({});
  }
}, [groupByCountry, listings]);

  return (
    <div className={`min-h-screen ${primaryBg} ${primaryText} flex flex-col items-center py-10 px-2 font-sans`}>
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Flexible List of Listings</h1>
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
        <div className="mt-6">
          <GalleryView
            listings={listings}
            grouped={grouped}
            groupByCountry={groupByCountry}
            showMissing={showMissing}
            property={property}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
