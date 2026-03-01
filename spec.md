# Specification

## Summary
**Goal:** Add a leaderboard screen, an anime character selection screen, and autonomous character animations to the Natural Hunt app.

**Planned changes:**
- Add a leaderboard tab to the bottom navigation bar (trophy/leaderboard icon) that displays users ranked by points, showing their display name, selected anime character avatar, and point total, with the current user's entry highlighted
- Add a character selection screen accessible after sign-up or from profile/settings, showing 8 selectable anime characters (Naruto Uzumaki, Sasuke Uchiha, Monkey D. Luffy, Roronoa Zoro, Ichigo Kurosaki, Rukia Kuchiki, Son Goku, Vegeta) with character cards displaying name, franchise badge, and avatar
- Save the selected character to the user's backend profile and display it throughout the app and on the leaderboard
- Implement autonomous looping CSS or canvas animations for each character (idle/walk/signature move) that play automatically without any user input, with each character having a visually distinct movement pattern
- Add backend query to retrieve and rank top user scores
- Add 8 anime-style character avatar images as static assets

**User-visible outcome:** Users can pick an anime character as their avatar, see it animate autonomously on screen, and compete on a leaderboard that shows all players ranked by points with their chosen character avatar.
