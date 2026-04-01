import { Toaster } from "@/components/ui/sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import type { AnimeCharacter as BackendAnimeCharacter } from "./backend";
import { SessionInteractionProvider } from "./contexts/SessionInteractionContext";
import { type AnimeCharacter, animeCharacters } from "./data/animeCharacters";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "./hooks/useQueries";

import BottomNavBar from "./components/BottomNavBar";
import CameraView from "./components/CameraView";
import CharacterSelectionScreen from "./components/CharacterSelectionScreen";
import DiscoveriesList from "./components/DiscoveriesList";
import LeaderboardScreen from "./components/LeaderboardScreen";
import PresentationScreen from "./components/PresentationScreen";
import ProfileScreen from "./components/ProfileScreen";
import ShareCertificateScreen from "./components/ShareCertificateScreen";
import SignInScreen from "./components/SignInScreen";
import SignUpScreen from "./components/SignUpScreen";
import WelcomeScreen from "./components/WelcomeScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const qc = useQueryClient();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
    error: profileError,
  } = useGetCallerUserProfile();

  const saveProfile = useSaveCallerUserProfile();

  const [activeTab, setActiveTab] = useState<
    "scan" | "leaderboard" | "discoveries" | "profile"
  >("scan");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCharacterChange, setShowCharacterChange] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showShareCertificate, setShowShareCertificate] = useState(false);

  const needsProfileSetup =
    isAuthenticated &&
    !profileLoading &&
    isFetched &&
    !userProfile &&
    !profileError;
  const needsCharacterSelection =
    isAuthenticated &&
    !profileLoading &&
    isFetched &&
    userProfile &&
    !userProfile.character?.id;

  const selectedCharacter: AnimeCharacter = userProfile?.character
    ? animeCharacters.find((c) => c.id === userProfile.character.id) ||
      animeCharacters[0]
    : animeCharacters[0];

  const handleCharacterSelect = async (character: BackendAnimeCharacter) => {
    if (!userProfile) return;
    await saveProfile.mutateAsync({
      ...userProfile,
      character,
    });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Share Certificate overlay
  if (showShareCertificate) {
    return (
      <ShareCertificateScreen onClose={() => setShowShareCertificate(false)} />
    );
  }

  // Presentation overlay (accessible from anywhere)
  if (showPresentation) {
    return <PresentationScreen onClose={() => setShowPresentation(false)} />;
  }

  // Welcome screen
  if (showWelcome && !isAuthenticated) {
    return (
      <WelcomeScreen
        onGetStarted={() => setShowWelcome(false)}
        onViewPresentation={() => setShowPresentation(true)}
      />
    );
  }

  // Auth screens
  if (!isAuthenticated) {
    if (showSignUp) {
      return (
        <SignUpScreen
          onComplete={() => setShowSignUp(false)}
          onSwitchToSignIn={() => setShowSignUp(false)}
        />
      );
    }
    return <SignInScreen onSwitchToSignUp={() => setShowSignUp(true)} />;
  }

  // Loading profile
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Profile setup (new user)
  if (needsProfileSetup) {
    return (
      <SignUpScreen
        onComplete={() => {
          qc.invalidateQueries({ queryKey: ["currentUserProfile"] });
        }}
        onSwitchToSignIn={() => {}}
      />
    );
  }

  // Character selection (initial or change)
  if (needsCharacterSelection || showCharacterChange) {
    return (
      <CharacterSelectionScreen
        onSelect={async (character) => {
          await handleCharacterSelect(character);
          setShowCharacterChange(false);
        }}
        currentCharacterId={userProfile?.character?.id}
      />
    );
  }

  // Main app
  return (
    <div className="min-h-screen bg-midnight text-cream">
      {activeTab === "scan" && (
        <CameraView
          character={selectedCharacter}
          onViewDiscoveries={() => setActiveTab("discoveries")}
        />
      )}
      {activeTab === "leaderboard" && <LeaderboardScreen />}
      {activeTab === "discoveries" && <DiscoveriesList />}
      {activeTab === "profile" && (
        <ProfileScreen
          onChangeCharacter={() => setShowCharacterChange(true)}
          onViewPresentation={() => setShowPresentation(true)}
          onViewShareCertificate={() => setShowShareCertificate(true)}
        />
      )}

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        character={selectedCharacter}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionInteractionProvider>
        <AppContent />
        <Toaster />
      </SessionInteractionProvider>
    </QueryClientProvider>
  );
}
