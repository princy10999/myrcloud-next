import CommonComponentProps from "@customTypes/commonComponentProps";

// type linkProps = CommonComponentProps & {
//     str: string;
//     domain?:any;
//   };

export const validURL = (str:string, domain?:any) => {
    function escapeRegExp(string:string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
    var reg =
      "^(https?:\\/\\/)" + // protocol
      "(" +
      ((domain || []).map((t:any) => escapeRegExp(t)).join("|") ||
        "(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}") +
      "|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+:]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$";
    var pattern = new RegExp(reg, "i"); // fragment locator
    return !!pattern.test(str);
  };
  
  export const getKnownDomains = (domain:any) => {
    const domainLists:any = {
      twitter: ["twitter.com", "www.twitter.com"],
      facebook: ["facebook.com", "www.facebook.com"],
      linkedin: ["linkedin.com", "www.linkedin.com"],
      youtube: ["youtube.com", "www.youtube.com", "youtu.be"],
    };
    return domainLists[domain] || [];
  };