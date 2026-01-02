'use client';

import ReactSnowfall from 'react-snowfall';
import { useEffect, useState } from 'react';

export default function SnowfallEffect() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <ReactSnowfall 
        color="#ffffff"
        snowflakeCount={80}
        radius={[0.5, 3.0]}
        speed={[0.5, 3.0]}
        wind={[-0.5, 2.0]}
        style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
        }}
      />
    </div>
  );
}
