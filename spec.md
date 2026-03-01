# Specification

## Summary
**Goal:** Add a sign-up/login screen, a draggable anime mascot on the camera view, and an animated plant info board sequence triggered on plant identification.

**Planned changes:**
- Add a sign-up/login screen (before WelcomeScreen) where users register or log in using a Gmail address or mobile phone number; the identifier is validated and stored in the backend user profile
- Returning users can log back in with the same identifier to access the main app
- Add a draggable anime chibi mascot overlay on the CameraView screen that can be freely repositioned via touch or mouse and stays within screen bounds
- After a plant is successfully identified, show an animated sequence where the mascot stands beside a chalkboard, the plant's beneficial uses appear via a typewriter animation on the board, and the Web Speech API reads the text aloud
- The board and character can be dismissed after speech completes or on user tap
- Add anime chibi mascot image asset and wooden chalkboard image asset as static files

**User-visible outcome:** Users must sign up or log in before accessing the app, can drag a friendly anime mascot around the camera screen, and after identifying a plant the mascot animates beside a board that writes and speaks the plant's beneficial uses aloud.
