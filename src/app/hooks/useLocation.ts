import { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLocation } = useAppStore();

  const requestLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      // In a real app, you would reverse geocode to get city/area
      // For now, using mock data
      setLocation({
        city: 'Mumbai',
        area: 'Bandra West',
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      setLoading(false);
    } catch (err) {
      setError('Unable to retrieve your location');
      // Set default location as fallback
      setLocation({
        city: 'Mumbai',
        area: 'Bandra West',
        lat: 19.0596,
        lng: 72.8295,
      });
      setLoading(false);
    }
  };

  return { requestLocation, loading, error };
}
