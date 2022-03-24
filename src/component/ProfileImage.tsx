import Avatar from "boring-avatars";

export default function ProfileImage({
  size,
  name,
}: {
  size: number;
  name: string;
}) {
  return (
    <Avatar
      size={size}
      name={name}
      variant="marble"
      colors={[
        "#feffbf",
        "#bebf60",
        "#ffffe6",
        "#feff80",
        "#f2ffbf",
        "#abbf60",
        "#faffe6",
        "#e4ff80",
        "#fff9bf",
        "#bfb660",
        "#fffde6",
        "#fff380",
        "#ebbfff",
        "#a160bf",
        "#f7e6ff",
        "#d780ff",
      ]}
    />
  );
}
