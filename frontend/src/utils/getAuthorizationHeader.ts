import Cookies from "js-cookie";

export function getAuthorizationHeader() {
  const currentUser = Cookies.get("currentUser");
  console.log("Current user from cookies is "+currentUser);
  // if (currentUser !== undefined) {
  //   console.log(`Will set authorization to: ${JSON.parse(currentUser || "")?.token || ""}`);
  // } else {
  //   return "Authorization:";
  // }
  

  return {
    Authorization: `Bearer ${JSON.parse(currentUser || "")?.token || ""}`,
  };
}