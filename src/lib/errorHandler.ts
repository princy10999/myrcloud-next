import { responseEnum } from "./enum";

export default function ErrorHandler(data: any, setSnackBar: any) {
  console.log(data, "data");
  if (data?.payload?.code === responseEnum.FailureCode) {
    setSnackBar("error", data?.payload?.message);
    return false;
  } else if (data?.payload?.status === responseEnum.InternalServerCode) {
    setSnackBar("error", data?.payload?.statusText);
    return false;
  } else if (data?.payload?.status === responseEnum.ValidationCode) {
    setSnackBar("error", data?.payload?.title);
    return false;
  } else {
    return true;
  }
}
