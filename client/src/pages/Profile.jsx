import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

const handleFileUpload = async (image) => {
  const allowedTypes = ["image/jpeg", "image/jpg"];
  
  if (!allowedTypes.includes(image.type)) {
    setImageError(true);
    toast.error("Only JPG or JPEG image formats are allowed.");
    return;
  }

  const storage = getStorage(app);
  const fileName = new Date().getTime() + image.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    },
    (error) => {
      setImageError(true);
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: downloadURL,
        }));
        toast.success("Image uploaded successfully!");
      });
    }
  );
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if there's actually something to update
    if (Object.keys(formData).length === 0) {
      toast.info("No changes to update.");
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data));
        toast.error(data.message || "Failed to update profile.");
        return;
      }
      
      dispatch(updateUserSuccess(data));
      toast.success("Profile updated successfully!");
      setUpdateSuccess(true);
      
      // Reset form data after successful update
      setFormData({});
      
    } catch (error) {
      console.error("Update error:", error);
      dispatch(updateUserFailure(error.message || "Network error occurred"));
      toast.error("Failed to update profile. Please check your connection.");
    }
  };

  const handleDeleteAccount = async () => {
    // Add confirmation dialog
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      
      if (!res.ok || data.success === false) {
        dispatch(deleteUserFailure(data));
        toast.error(data.message || "Failed to delete account.");
        return;
      }
      
      dispatch(deleteUserSuccess(data));
      toast.success("Account deleted successfully!");
      
    } catch (error) {
      console.error("Delete error:", error);
      dispatch(deleteUserFailure(error.message || "Network error occurred"));
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      
      if (!res.ok) {
        throw new Error("Failed to sign out");
      }
      
      dispatch(signOut());
      toast.success("Signed out successfully!");
      
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.size > 2 * 1024 * 1024) {
              setImageError(true);
              setImage(undefined);
              setImagePercent(0);
              toast.error("File size must be less than 2 MB");
            } else {
              setImageError(false);
              setImage(file);
            }
          }}
        />

        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 && !imageError ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer hover:underline"
        >
          Delete account
        </span>
        <span 
          onClick={handleSignOut} 
          className="text-red-700 cursor-pointer hover:underline"
        >
          Sign out
        </span>
      </div>
      
      {/* Move ToastContainer to the end and configure it properly */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Profile;