import React, { Profiler } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const [profilepic, setProfilePic] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>("");

  const { updateUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl="";
    if (!name) {
      setError("Please enter your name...");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address...");
      return;
    }
    if (!password) {
      setError("Please enter your password...");
      return;
    }
    setError("");

    // API Call

    try{

      if(profilepic){
        const imgUploadRes = await uploadImage(profilepic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch(err){
      console.error("Error during sign up:", err);
      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      }
      else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details 
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              value={name}
              onChange={({target}) => setName(target.value)}
              label="User Name"
              placeholder="Enter your name"
              type="text"
            />
            <Input
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder="example@gmail.com"
              type="text"
            />
            <div className="cols-span-1 md:col-span-2">
              <Input
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label="Password"
              placeholder="Minimum 8 characters"
              type="password"
            />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">SIGN UP</button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account? {""}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
