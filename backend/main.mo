import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type Identifier = {
    #gmail : Text;
    #phone : Text;
  };

  public type AnimeCharacter = {
    id : Text;
    name : Text;
    imageUrl : Text;
    series : Text;
  };

  public type UserProfile = {
    name : Text;
    identifier : Identifier;
    character : AnimeCharacter;
    badge : Text;
  };

  public type PlantIdentification = {
    plantName : Text;
    imageUrl : Text;
    identificationDate : Int;
  };

  public type UserRewards = {
    points : Nat;
    discoveries : List.List<PlantIdentification>;
  };

  let leaderboard = List.empty<(Principal, Nat)>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userRewards = Map.empty<Principal, UserRewards>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let newProfile : UserProfile = {
      name = profile.name;
      identifier = profile.identifier;
      character = profile.character;
      badge = profile.badge;
    };

    userProfiles.add(caller, newProfile);
  };

  public query ({ caller }) func getPoints() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view points");
    };
    switch (userRewards.get(caller)) {
      case (?rewards) { rewards.points };
      case (null) { 0 };
    };
  };

  public query ({ caller }) func getDiscoveries() : async [PlantIdentification] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view discoveries");
    };
    switch (userRewards.get(caller)) {
      case (?rewards) { rewards.discoveries.toArray() };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func addIdentification(identification : PlantIdentification) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add identifications");
    };

    let currentRewards = switch (userRewards.get(caller)) {
      case (?rewards) { rewards };
      case (null) { { points = 0; discoveries = List.empty<PlantIdentification>() } };
    };

    let updatedDiscoveries = List.empty<PlantIdentification>();
    if (currentRewards.discoveries.isEmpty()) {
      updatedDiscoveries.add(identification);
    } else {
      let discoveries = currentRewards.discoveries.clone();
      discoveries.add(identification);
      updatedDiscoveries.addAll(discoveries.values());
    };

    let updatedRewards = {
      points = currentRewards.points + 10;
      discoveries = updatedDiscoveries;
    };

    userRewards.add(caller, updatedRewards);
    updateLeaderboard(caller, updatedRewards.points);
  };

  public shared ({ caller }) func selectCharacter(character : AnimeCharacter) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can select a character");
    };

    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile = {
          profile with character = character;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) {};
    };
  };

  // Leaderboard is publicly visible to any caller including guests
  public query func getLeaderboard() : async [(Principal, Nat)] {
    leaderboard.toArray();
  };

  func updateLeaderboard(user : Principal, points : Nat) {
    let newLeaderboard = List.empty<(Principal, Nat)>();
    if (leaderboard.isEmpty()) {
      newLeaderboard.add((user, points));
      leaderboard.addAll(newLeaderboard.values());
      return;
    };

    let iter = leaderboard.values();
    let sortedLeaderboard = List.empty<(Principal, Nat)>();

    for (entry in iter) {
      if (points >= entry.1) {
        sortedLeaderboard.add((user, points));
        sortedLeaderboard.add(entry);
      } else {
        sortedLeaderboard.add(entry);
      };
    };

    if (sortedLeaderboard.isEmpty()) {
      sortedLeaderboard.add((user, points));
    };

    let size = sortedLeaderboard.size();
    let arrayLeaderboard = sortedLeaderboard.toArray();
    let finalLeaderboard = List.empty<(Principal, Nat)>();
    for (i in Nat.range(0, Nat.min(size, 10))) {
      finalLeaderboard.add(arrayLeaderboard[i]);
    };

    newLeaderboard.clear();
    newLeaderboard.addAll(finalLeaderboard.values());

    leaderboard.clear();
    leaderboard.addAll(newLeaderboard.values());
  };
};
