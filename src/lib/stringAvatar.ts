export default function stringAvatar(name: string) {
  const splits = (name || "").trim().split(" ");
  return {
    children:
      splits.length > 1
        ? `${(splits[0][0] || "").toUpperCase()}${(
            splits[1][0] || ""
          ).toUpperCase()}`
        : `${(splits[0][0] || "").toUpperCase()}`,
  };
}
