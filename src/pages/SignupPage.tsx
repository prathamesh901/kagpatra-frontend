import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const SignupPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });
      const idToken = await user.getIdToken();
      // Create user profile via backend API
      const response = await fetch("http://localhost:3000/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, idToken })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create profile");
      setLoading(false);
      navigate("/login");
    } catch (err: any) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError(err.message || "Signup failed");
      }
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const idToken = await user.getIdToken();
        // Create user profile via backend API
        const response = await fetch("http://localhost:3000/api/profile/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: user.displayName, idToken })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to create profile");
      }
      setLoading(false);
      navigate("/home");
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your Kagpatra account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            className="bg-gray-50"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-gray-50"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="bg-gray-50"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="bg-gray-50"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full h-12 rounded-full font-semibold bg-blue-600 hover:bg-blue-700" style={{ color: "#fff" }} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <div className="my-4 flex items-center justify-center">
          <span className="text-gray-400 text-xs">or</span>
        </div>
        <Button
          onClick={handleGoogleSignup}
          className="w-full h-12 rounded-full font-semibold bg-white border border-gray-300 text-gray-700 flex items-center justify-center gap-2 shadow-sm transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </Button>
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
