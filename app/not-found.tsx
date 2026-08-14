import { ComingSoon } from '@/components/ComingSoon';

// Anyone following an old link to /team, /robots, /sponsors, or /contact — or a
// search result pointing at them — lands here. Showing the holding page rather
// than a bare 404 keeps those visits looking intentional.
export default function NotFound() {
  return <ComingSoon />;
}
