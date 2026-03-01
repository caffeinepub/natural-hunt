import { useEffect, useRef, useState } from 'react';
import { useGetPoints } from '../hooks/useQueries';
import { Trophy } from 'lucide-react';

export default function PointsCounter() {
  const { data: points = 0 } = useGetPoints();
  const prevPoints = useRef(points);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (points > prevPoints.current) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 600);
      prevPoints.current = points;
      return () => clearTimeout(t);
    }
    prevPoints.current = points;
  }, [points]);

  return (
    <div className={`points-counter ${animating ? 'points-counter-pop' : ''}`}>
      <Trophy size={14} className="points-icon" />
      <span className="points-value">{points}</span>
      <span className="points-label">pts</span>
    </div>
  );
}
