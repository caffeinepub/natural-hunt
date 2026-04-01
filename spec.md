# Natural Hunt

## Current State
Professional anime-themed plant identification app with Shimeji characters (Naruto, Sasuke, Sakura, Goku, Sailor Moon, Luffy, Pikachu, Totoro), AI plant scanning, camera, leaderboard, profile, share certificates, and presentation screen.

## Requested Changes (Diff)

### Add
- Madara Uchiha as selectable character (red/dark theme, deep authoritative voice)
- Obito Uchiha as selectable character (orange mask theme, dramatic voice)
- Itachi Uchiha as selectable character (dark/crimson theme, calm cool voice)
- After scanning a plant: character steps forward and presents plant name, detailed info, advantages, and disadvantages in a structured speech bubble / info card narrated by the selected character
- Character-change button prominently accessible on the scan/home screen (not just profile)

### Modify
- Character roster expanded to 11 characters (existing 8 + Madara, Obito, Itachi)
- Plant scan result screen: character appears prominently alongside plant details (name, family, advantages list, disadvantages list, medical uses) with character-specific commentary style
- Character selection accessible via a floating button on the main screen

### Remove
- Nothing removed

## Implementation Plan
1. Expand CHARACTER_DATA with Madara, Obito, Itachi (colors, personalities, voice params, Shimeji CSS)
2. Add prominent "Change Character" button on home/scan screen
3. Plant scan result: show structured card with plant name, advantages (green checkmarks), disadvantages (red x marks), medical uses, with character avatar and character-voiced commentary
4. Character speaks plant info in their unique personality style
5. Ensure camera one-touch capture + "scan again" option after result
