import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PrintJobCard from "@/components/PrintJobCard";
import TabBar from "@/components/TabBar";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Match status types as required
type PrintJob = {
  filename: string;
  datetime: string;
  status: "Completed" | "Pending";
  receiptUrl?: string;
};

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserProfile({
          name: userDoc.data().name || user.displayName || "User",
          email: userDoc.data().email || user.email || ""
        });
      } else {
        setUserProfile({
          name: user.displayName || "User",
          email: user.email || ""
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleEditProfile = () => {
    setNewName(userProfile?.name || "");
    setEditError("");
    setEditOpen(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      setEditError("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not logged in");
      const idToken = await user.getIdToken();
      const response = await fetch("http://localhost:3000/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, idToken })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update name");
      setUserProfile((prev) => prev ? { ...prev, name: newName } : prev);
      setEditOpen(false);
    } catch (err: any) {
      setEditError(err.message || "Failed to update name");
    } finally {
      setSaving(false);
    }
  };

  // Explicitly annotate as PrintJob[]
  const printJobs: PrintJob[] = [
    {
      filename: "Project Proposal.pdf",
      datetime: "2025-06-15 10:30 AM",
      status: "Completed",
      receiptUrl: "#"
    },
    {
      filename: "Project Proposal.pdf",
      datetime: "2025-06-15 10:30 AM",
      status: "Completed",
      receiptUrl: "#"
    },
    {
      filename: "Project Proposal.pdf",
      datetime: "2025-06-15 10:30 AM",
      status: "Completed",
      receiptUrl: "#"
    }
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pt-8 pb-2">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogTitle>Edit Profile</DialogTitle>
          <Input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Full Name"
            className="mb-3"
            disabled={saving}
          />
          {editError && <div className="text-red-500 text-sm mb-2">{editError}</div>}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={handleSaveName} disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700">
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <main className="flex-1 w-full max-w-md mx-auto px-4">
        {/* Title */}
        <h1 className="font-bold text-3xl text-black mb-5">My Profile</h1>
        {/* Profile card */}
        <div className="flex items-center rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-4 mb-7">
          <Avatar className="w-14 h-14 mr-4 shrink-0">
            <AvatarImage src={userProfile?.name ? undefined : undefined} alt={userProfile?.name || "User"} />
            <AvatarFallback>{userProfile?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-semibold text-black leading-tight">{userProfile?.name}</div>
            <div className="text-gray-400 text-base font-normal truncate">{userProfile?.email}</div>
          </div>
          <button className="ml-2 p-1 rounded-md hover:bg-gray-100 transition" aria-label="Edit profile" onClick={handleEditProfile}>
            <Edit size={28} className="text-gray-400" />
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mb-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-lg transition"
        >
          Logout
        </button>
        {/* Print History header */}
        <h2 className="font-semibold text-xl text-black mb-4 mt-2">Print History</h2>
        {/* Print job cards */}
        <div className="flex flex-col gap-4 pb-8">
          {printJobs.map((job, idx) => (
            <PrintJobCard key={idx} job={job} variant="profile" />
          ))}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full">
        <TabBar selected={2} />
      </div>
    </div>
  );
};

export default ProfilePage;
