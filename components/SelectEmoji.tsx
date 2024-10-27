import Picker from "@emoji-mart/react";
import data from "../public/emojidata.json";

export default function SelectEmoji({
  setEmoji,
}: {
  setEmoji: (emoji: string) => void;
}) {
  return (
    <Picker
      data={data}
      onEmojiSelect={(emoji: { native: string }) => setEmoji(emoji.native)}
      onAddCustomEmoji={() => {}}
      autoFocus={false}
    />
  );
}
