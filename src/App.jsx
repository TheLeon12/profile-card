import ProfileCard from "./components/ProfileCard/ProfileCard.jsx";
import { profileMock } from "./data/profile.js";

export default function App() {
  return (
    <div className="appShell">
      <ProfileCard profile={profileMock} />
    </div>
  );
}
