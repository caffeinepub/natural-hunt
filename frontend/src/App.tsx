import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { useQueryClient } from '@tanstack/react-query';
import WelcomeScreen from './components/WelcomeScreen';
import CameraView from './components/CameraView';
import DiscoveriesList from './components/DiscoveriesList';
import BottomNavBar from './components/BottomNavBar';
import SignUpScreen from './components/SignUpScreen';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useActor } from './hooks/useActor';

type View = 'welcome' | 'camera' | 'discoveries';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const { isFetching: actorFetching } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const handleStart = () => {
    setCurrentView('camera');
  };

  const handleNavigate = (view: 'camera' | 'discoveries') => {
    setCurrentView(view);
  };

  // Show loading while actor initializes
  if (actorFetching) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(160deg, oklch(0.12 0.06 150), oklch(0.18 0.09 155))' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center animate-float"
            style={{
              background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
              boxShadow: '0 8px 32px oklch(0.52 0.12 148 / 0.4)',
            }}
          >
            <span className="text-3xl">🌿</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{
                  background: 'oklch(0.72 0.14 75)',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show sign-up screen if profile not yet created
  const showSignUp = isFetched && userProfile === null;

  if (showSignUp) {
    return (
      <SignUpScreen
        onComplete={() => {
          // Profile saved — proceed to welcome
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {currentView === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {currentView === 'camera' && (
        <div className="pb-20">
          <CameraView onViewDiscoveries={() => setCurrentView('discoveries')} />
        </div>
      )}

      {currentView === 'discoveries' && (
        <div className="pb-20">
          <DiscoveriesList onBack={() => setCurrentView('camera')} />
        </div>
      )}

      {(currentView === 'camera' || currentView === 'discoveries') && (
        <BottomNavBar
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'oklch(0.28 0.12 150)',
            color: 'oklch(0.97 0.015 90)',
            border: '1px solid oklch(0.52 0.09 145 / 0.4)',
            fontFamily: 'Nunito, sans-serif',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
