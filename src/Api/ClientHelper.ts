import Axios from "axios";
import { parseJwt } from "@utils/parseToken";
import { apiInstance } from "./apiInstance";
import { ApiUrlAuth, BaseUrl, LOGIN_TOKEN, versionControl } from "./AuthApi";
import localStore from "./localstore.util";

export function setToken(token: any) {
  Object.assign(apiInstance.defaults.headers, {
    Authorization: `Bearer ${token}`,
  });
}
// export function removeToken() {
//   delete apiInstance.defaults.headers?.Authorization;
// }
export async function handleRequest(request: any) {
  let login_token = await localStore.get_data(LOGIN_TOKEN);
  if (login_token) {
    let decodedJwt: any = parseJwt(login_token);
    if (Math.floor(new Date().getTime() / 1000) >= decodedJwt?.exp - 5 * 60) {
      await fetch(
        BaseUrl + ApiUrlAuth + versionControl + "Login/RefreshToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourcePlatform: "web",
          }),
        }
      )
        .then((r) => r.json())
        .then(async (response) => {
          if (response?.code === 0) {
          } else {
            await setToken(response?.data?.jwt);
            await localStore.store_data(LOGIN_TOKEN, response?.data?.jwt);
            request.headers.Authorization = `Bearer ${response?.data?.jwt}`;
          }
        })
        .catch((e) => {
          console.log(
            "renew_token_error 47---->",
            JSON.stringify(e.response.data?.responseException)
          );
        });
      return request;
    }
  }
  return request;
}
export function handleResponse(value: any) {
  return value;
}
export async function handleApiError(error: any) {
  if (Axios.isCancel(error)) {
    console.log("Canceled");
    throw error;
  }
  if (!error.response) {
    throw error;
  }
  if (error.response.status === 401 || error.response.status === 402) {
    console.log("Please authorize to proceed", error.response);
    return error;
  } else if (error.response.status === 500) {
    console.log("Server error has occurred. Please try again later");
    throw error;
  } else {
    // showToast(error.toString());
  }
  throw error;
}

export function getTokenClaimObject() {
  let login_token = localStore.get_data(LOGIN_TOKEN);
  if (login_token) {
    try {
      let decodedJwt: any = parseJwt(login_token);
      return decodedJwt;
    } catch (ex) {
      return {};
    }
  }
}

export function getTokenClaims(claim: any) {
  try {
    var claimObj = getTokenClaimObject()[claim] || "";
    return claimObj;
  } catch (ex) {
    return "";
  }
}
export function checkRole(roles = []) {
  var isAllowed = false;
  if (roles.length == 0) {
    return true;
  }
  var rolesAvailable = getTokenClaims("role");
  if (rolesAvailable == "") {
    return isAllowed;
  }
  for (var i = 0; i < roles.length; i++) {
    if (rolesAvailable.indexOf(String(roles[i] || "").toLowerCase()) != -1) {
      isAllowed = true;
      return isAllowed;
    }
  }
  return isAllowed;
}

export function checkUserTypes({ roles = [] }: { roles: string[] }) {
  var isAllowed = false;
  if (roles.length == 0) {
    return true;
  }
  var rolesAvailable = getTokenClaims("UserType");
  if (rolesAvailable == "") {
    return isAllowed;
  }
  for (var i = 0; i < roles.length; i++) {
    if (rolesAvailable.toLowerCase() == String(roles[i] || "").toLowerCase()) {
      isAllowed = true;
      return isAllowed;
    }
  }
  return isAllowed;
}
