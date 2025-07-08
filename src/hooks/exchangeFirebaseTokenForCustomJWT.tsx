import { User } from "firebase/auth";

export async function exchangeFirebaseTokenForCustomJWT(
  firebaseUser: User
): Promise<string> {
  const firebaseIdToken = await firebaseUser.getIdToken();
  const res = await fetch("http://localhost:3000/auth/custom-token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firebaseIdToken}`,
    },
  });
  const data = await res.json();
  localStorage.setItem("customJWT", data.customToken);
  return data.customToken;
}
