import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  public type Identifier = {
    #gmail : Text;
    #phone : Text;
  };

  public type OldUserProfile = {
    name : Text;
    identifier : Identifier;
  };

  public type AnimeCharacter = {
    id : Text;
    name : Text;
    imageUrl : Text;
    series : Text;
  };

  public type NewUserProfile = {
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

  public type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    userRewards : Map.Map<Principal, UserRewards>;
  };

  public type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    userRewards : Map.Map<Principal, UserRewards>;
  };

  public func run(old : OldActor) : NewActor {
    let newProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_id, profile) {
        {
          profile with
          character = {
            id = "unknown";
            name = "Unknown Character";
            imageUrl = "";
            series = "unknown";
          };
          badge = "newbie";
        };
      }
    );
    {
      old with
      userProfiles = newProfiles;
    };
  };
};
