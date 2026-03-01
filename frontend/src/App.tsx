import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { useQueryClient } from '@tanstack/react-query';
import WelcomeScreen from './components/WelcomeScreen';
import CameraView from './components/CameraView';
import DiscoveriesList from './components/DiscoveriesList';
import BottomNavBar from './components/BottomNavBar';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import CharacterSelectionScreen from './components/CharacterSelectionScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useActor } from './hooks/useActor';
import { useInternetIdentity } from './hooks/useInternetIdentity';

type View = 'welcome' | 'camera' | 'discoveries' | 'leaderboard';
type AuthView = 'signin' | 'signup';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [authView, setAuthView] = useState<AuthView>('signin');
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const { isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched, refetch: refetchProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const handleStart = () => {
    setCurrentView('camera');
  };

  const handleNavigate = (view: 'camera' | 'discoveries' | 'leaderboard') => {
    setCurrentView(view);
  };

  const handleSignUpComplete = async () => {
    await queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    await refetchProfile();
    // After profile creation, show character selection
    setShowCharacterSelection(true);
  };

  const handleCharacterSelected = async () => {
    await queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    await refetchProfile();
    setShowCharacterSelection(false);
  };

  // Show loading while identity is initializing, actor is fetching, or profile is loading
  if (isInitializing || actorFetching || (isAuthenticated && profileLoading)) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(160deg, oklch(0.10 0.05 150), oklch(0.16 0.08 155))' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl overflow-hidden animate-float"
            style={{
              boxShadow: '0 8px 32px oklch(0.52 0.12 148 / 0.4)',
              border: '1px solid oklch(0.52 0.09 145 / 0.4)',
            }}
          >
            <img
              src="/assets/generated/natural-hunt-logo.dim_512x512.png"
              alt="Natural Hunt"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-1.5">
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

  // Unauthenticated: show Sign In or Sign Up screen
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <SignUpScreen
          onComplete={handleSignUpComplete}
          onSwitchToSignIn={() => setAuthView('signin')}
        />
      );
    }
    return (
      <SignInScreen
        onSwitchToSignUp={() => setAuthView('signup')}
      />
    );
  }

  // Authenticated but no profile yet: show profile creation (sign up form)
  const showProfileSetup = isAuthenticated && isFetched && userProfile === null;
  if (showProfileSetup) {
    return (
      <SignUpScreen
        onComplete={handleSignUpComplete}
        onSwitchToSignIn={() => {
          queryClient.clear();
        }}
      />
    );
  }

  // Authenticated with profile but no character selected, or explicitly showing character selection
  const needsCharacterSelection =
    isAuthenticated &&
    isFetched &&
    userProfile !== null &&
    (!userProfile?.character?.id || userProfile.character.id === 'unknown');

  if (showCharacterSelection || needsCharacterSelection) {
    return (
      <CharacterSelectionScreen
        onComplete={handleCharacterSelected}
      />
    );
  }

  // Authenticated with profile and character: show main app
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

      {currentView === 'leaderboard' && (
        <div className="pb-20">
          <LeaderboardScreen onBack={() => setCurrentView('camera')} />
        </div>
      )}

      {(currentView === 'camera' || currentView === 'discoveries' || currentView === 'leaderboard') && (
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
