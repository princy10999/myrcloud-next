import { apiInstance } from "./apiInstance";
import { LOGIN_TOKEN, versionControl } from "./AuthApi";
import { setToken } from "./ClientHelper";
import localStoreUtil from "./localstore.util";

export const Bucket = process.env.REACT_APP_BUCKET;

export const ApiPostNoAuth = (type: any, endUrl: any, userData: any) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post(type + versionControl + endUrl, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error: any) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          // // console.log(("userData1");
          reject(error?.response?.data);
        } else {
          // // console.log(("userData2");

          reject(error?.response);
        }
      });
  });
};

export const ApiGetNoAuth = async (type: any, endUrl: any, body: any) => {
  let login_token = await localStoreUtil.get_data(LOGIN_TOKEN);
  if (login_token) {
    await setToken(login_token);
  }
  // console.log(type + versionControl + endUrl + body);
  return new Promise((resolve, reject) => {
    apiInstance
      .get(type + versionControl + endUrl)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

// export const ApiPutNoAuth = (type: any, endUrl: any, userData: any) => {
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .put(type + versionControl + endUrl, userData)
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           reject(error?.response?.data);
//         } else {
//           reject(error?.response);
//         }
//       });
//   });
// };

// export const ApiDeleteNoAuth = (type: any, endUrl: any) => {
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .put(type + versionControl + endUrl)
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           reject(error?.response?.data);
//         } else {
//           reject(error?.response);
//         }
//       });
//   });
// };

// export const ApiGet = (type: any, endUrl: any) => {
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .get(type + versionControl + endUrl, { headers: headers })
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           if (error?.response?.status === 403) {
//             //   signout();
//             // // console.log(("auth token error");
//           } else {
//             reject(error?.response?.data);
//           }
//         } else {
//           // // console.log((error,"errorerrorerrorerror");
//           reject(error);
//         }
//       });
//   });
// };

// export const ApiPost = (type: any, endUrl: any, userData: any) => {
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .post(type + versionControl + endUrl, userData, {
//         headers: headers,
//       })
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           if (error?.response?.status === 403) {
//             // // console.log(("auth token error");
//           } else {
//             reject(error?.response?.data);
//           }
//         } else {
//           // // console.log((error);
//           reject(error);
//           if (error?.response?.data?.message === "Token has expired") {
//             localStorage.clear();
//             window.location.reload();
//           } else if (error?.message === "Request failed with status code 401") {
//             // localStorage.clear()
//             window.location.reload();
//           }
//         }
//       });
//   });
// };
// export const ApiPostuser = (
//   type: any,
//   endUrl: any,
//   userData: any,
//   header: any
// ) => {
//   let headers: any = { headers: "bearer" + header };
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .post( type + versionControl + endUrl, userData, headers)
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           if (error?.response?.status === 403) {
//             // // console.log(("auth token error");
//           } else {
//             reject(error?.response?.data);
//           }
//         } else {
//           // // console.log((error);
//           reject(error);
//           if (error?.response?.data?.message === "Token has expired") {
//             localStorage.clear();
//             window.location.reload();
//           } else if (error?.message === "Request failed with status code 401") {
//             // localStorage.clear()
//             window.location.reload();
//           }
//         }
//       });
//   });
// };

// export const ApiPut = (type: any, endUrl: any, userData: any) => {
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .put(type + versionControl + endUrl, userData, {
//         headers: headers,
//       })
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           if (error?.response?.status === 403) {
//             //   signout();
//             // // console.log(("auth token error");
//           } else {
//             reject(error?.response?.data);
//           }
//         } else {
//           // // console.log((error);
//           reject(error);
//         }
//       });
//   });
// };

// export const ApiDelete = (type: any, endUrl: any) => {
//   return new Promise((resolve, reject) => {
//     apiInstance
//       .delete(type + versionControl + endUrl, { headers: headers })
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           if (error?.response?.status === 403) {
//             //   signout();
//             // // console.log(("auth token error");
//           } else {
//             reject(error?.response?.data);
//           }
//         } else {
//           // // console.log((error);
//           reject(error);
//         }
//       });
//   });
// };
