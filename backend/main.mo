import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
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

  public type UserProfile = {
    name : Text;
    identifier : Identifier;
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
    userProfiles.add(caller, profile);
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

    let updatedDiscoveries = currentRewards.discoveries.clone();
    updatedDiscoveries.add(identification);

    let updatedRewards = {
      points = currentRewards.points + 10; // Award 10 points per identification
      discoveries = updatedDiscoveries;
    };

    userRewards.add(caller, updatedRewards);
  };
};
