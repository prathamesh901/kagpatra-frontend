import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/home");
    } catch (err: any) {
      setLoading(false);
      // Show a generic error for all login failures
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date()
        });
      }
      setLoading(false);
      navigate("/home");
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to Kagpatra</h2>
        <form onSubmit={handleLogin} className="space-y-5">
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full h-12 rounded-full font-semibold bg-blue-600 hover:bg-blue-700" style={{ color: "#fff" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="my-4 flex items-center justify-center">
          <span className="text-gray-400 text-xs">or</span>
        </div>
        <Button
          onClick={handleGoogleLogin}
          className="w-full h-12 rounded-full font-semibold bg-white border border-gray-300 text-gray-700 flex items-center justify-center gap-2 shadow-sm transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </Button>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
