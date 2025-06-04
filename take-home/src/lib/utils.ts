import type { Listing } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupDataByCountry(data: Listing[]) {
	return data.reduce((acc, item) => {
		const country = item.country || 'Unknown';
		acc[country] = acc[country] || [];
		acc[country].push(item);
		return acc;
	}, {} as Record<string, Listing[]>)
}