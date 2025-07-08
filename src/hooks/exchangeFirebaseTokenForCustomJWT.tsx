import { User } from "firebase/auth";

export async function exchangeFirebaseTokenForCustomJWT(
  firebaseUser: User
): Promise<string> {
  const firebaseIdToken = await firebaseUser.getIdToken();
  const res = await fetch("https://empower-women-navigator-backend01.onrender.com/auth/custom-token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firebaseIdToken}`,
    },
  });
  const data = await res.json();
  localStorage.setItem("customJWT", data.customToken);
  return data.customToken;
}
