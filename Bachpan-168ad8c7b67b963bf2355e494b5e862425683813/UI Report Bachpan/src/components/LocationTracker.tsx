import { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationTrackerProps {
  onLocationChange: (location: { latitude: number; longitude: number } | null) => void;
}

export const LocationTracker = ({ onLocationChange }: LocationTrackerProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const getLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(loc);
        onLocationChange(loc);
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location. Please enable location access.');
        setLoading(false);
        onLocationChange(null);
      }
    );
  };

  useEffect(() => {
    // Auto-detect location on mount
    getLocation();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">Location</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={getLocation}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Detecting...
            </>
          ) : (
            'Re-detect Location'
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {location && (
        <div className="bg-card rounded-lg p-4 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Latitude: <span className="font-mono text-foreground">{location.latitude.toFixed(6)}</span>
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Longitude: <span className="font-mono text-foreground">{location.longitude.toFixed(6)}</span>
          </p>
          
          {/* OpenStreetMap embed */}
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-border">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01},${location.latitude - 0.01},${location.longitude + 0.01},${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
              title="Location Map"
            />
          </div>
        </div>
      )}
    </div>
  );
};
