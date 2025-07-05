import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Placeholder for Firebase or other logic
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: Implement Firebase logic to save full name
    if (fullName.trim()) {
      setLoading(false);
      navigate("/home");
    } else {
      setLoading(false);
      setError("Please enter your name.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSave} className="space-y-5">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            className="bg-gray-50"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full h-12 rounded-full font-semibold bg-blue-600 hover:bg-blue-700" style={{ color: "#fff" }} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
