import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PlantIdentification {
    plantName: string;
    identificationDate: bigint;
    imageUrl: string;
}
export type Identifier = {
    __kind__: "gmail";
    gmail: string;
} | {
    __kind__: "phone";
    phone: string;
};
export interface AnimeCharacter {
    id: string;
    name: string;
    series: string;
    imageUrl: string;
}
export interface UserProfile {
    character: AnimeCharacter;
    name: string;
    badge: string;
    identifier: Identifier;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addIdentification(identification: PlantIdentification): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDiscoveries(): Promise<Array<PlantIdentification>>;
    getLeaderboard(): Promise<Array<[Principal, bigint]>>;
    getPoints(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    selectCharacter(character: AnimeCharacter): Promise<void>;
}
