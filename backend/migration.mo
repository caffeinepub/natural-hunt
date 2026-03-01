import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type OldUserProfile = {
    name : Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    userRewards : Map.Map<Principal, UserRewards>;
  };

  type UserRewards = {
    points : Nat;
    discoveries : List.List<PlantIdentification>;
  };

  type PlantIdentification = {
    plantName : Text;
    imageUrl : Text;
    identificationDate : Int;
  };

  type NewUserProfile = {
    name : Text;
    identifier : Identifier;
  };

  type Identifier = {
    #gmail : Text;
    #phone : Text;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    userRewards : Map.Map<Principal, UserRewards>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_pid, oldProfile) {
        {
          name = oldProfile.name;
          identifier = #gmail "unknown";
        };
      }
    );
    {
      userProfiles = newUserProfiles;
      userRewards = old.userRewards;
    };
  };
};
