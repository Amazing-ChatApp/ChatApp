import { getAuth, signOut } from "firebase/auth";

const Header = ({ user }) => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful
        // Removing the user from local storage
        localStorage.removeItem("email");
        console.log("Success!");
        // Reloading the page as local storage takes time to update
        window.location.reload(false);
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <header className="flex w-screen bg-base-200 border-b">
      <div className="flex justify-start mr-4 p-4">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="rounded-full w-14 flex-end"
        />
        <h1 className="text-xl mt-2 ml-4">{user.displayName}</h1>
      </div>
      <div className="flex-grow"></div>
      <div className="mr-4 py-2">
        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-primary float-right text-white ml-8 mt-2 px-5 py-2.5 text-center mr-2 mb-2"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
