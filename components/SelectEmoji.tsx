import Picker from "@emoji-mart/react";
import data from "../public/emojidata.json";

export default function SelectEmoji({
  onChangeEmoji,
}: {
  onChangeEmoji: (emoji: string) => void;
}) {
  return (
    <Picker
      data={data}
      onEmojiSelect={(emoji: { native: string }) => onChangeEmoji(emoji.native)}
      onAddCustomEmoji={() => {}}
      autoFocus={false}
      navPosition="bottom"
    />
  );
}
